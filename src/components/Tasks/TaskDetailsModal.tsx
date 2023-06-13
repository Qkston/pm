import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, Box, Typography, TextField, IconButton, Avatar, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { getEmailByCognitoID } from "../../helpers/cognitoHelper";
import { CommentWithUserEmail } from "../../helpers/interfaces";

import { createCommentRecord } from "../../services/CommentService";

import CommentsSubscription from "../../subscriptions/CommentSubscription";

import { Comment, CreateCommentInput, Task } from "../../API";
import { useUserContext } from "../../contexts/UserContext";

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
	const { userID } = useUserContext();

	const comments: Comment[] = CommentsSubscription({ task_id: task.id });

	const [performer, setPerformer] = useState<string>("");
	const [comment, setComment] = useState<string>("");

	const [commentsWithEmails, setCommentsWithEmails] = useState<CommentWithUserEmail[]>([]);

	useEffect(() => {
		if (task.user_id) getEmailByCognitoID(task.user_id).then(email => email && setPerformer(email));
	}, []);

	useEffect(() => {
		const getData = async () => {
			const updatedComments: CommentWithUserEmail[] = await Promise.all(
				comments.map(async c => {
					const email = await getEmailByCognitoID(c.user_id);
					return { ...c, userEmail: email || "" };
				})
			);
			setCommentsWithEmails(updatedComments);
		};
		getData();
	}, [comments]);

	useEffect(() => {
		if (!opened) setPerformer("");
	}, [opened]);

	const createComment = () => {
		if (!userID || !comment) return;
		const data: CreateCommentInput = {
			task_id: task.id,
			user_id: userID,
			text: comment,
		};

		createCommentRecord(data).then(() => setComment(""));
	};

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
						<IconButton sx={{ width: "5%" }} onClick={createComment}>
							<SendIcon sx={{ color: "#1976d2" }} />
						</IconButton>
					</Box>
					<Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
						{commentsWithEmails
							.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
							.map(c => {
								return (
									<ListItem key={c.id} sx={{ pl: 0, alignItems: "flex-end" }}>
										<ListItemIcon sx={{ minWidth: "50px" }}>
											<Avatar>{c.userEmail[0].toUpperCase()}</Avatar>
										</ListItemIcon>
										<Box sx={{ display: "flex", flexDirection: "column" }}>
											<ListItemText
												secondary={`${c.userEmail} (${moment(c.createdAt).format("HH:MM:ss DD.MM.YYYY")})`}
												sx={{ margin: 0 }}
											/>
											<ListItemText primary={c.text} sx={{ margin: 0 }} />
										</Box>
									</ListItem>
								);
							})}
					</Box>
				</Box>
			</Box>
		</Modal>
	);
}
