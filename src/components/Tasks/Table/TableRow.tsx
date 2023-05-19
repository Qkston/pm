import { useState, useEffect } from "react";
import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { getCorrectTaskStatus, getStatusColor } from "../../../helpers/valueConverter";

import { Project, Task } from "../../../API";
import { useUserContext } from "../../../contexts/UserContext";

type Props = {
	task: Task;
	project: Project;
	openMenu: (event: React.MouseEvent<HTMLElement>, task: Task) => void;
	getEmailByCognitoID?: (cognitoID: string) => Promise<string | null | undefined>;
};

export default function TaskTableRow({ task, project, openMenu, getEmailByCognitoID }: Props) {
	const { userID } = useUserContext();
	const { title, deadline, status, user_id } = task;

	const [userEmail, setUserEmail] = useState("-");

	useEffect(() => {
		const fetchUserEmail = async (user_id?: string | null) => {
			try {
				if (!getEmailByCognitoID || !user_id) return;
				const email = await getEmailByCognitoID(user_id);
				setUserEmail(email || "-");
			} catch (error) {
				setUserEmail("-");
			}
		};

		fetchUserEmail(user_id);
	}, [task]);

	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell sx={{ p: "10px" }}>{title}</TableCell>
			<TableCell sx={{ p: "10px" }} align="center">
				{deadline}
			</TableCell>
			<TableCell sx={{ p: "10px" }} align="center">
				<Box sx={{ background: getStatusColor(status), borderRadius: "20px" }}>{getCorrectTaskStatus(status)}</Box>
			</TableCell>
			{userID === project.manager_id && (
				<TableCell sx={{ p: "10px" }} align="center">
					{userEmail}
				</TableCell>
			)}
			<TableCell sx={{ p: "10px" }} align="center">
				<IconButton onClick={(event: any) => openMenu(event, task)}>
					<MoreVertIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
}
