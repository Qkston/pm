import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { CreateProjectInput, Project } from "../../API";

type Props = {
	opened: boolean;
	project?: Project;
	onClose: () => void;
	onCreate: (project: CreateProjectInput) => void;
};

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "400px",
	bgcolor: "background.paper",
	boxShadow: 14,
	p: 3,
};

export default function ProjectModal({ opened, project, onClose, onCreate }: Props) {
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [finishDate, setFinishDate] = useState<moment.Moment | null>(null);

	useEffect(() => {
		if (!opened) {
			setTitle("");
			setDescription("");
			setFinishDate(null);
		}
	}, [opened]);

	const onCreateProject = () => {
		// TODO: Add owner_id
		const data: CreateProjectInput = {
			name: title,
			description,
			start_date: moment().format("YYYY-MM-DD"),
			finish_date: finishDate ? moment(finishDate).format("YYYY-MM-DD") : null,
		};

		onCreate(data);
		onClose();
	};

	return (
		<Modal open={opened} onClose={onClose} aria-labelledby="modal-modal-title">
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{`${project ? `Редагування "${project.name}"` : "Створення"} проекту`}
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px", mt: "30px" }}>
					<TextField value={title} onChange={(event: any) => setTitle(event.target.value)} label="Назва" variant="standard" required />
					<TextField
						value={description}
						onChange={(event: any) => setDescription(event.target.value)}
						label="Опис"
						variant="standard"
						multiline
					/>
					<DatePicker value={finishDate} onChange={setFinishDate} label="Дата завершення" sx={{ mt: "15px" }} minDate={moment().add(1, "d")} />
				</Box>
				<Box sx={{ mt: "30px", display: "flex", justifyContent: "space-around" }}>
					<Button variant="contained" size="medium" onClick={onCreateProject}>
						{project ? "Створити" : "Зберегти"}
					</Button>
					<Button variant="outlined" size="medium" onClick={onClose}>
						Скасувати
					</Button>
				</Box>
			</Box>
		</Modal>
	);
}
