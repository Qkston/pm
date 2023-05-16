import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

import ProjectModal from "./ProjectModal";
import ProjectCard from "./Card";
import Dashboard from "./Dashboard/Dashboard";

import ProjectsSubscription from "../../subscriptions/ProjectSubscription";

import { Project } from "../../API";
import { createProjectRecord, deleteProjectRecord, updateProjectRecord } from "../../services/ProjectService";
import { useUserContext } from "../../contexts/UserContext";

export default function Projects() {
	const { userID } = useUserContext();

	const projects: Project[] = ProjectsSubscription();

	const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
	const [openConfirmProjectDelete, setOpenConfirmProjectDelete] = useState<boolean>(false);
	const [openProjectDashboard, setOpenProjectDashboard] = useState<boolean>(false);

	const [selectedProject, setSelectedProject] = useState<Project>();

	useEffect(() => {
		setSelectedProject(projects.find(p => p.id === selectedProject?.id && !p._deleted));
	}, [projects]);

	return (
		<>
			<Box sx={{ padding: "40px" }}>
				<Button
					variant="contained"
					size="large"
					onClick={() => {
						setSelectedProject(undefined);
						setOpenProjectModal(true);
					}}>
					Створити проект
				</Button>
				<Box sx={{ padding: "40px 0", display: "flex", flexWrap: "wrap", columnGap: "30px", rowGap: "30px" }}>
					{projects
						.sort((a, b) => a.name.localeCompare(b.name))
						.filter(p => (p.manager_id === userID || p.participant_ids?.some(id => id === userID)) && !p._deleted)
						.map(p => (
							<ProjectCard
								key={p.id}
								project={p}
								setSelectedProject={setSelectedProject}
								setOpenProjectModal={setOpenProjectModal}
								setOpenConfirmProjectDelete={setOpenConfirmProjectDelete}
								setOpenProjectDashboard={setOpenProjectDashboard}
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
			{openProjectDashboard && selectedProject && <Dashboard project={selectedProject} onClose={() => setOpenProjectDashboard(false)} />}
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
							const { id, _version } = selectedProject;
							deleteProjectRecord({ id, _version });
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
