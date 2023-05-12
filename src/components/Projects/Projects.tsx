import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";

import ProjectModal from "./ProjectModal";
import ProjectCard from "./Project";

import ProjectsSubscription from "../../subscriptions/ProjectSubscription";

import { Project } from "../../API";
import { createProjectRecord, deleteProjectRecord, updateProjectRecord } from "../../services/ProjectService";

export default function Projects() {
	const projects: Project[] = ProjectsSubscription();

	const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
	const [openConfirmProjectDelete, setOpenConfirmProjectDelete] = useState<boolean>(false);

	const [selectedProject, setSelectedProject] = useState<Project>();

	return (
		<>
			<Box sx={{ padding: "40px" }}>
				<Button variant="contained" size="large" onClick={() => setOpenProjectModal(true)}>
					Створити проект
				</Button>
				<Box sx={{ padding: "40px 0", display: "flex", flexWrap: "wrap", columnGap: "30px", rowGap: "30px" }}>
					{projects
						.sort((a, b) => a.name.localeCompare(b.name))
						.map(p => (
							<ProjectCard
								project={p}
								setSelectedProject={setSelectedProject}
								setOpenProjectModal={setOpenProjectModal}
								setOpenConfirmProjectDelete={setOpenConfirmProjectDelete}
							/>
						))}
				</Box>
			</Box>
			<ProjectModal
				opened={openProjectModal}
				project={selectedProject}
				onClose={() => setOpenProjectModal(false)}
				onCreate={createProjectRecord}
				onUpdate={updateProjectRecord}
			/>
			<Dialog
				open={openConfirmProjectDelete}
				onClose={() => setOpenConfirmProjectDelete(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description">
				<DialogTitle id="alert-dialog-title">{`Видалення ${selectedProject ? `"${selectedProject.name}"` : ""} проекту`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Ви дійсно хочете видалити {`${selectedProject ? `"${selectedProject.name}"` : ""}`} проекту? Після видалення він зникне назавжди
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ display: "flex", justifyContent: "center", columnGap: "20px", mb: "10px" }}>
					<Button
						onClick={() => {
							if (!selectedProject) return;
							deleteProjectRecord({ id: selectedProject.id });
							setOpenConfirmProjectDelete(false);
						}}
						variant="contained"
						color="error">
						Видалити
					</Button>
					<Button onClick={() => setOpenConfirmProjectDelete(false)} autoFocus variant="outlined">
						Скасувати
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
