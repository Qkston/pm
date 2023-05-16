import { useState } from "react";
import { ListItem, ListItemIcon, Avatar, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
	email: string;
	removeParticipant: (email: string) => void;
};

export default function ParticipantListItem({ email, removeParticipant }: Props) {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	return (
		<ListItem sx={{ cursor: "pointer", pl: 0 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
			<ListItemIcon>
				<Avatar>{email[0].toUpperCase()}</Avatar>
			</ListItemIcon>
			<ListItemText primary={email} />
			{isHovered && (
				<IconButton onClick={() => removeParticipant(email)}>
					<DeleteIcon color="error" />
				</IconButton>
			)}
		</ListItem>
	);
}
