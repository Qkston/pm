import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { getEmailByCognitoID } from "../../helpers/cognitoHelper";

import { Task } from "../../API";

type Props = {
	opened: boolean;
	task: Task;
	onClose: () => void;
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

export default function TaskDetailsModal({ opened, task, onClose }: Props) {
	const [performer, setPerformer] = useState<string>("");
	const [comment, setComment] = useState<string>("");

	useEffect(() => {
		if (task.user_id) getEmailByCognitoID(task.user_id).then(email => email && setPerformer(email));
	}, []);

	useEffect(() => {
		if (!opened) setPerformer("");
	}, [opened]);

	return (
		<Modal open={opened} onClose={onClose} aria-labelledby="modal-modal-title">
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					{task.title}
					{task.deadline ? ` (${moment(task.deadline).format("DD.MM.YYYY")})` : ""}
				</Typography>
				<Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px", mt: "30px" }}>
					{performer && (
						<Typography variant="body1" component="p">
							Виконавець: {performer}
						</Typography>
					)}
					{task.description && (
						<Typography variant="body1" component="p">
							{task.description}
						</Typography>
					)}
				</Box>
				<Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px", mt: "30px" }}>
					<Typography variant="h6" component="h3">
						Коментарі:
					</Typography>
					<Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
						<TextField
							value={comment}
							onChange={(event: any) => setComment(event.target.value)}
							placeholder="Введіть ваш коментар..."
							variant="outlined"
							size="small"
							multiline
							sx={{ width: "95%", padding: 0 }}
						/>
						<IconButton sx={{ width: "5%" }}>
							<SendIcon sx={{ color: "#1976d2" }} />
						</IconButton>
					</Box>
				</Box>
			</Box>
		</Modal>
	);
}
