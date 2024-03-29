import { useState } from "react";
import { Box, Card, CardContent, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Project } from "../../API";
import { useUserContext } from "../../contexts/UserContext";

type Props = {
	project: Project;
	setSelectedProject: (project: Project) => void;
	setOpenProjectModal: (open: boolean) => void;
	setOpenConfirmProjectDelete: (open: boolean) => void;
	setOpenProjectDashboard: (open: boolean) => void;
};

export default function ProjectCard({
	project,
	setSelectedProject,
	setOpenProjectModal,
	setOpenConfirmProjectDelete,
	setOpenProjectDashboard,
}: Props) {
	const { userID } = useUserContext();

	const [menuElement, setMenuElement] = useState<null | HTMLElement>(null);

	const openMenu = (event: React.MouseEvent<HTMLElement>) => setMenuElement(event.currentTarget);
	const closeMenu = () => setMenuElement(null);

	return (
		<Card
			key={project.id}
			sx={{ width: 375, height: 200, cursor: "pointer" }}
			onClick={() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
				setTimeout(() => {
					setSelectedProject(project);
					setOpenProjectDashboard(true);
				}, 200);
			}}>
			<CardContent>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<Typography variant="h5" component="h3" sx={{ pb: "5px" }}>
						{project.name}
					</Typography>
					{userID === project.manager_id && (
						<Box>
							<IconButton
								onClick={(event: any) => {
									event.stopPropagation();
									setSelectedProject(project);
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
									onClick={(event: any) => {
										event.stopPropagation();
										closeMenu();
										setOpenProjectModal(true);
									}}>
									Відредагувати
								</MenuItem>
								<MenuItem
									onClick={(event: any) => {
										event.stopPropagation();
										closeMenu();
										setOpenConfirmProjectDelete(true);
									}}
									sx={{ color: "#ff0000" }}>
									Видалити
								</MenuItem>
							</Menu>
						</Box>
					)}
				</Box>
				<Divider />
				<Typography sx={{ mt: 1.5 }} color="text.secondary">
					{project.description}
				</Typography>
			</CardContent>
		</Card>
	);
}
