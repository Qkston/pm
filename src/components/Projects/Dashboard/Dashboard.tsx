import { useEffect, useState } from "react";
import { CognitoIdentityServiceProvider, config } from "aws-sdk";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	AppBar,
	IconButton,
	Toolbar,
	Box,
	Button,
	List,
	TextField,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClearIcon from "@mui/icons-material/Clear";

import ParticipantListItem from "./ParticipantListItem";
import TaskModal from "../../Tasks/TaskModal";
import TaskTable from "../../Tasks/Table/Table";
import TimeEntry from "../../TimeEntry/TimeEntry";
import { getCorrectTaskStatus } from "../../../helpers/valueConverter";

import TasksSubscription from "../../../subscriptions/TaskSubscription";

import { Project, Task } from "../../../API";
import { updateProjectParticipants } from "../../../services/ProjectService";
import { createTaskRecord, deleteTaskRecord, updateTaskRecord } from "../../../services/TaskService";
import { useUserContext } from "../../../contexts/UserContext";

type Props = {
	project: Project;
	onClose: () => void;
};

export default function Dashboard({ project, onClose }: Props) {
	const { userID } = useUserContext();

	const tasks: Task[] = TasksSubscription();

	const [openAddUserInput, setOpenAddUserInputStatus] = useState<boolean>(false);
	const [openTaskModal, setOpenTaskModalStatus] = useState<boolean>(false);

	const [selectedTask, setSelectedTask] = useState<Task>();

	const [email, setEmail] = useState<string>("");
	const [userEmails, setUserEmails] = useState<string[]>([]);

	const [filterStatus, setFilterStatus] = useState<string>("");

	useEffect(() => {
		getEmails();
	}, [project]);

	const getEmails = async () => {
		try {
			const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
			config.update({
				region: process.env.REACT_APP_AWS_REGION,
				accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
				secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
			});
			const params: CognitoIdentityServiceProvider.ListUsersRequest = { UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || "" };

			cognitoIdentityServiceProvider.listUsers(params, (err, data) => {
				if (err || !data.Users) return;

				const filteredUsers = data.Users.filter(({ Attributes }) => {
					if (!Attributes?.length) return false;
					const id = Attributes.find(({ Name }) => Name === "sub")?.Value;
					return project.manager_id === id || project.participant_ids?.some(pid => pid === id);
				});

				const emails = filteredUsers
					.map(({ Attributes }) => {
						if (!Attributes?.length) return false;
						const email = Attributes.find(({ Name }) => Name === "email")?.Value;
						const isManager = Attributes.find(({ Name }) => Name === "sub")?.Value === project.manager_id;
						return `${email}${isManager ? "(manager)" : ""}`;
					})
					.filter(Boolean);

				setUserEmails(emails as string[]);
			});
		} catch (error) {
			console.log("Помилка отримання електронних адрес:", error);
		}
	};

	const getCognitoIDByEmail = async (email: string) => {
		try {
			const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
			const params = { UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || "", Filter: `email = "${email}"`, Limit: 1 };

			const response = await cognitoIdentityServiceProvider.listUsers(params).promise();
			const users = response.Users;

			if (!users?.length || !users[0].Username) return;
			return users[0].Username;
		} catch (error) {
			console.log("Помилка при отриманні cognitoID:", error);
		}
	};

	const getEmailByCognitoID = async (cognitoID: string) => {
		const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();
		const params = { UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID || "", Filter: `sub = "${cognitoID}"`, Limit: 1 };

		try {
			const response = await cognitoIdentityServiceProvider.listUsers(params).promise();
			const users = response.Users;

			if (!users?.length || !users[0].Attributes) return;
			return users[0].Attributes?.find(attr => attr.Name === "email")?.Value;
		} catch (error) {
			console.error("Помилка при отриманні email:", error);
		}
	};

	const addNewParticipant = (participantID: string) => {
		const participantIDs = [...((project.participant_ids?.filter(Boolean) as string[]) || []), participantID];
		updateProjectParticipants(project.id, participantIDs, project._version).then(() => setEmail(""));
	};

	const removeParticipant = (participantID: string) => {
		const participantIDs = project.participant_ids?.filter(id => id !== participantID) || [];
		updateProjectParticipants(project.id, participantIDs.filter(Boolean) as string[], project._version).then(() => setEmail(""));
	};

	return (
		<>
			<Dialog fullScreen open sx={{ mt: "88px" }} BackdropProps={{ style: { display: "none" } }}>
				<AppBar sx={{ position: "relative" }}>
					<Toolbar sx={{ display: "flex", alignItems: "center" }}>
						<IconButton color="inherit" onClick={onClose}>
							<ArrowBackIosNewIcon />
						</IconButton>
						<DialogTitle>{project.name}</DialogTitle>
					</Toolbar>
				</AppBar>
				<DialogContent sx={{ display: "flex", p: 0 }}>
					<Box sx={{ flex: userID === project.manager_id ? 4 : 2, borderRight: "2px solid #eeeeee", p: "20px", boxSizing: "border-box" }}>
						<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
							{userID === project.manager_id && (
								<Button variant="outlined" size="large" onClick={() => setOpenTaskModalStatus(true)}>
									Створити завдання
								</Button>
							)}
							<FormControl sx={{ width: "300px" }} variant="standard">
								<InputLabel>Статус</InputLabel>
								<Select
									value={filterStatus}
									onChange={(event: SelectChangeEvent) => {
										setFilterStatus(event.target.value as string);
									}}
									endAdornment={
										<IconButton sx={{ visibility: filterStatus ? "visible" : "hidden" }} onClick={() => setFilterStatus("")}>
											<ClearIcon />
										</IconButton>
									}
									sx={{
										"& .MuiSelect-iconStandard": { display: filterStatus ? "none" : "" },
										"&.Mui-focused .MuiIconButton-root": { color: "primary.main" },
									}}>
									{["NEW", "INPROGRESS", "DONE"].map(status => (
										<MenuItem key={status} value={status}>
											{getCorrectTaskStatus(status)}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<TaskTable
							tasks={tasks.filter(
								({ status, user_id, project_id, _deleted }) =>
									(!filterStatus || status === filterStatus) &&
									(userID === project.manager_id || user_id === userID) &&
									project_id === project.id &&
									!_deleted
							)}
							project={project}
							onUpdate={updateTaskRecord}
							onDelete={deleteTaskRecord}
							setOpenTaskModalStatus={setOpenTaskModalStatus}
							setEditingTask={setSelectedTask}
							getEmailByCognitoID={getEmailByCognitoID}
						/>
					</Box>
					<Box sx={{ flex: 4, borderRight: "2px solid #eeeeee", p: "20px", boxSizing: "border-box" }}>
						{userID && project.manager_id !== userID && (
							<TimeEntry tasks={tasks.filter(t => t.user_id === userID && t.project_id === project.id && !t._deleted)} />
						)}
					</Box>
					<Box sx={{ flex: userID === project.manager_id ? 2 : 1, width: "400px", p: "20px", boxSizing: "border-box" }}>
						{userID === project.manager_id && (
							<Button
								variant="outlined"
								size="large"
								sx={{ display: openAddUserInput ? "none" : "block", m: "0 auto", height: "50px" }}
								onClick={() => setOpenAddUserInputStatus(true)}>
								Додати учасника
							</Button>
						)}
						<Box
							sx={{
								display: openAddUserInput ? "flex" : "none",
								alignItems: "center",
								columnGap: "10px",
							}}>
							<TextField
								value={email}
								onChange={(event: any) => setEmail(event.target.value)}
								sx={{ flex: 3 }}
								placeholder="Електронна пошта користувача"
								variant="outlined"
							/>
							<Box sx={{ flex: 1 }}>
								<IconButton
									onClick={async () => {
										const cognitoID = await getCognitoIDByEmail(email);
										if (cognitoID) addNewParticipant(cognitoID);
									}}>
									<AddOutlinedIcon />
								</IconButton>
								<IconButton
									onClick={() => {
										setOpenAddUserInputStatus(false);
										setEmail("");
									}}>
									<CloseIcon />
								</IconButton>
							</Box>
						</Box>
						<List sx={{ mt: "20px" }}>
							{userEmails
								.sort((a, b) => a.localeCompare(b))
								.map(email => (
									<ParticipantListItem
										key={email}
										email={email}
										showRemove={project.manager_id === userID}
										removeParticipant={async (email: string) => {
											const cognitoID = await getCognitoIDByEmail(email);
											if (cognitoID) removeParticipant(cognitoID);
										}}
									/>
								))}
						</List>
					</Box>
				</DialogContent>
			</Dialog>
			<TaskModal
				opened={openTaskModal}
				projectID={project.id}
				userEmails={userEmails}
				task={selectedTask}
				getEmailByCognitoID={getEmailByCognitoID}
				onClose={() => {
					setOpenTaskModalStatus(false);
					setSelectedTask(undefined);
				}}
				onCreate={async data => {
					const cognitoID = await getCognitoIDByEmail(data.user_id || "");
					const updatedData = { ...data, user_id: cognitoID };
					createTaskRecord(updatedData);
				}}
				onUpdate={async data => {
					const cognitoID = await getCognitoIDByEmail(data.user_id || "");
					const updatedData = { ...data, user_id: cognitoID };
					updateTaskRecord(updatedData);
				}}
			/>
		</>
	);
}
