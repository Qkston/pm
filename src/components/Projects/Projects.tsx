import { Box, Button } from "@mui/material";
import { useState } from "react";

import ProjectModal from "./ProjectModal";

import ProjectsSubscription from "../../subscriptions/ProjectSubscription";

import { Project } from "../../API";
import { createProjectRecord } from "../../services/ProjectService";
import ProjectCard from "./Project";

export default function Projects() {
	const projects: Project[] = ProjectsSubscription();

	const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
	const [selectedProject, setSelectedProject] = useState<Project>();

	return (
		<>
			<Box sx={{ padding: "40px" }}>
				<Button variant="contained" size="large" onClick={() => setOpenProjectModal(true)}>
					Створити проект
				</Button>
				<Box sx={{ padding: "40px 0", display: "flex", flexWrap: "wrap", columnGap: "30px", rowGap: "30px" }}>{projects.map(ProjectCard)}</Box>
			</Box>
			<ProjectModal
				opened={openProjectModal}
				project={selectedProject}
				onClose={() => setOpenProjectModal(false)}
				onCreate={createProjectRecord}
			/>
		</>
	);
}
