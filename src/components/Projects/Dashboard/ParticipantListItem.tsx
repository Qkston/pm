import { useState } from "react";
import { ListItem, ListItemIcon, Avatar, ListItemText, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VerifiedIcon from "@mui/icons-material/Verified";

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
			<Box sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}>
				<ListItemText primary={email.replace("(manager)", "")} />
				{email.includes("(manager)") && <VerifiedIcon sx={{ color: "#1976d2" }} />}
			</Box>
			{isHovered && !email.includes("(manager)") && (
				<IconButton onClick={() => removeParticipant(email)}>
					<DeleteIcon color="error" />
				</IconButton>
			)}
		</ListItem>
	);
}
