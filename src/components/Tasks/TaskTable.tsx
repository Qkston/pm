import moment from "moment";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	IconButton,
	Menu,
	MenuItem,
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

import { DeleteTaskInput, Task, UpdateTaskInput } from "../../API";

type Props = {
	tasks: Task[];
	onUpdate: (task: UpdateTaskInput) => void;
	onDelete: (task: DeleteTaskInput) => void;
	setOpenTaskModalStatus: (open: boolean) => void;
	setEditingTask: (task: Task) => void;
};

export default function TaskTable({ tasks, onUpdate, onDelete, setOpenTaskModalStatus, setEditingTask }: Props) {
	const [menuElement, setMenuElement] = useState<null | HTMLElement>(null);

	const [openConfirmTaskDelete, setOpenConfirmTaskDelete] = useState<boolean>(false);

	const [selectedTask, setSelectedTask] = useState<Task>();

	const openMenu = (event: React.MouseEvent<HTMLElement>, task: Task) => {
		setMenuElement(event.currentTarget);
		setSelectedTask(task);
	};
	const closeMenu = () => {
		setMenuElement(null);
		setSelectedTask(undefined);
	};

	const getCorrectTaskStatus = (status: string) => {
		switch (status) {
			case "NEW":
				return "Не почато";
			case "INPROGRESS":
				return "В процесі";
			case "DONE":
				return "Виконано";
			default:
				return "-";
		}
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ mt: "20px" }}>
				<Table sx={{ minWidth: 550 }} stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ p: "10px" }} width={"55%"}>
								Назва
							</TableCell>
							<TableCell sx={{ p: "10px" }} align="center" width={"20%"}>
								Дедлайн
							</TableCell>
							<TableCell sx={{ p: "10px" }} align="center" width={"20%"}>
								Статус
							</TableCell>
							<TableCell sx={{ p: "10px" }} align="center" width={"5%"}></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.length ? (
							tasks
								.sort((a, b) => {
									const statusPriority: any = { INPROGRESS: 1, NEW: 2, DONE: 3 };
									const statusComparison = statusPriority[a.status] - statusPriority[b.status];
									if (statusComparison !== 0) return statusComparison;
									return moment(b.deadline).diff(a.deadline);
								})
								.map(task => {
									const { id, title, deadline, status } = task;
									const cellSX = { p: "10px" };
									const statusColor = status === "DONE" ? "#00FF00" : status === "INPROGRESS" ? "#FFFF00" : "#EFEFEF";

									return (
										<TableRow key={id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
											<TableCell sx={cellSX}>{title}</TableCell>
											<TableCell sx={cellSX} align="center">
												{deadline}
											</TableCell>
											<TableCell sx={cellSX} align="center">
												<Box sx={{ background: statusColor, borderRadius: "20px" }}>{getCorrectTaskStatus(status)}</Box>
											</TableCell>
											<TableCell sx={cellSX} align="center">
												<IconButton onClick={(event: any) => openMenu(event, task)}>
													<MoreVertIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})
						) : (
							<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell sx={{ p: "10px" }} colSpan={4} align="center">
									Завдання відсутні
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<Menu anchorEl={menuElement} open={Boolean(menuElement)} onClose={closeMenu}>
				<MenuItem
					onClick={() => {
						if (!selectedTask) return;
						setEditingTask(selectedTask);
						closeMenu();
						setOpenTaskModalStatus(true);
					}}>
					Відредагувати
				</MenuItem>
				<MenuItem
					onClick={() => {
						if (!selectedTask) return;
						const { id, _version } = selectedTask;
						onUpdate({ id, status: "DONE", _version });
						closeMenu();
					}}>
					Виконано
				</MenuItem>
				<MenuItem onClick={() => setOpenConfirmTaskDelete(true)} sx={{ color: "#ff0000" }}>
					Видалити
				</MenuItem>
			</Menu>
			<Dialog open={openConfirmTaskDelete} onClose={() => setOpenConfirmTaskDelete(false)}>
				<DialogTitle>{`Видалення ${selectedTask ? `"${selectedTask.title}"` : ""} завдання`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Ви дійсно хочете видалити {`${selectedTask ? `"${selectedTask.title}"` : ""}`} завдання? Після видалення це завдання зникне назавжди
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ display: "flex", justifyContent: "center", columnGap: "20px", mb: "10px" }}>
					<Button
						onClick={() => {
							if (!selectedTask) return;
							const { id, _version } = selectedTask;
							onDelete({ id, _version });
							setOpenConfirmTaskDelete(false);
							closeMenu();
						}}
						variant="contained"
						color="error">
						Видалити
					</Button>
					<Button
						onClick={() => {
							closeMenu();
							setOpenConfirmTaskDelete(false);
						}}
						autoFocus
						variant="outlined">
						Скасувати
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
