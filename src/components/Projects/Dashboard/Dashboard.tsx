import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, AppBar, IconButton, Toolbar, Box, Button, List, TextField } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CognitoIdentityServiceProvider, config } from "aws-sdk";

import ParticipantListItem from "./ParticipantListItem";

import { Project } from "../../../API";
import { updateProjectParticipants } from "../../../services/ProjectService";

type Props = {
	project: Project;
	onClose: () => void;
};

export default function Dashboard({ project, onClose }: Props) {
	const [openAddUserInput, setOpenAddUserInputStatus] = useState<boolean>(false);

	const [email, setEmail] = useState<string>("");
	const [userEmails, setUserEmails] = useState<string[]>([]);

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

	const addNewParticipant = (participantID: string) => {
		const participantIDs = [...((project.participant_ids?.filter(Boolean) as string[]) || []), participantID];
		updateProjectParticipants(project.id, participantIDs, project._version).then(() => setEmail(""));
	};

	const removeParticipant = (participantID: string) => {
		const participantIDs = project.participant_ids?.filter(id => id !== participantID) || [];
		updateProjectParticipants(project.id, participantIDs.filter(Boolean) as string[], project._version).then(() => setEmail(""));
	};

	return (
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
				<Box sx={{ flex: 4, borderRight: "2px solid #eeeeee" }}></Box>
				<Box sx={{ flex: 1, p: "20px", boxSizing: "border-box" }}>
					<Button
						variant="outlined"
						size="large"
						sx={{ display: openAddUserInput ? "none" : "block", m: "0 auto", height: "50px" }}
						onClick={() => setOpenAddUserInputStatus(true)}>
						Додати учасника
					</Button>
					<Box
						sx={{
							display: openAddUserInput ? "flex" : "none",
							alignItems: "center",
							columnGap: "10px",
						}}>
						<TextField
							value={email}
							onChange={(event: any) => setEmail(event.target.value)}
							sx={{ flex: 3.5 }}
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
					<List sx={{ width: "100%", mt: "20px" }}>
						{userEmails
							.sort((a, b) => a.localeCompare(b))
							.map(email => (
								<ParticipantListItem
									key={email}
									email={email}
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
	);
}