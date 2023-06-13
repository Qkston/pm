import moment from "moment";
import { useState } from "react";
import {
	TableContainer,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Menu,
	MenuItem,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";

import TaskDetailsModal from "../TaskDetailsModal";
import TaskTableRow from "./TableRow";

import { DeleteTaskInput, Project, Task, UpdateTaskInput } from "../../../API";
import { useUserContext } from "../../../contexts/UserContext";

type Props = {
	tasks: Task[];
	project: Project;
	onUpdate: (task: UpdateTaskInput) => void;
	onDelete: (task: DeleteTaskInput) => void;
	setOpenTaskModalStatus: (open: boolean) => void;
	setEditingTask: (task: Task) => void;
};

export default function TaskTable({ tasks, project, onUpdate, onDelete, setOpenTaskModalStatus, setEditingTask }: Props) {
	const { userID } = useUserContext();

	const [menuElement, setMenuElement] = useState<null | HTMLElement>(null);

	const [openConfirmTaskDelete, setOpenConfirmTaskDelete] = useState<boolean>(false);
	const [openTaskDetailsModalStatus, setOpenTaskDetailsModalStatus] = useState<boolean>(false);

	const [selectedTask, setSelectedTask] = useState<Task>();

	const openMenu = (event: React.MouseEvent<HTMLElement>, task: Task) => {
		setMenuElement(event.currentTarget);
		setSelectedTask(task);
	};

	const closeMenu = () => {
		setMenuElement(null);
		setSelectedTask(undefined);
	};

	const openTaskDetailsModal = (task: Task) => {
		setSelectedTask(task);
		setOpenTaskDetailsModalStatus(true);
	};

	const closeTaskDetailsModal = () => {
		setSelectedTask(undefined);
		setOpenTaskDetailsModalStatus(false);
	};

	return (
		<>
			<TableContainer component={Paper} sx={{ mt: "20px" }}>
				<Table sx={{ minWidth: 550 }} stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell sx={{ p: "10px" }} width={"250px"}>
								Назва
							</TableCell>
							<TableCell sx={{ p: "10px" }} align="center" width={"100px"}>
								Дедлайн
							</TableCell>
							<TableCell sx={{ p: "10px" }} align="center" width={"100px"}>
								Статус
							</TableCell>
							{userID === project.manager_id && (
								<TableCell sx={{ p: "10px" }} align="center" width={"200px"}>
									Виконавець
								</TableCell>
							)}
							<TableCell sx={{ p: "10px" }} align="center" width={"50px"}></TableCell>
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
								.map(task => (
									<TaskTableRow
										key={task.id}
										task={task}
										project={project}
										openMenu={openMenu}
										openTaskModal={() => openTaskDetailsModal(task)}
									/>
								))
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
				{userID === project.manager_id && (
					<MenuItem
						onClick={() => {
							if (!selectedTask) return;
							setEditingTask(selectedTask);
							closeMenu();
							setOpenTaskModalStatus(true);
						}}>
						Відредагувати
					</MenuItem>
				)}
				{selectedTask?.status !== "DONE" && (
					<MenuItem
						onClick={() => {
							if (!selectedTask) return;
							const { id, _version } = selectedTask;
							onUpdate({ id, status: "DONE", _version });
							closeMenu();
						}}>
						Завершено
					</MenuItem>
				)}
				{userID === project.manager_id && (
					<MenuItem onClick={() => setOpenConfirmTaskDelete(true)} sx={{ color: "#ff0000" }}>
						Видалити
					</MenuItem>
				)}
			</Menu>
			{openConfirmTaskDelete && (
				<Dialog open={openConfirmTaskDelete} onClose={() => setOpenConfirmTaskDelete(false)}>
					<DialogTitle>{`Видалення ${selectedTask ? `"${selectedTask.title}"` : ""} завдання`}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Ви дійсно хочете видалити {`${selectedTask ? `"${selectedTask.title}"` : ""}`} завдання? Після видалення це завдання зникне
							назавжди
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
			)}
			{openTaskDetailsModalStatus && selectedTask && <TaskDetailsModal opened onClose={closeTaskDetailsModal} task={selectedTask} />}
		</>
	);
}
