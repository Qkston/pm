import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { getEmailByCognitoID } from "../../helpers/cognitoHelper";

import { CreateTaskInput, Task, UpdateTaskInput } from "../../API";
import { useUserContext } from "../../contexts/UserContext";

type Props = {
	opened: boolean;
	projectID: string;
	userEmails: string[];
	task?: Task;
	onClose: () => void;
	onCreate: (task: CreateTaskInput) => void;
	onUpdate: (task: UpdateTaskInput) => void;
};

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "650px",
	bgcolor: "background.paper",
	boxShadow: 14,
	p: 3,
};

export default function TaskModal({ opened, projectID, userEmails, task, onClose, onCreate, onUpdate }: Props) {
	const { userID } = useUserContext();

	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [performer, setPerformer] = useState<string>("");
	const [deadline, setDeadline] = useState<moment.Moment>(moment().add(1, "w"));

	useEffect(() => {
		if (!opened) {
			setTitle("");
			setDescription("");
			setPerformer("");
			setDeadline(moment().add(1, "w"));
		}
	}, [opened]);

	useEffect(() => {
		if (task) {
			const { title, description, deadline, user_id } = task;

			setTitle(title);
			setDescription(description || "");
			setDeadline(moment(deadline));

			if (user_id) getEmailByCognitoID(user_id).then(email => email && setPerformer(email));
		}
	}, [task]);

	const onCreateTask = () => {
		if (!userID) return;
		const data: CreateTaskInput = {
			title,
			description,
			create_date: moment().format("YYYY-MM-DD"),
			deadline: moment(deadline).format("YYYY-MM-DD"),
			project_id: projectID,
			status: "NEW",
			user_id: performer,
		};

		onCreate(data);
		onClose();
	};

	const onUpdateTask = () => {
		if (!userID || !task) return;
		const { id, _version } = task;
		const data: UpdateTaskInput = {
			id,
			title,
			description,
			deadline: moment(deadline).format("YYYY-MM-DD"),
			user_id: performer,
			_version,
		};

		onUpdate(data);
		onClose();
	};

	return (
		<Modal open={opened} onClose={onClose} aria-labelledby="modal-modal-title">
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{`${task ? `Редагування "${task.title}"` : "Створення"} завдання`}
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px", mt: "30px" }}>
					<FormControl fullWidth variant="standard">
						<InputLabel>Виконавець</InputLabel>
						<Select
							value={performer}
							onChange={(event: SelectChangeEvent) => {
								setPerformer(event.target.value as string);
							}}>
							{userEmails.map(
								email =>
									!email.includes("(manager)") && (
										<MenuItem key={email} value={email}>
											{email}
										</MenuItem>
									)
							)}
						</Select>
					</FormControl>
					<TextField value={title} onChange={(event: any) => setTitle(event.target.value)} label="Заголовок" variant="standard" required />
					<TextField
						value={description}
						onChange={(event: any) => setDescription(event.target.value)}
						label="Опис"
						variant="standard"
						multiline
						maxRows={5}
					/>
					<DatePicker
						value={deadline}
						onChange={value => setDeadline(value || moment().add(1, "w"))}
						label="Дата завершення"
						sx={{ mt: "15px" }}
						minDate={moment().add(1, "d")}
					/>
				</Box>
				<Box sx={{ mt: "30px", display: "flex", justifyContent: "space-around" }}>
					<Button variant="contained" size="medium" onClick={() => (task ? onUpdateTask() : onCreateTask())}>
						{task ? "Зберегти" : "Створити"}
					</Button>
					<Button variant="outlined" size="medium" onClick={onClose}>
						Скасувати
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
