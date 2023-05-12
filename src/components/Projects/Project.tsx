import { useState } from "react";
import { Box, Card, CardContent, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Project } from "../../API";

type Props = {
	project: Project;
	setSelectedProject: (project: Project) => void;
	setOpenProjectModal: (open: boolean) => void;
	setOpenConfirmProjectDelete: (open: boolean) => void;
};

export default function ProjectCard({ project, setSelectedProject, setOpenProjectModal, setOpenConfirmProjectDelete }: Props) {
	const [menuElement, setMenuElement] = useState<null | HTMLElement>(null);

	const openMenu = (event: React.MouseEvent<HTMLElement>) => setMenuElement(event.currentTarget);
	const closeMenu = () => setMenuElement(null);

	return (
		<Card key={project.id} sx={{ width: 375, height: 200, cursor: "pointer" }} onClick={() => setSelectedProject(project)}>
			<CardContent>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Typography variant="h5" component="h3" sx={{ pb: "5px" }}>
						{project.name}
					</Typography>
					<Box>
						<IconButton
							onClick={(event: any) => {
								event.stopPropagation();
								openMenu(event);
							}}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							anchorEl={menuElement}
							open={Boolean(menuElement)}
							onClose={(event: any) => {
								event.stopPropagation();
								closeMenu();
							}}>
							<MenuItem
								onClick={() => {
									closeMenu();
									setOpenProjectModal(true);
								}}>
								Відредагувати
							</MenuItem>
							<MenuItem
								onClick={() => {
									closeMenu();
									setOpenConfirmProjectDelete(true);
								}}
								sx={{ color: "#ff0000" }}>
								Видалити
							</MenuItem>
						</Menu>
					</Box>
				</Box>
				<Divider />
				<Typography sx={{ mt: 1.5 }} color="text.secondary">
					{project.description}
				</Typography>
			</CardContent>
		</Card>
	);
}
