import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listProjects } from "../graphql/queries";
import { onCreateProject, onUpdateProject, onDeleteProject } from "../graphql/subscriptions";
import { Project } from "./../API";

function ProjectsSubscription() {
	const [projects, updateProjects] = useState<Project[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const responseData: any = await API.graphql(graphqlOperation(listProjects));
				if (responseData.data.listProjects && responseData.data.listProjects.items && responseData.data.listProjects.items.length > 0)
					updateProjects(responseData.data.listProjects.items);
				// console.log('fetch => listProjects', responseData.data.listProjects.items);
			} catch (error) {
				console.log("projects error", error);
			}
		}

		fetchData();
	}, []);

	// subscriptions

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onCreateProject)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onCreateProject },
					},
				} = data;
				const updatedData: any = [...projects, onCreateProject];
				updateProjects(updatedData);
				// console.log('create => listProjects');
			},
		});

		return () => subscription.unsubscribe();
	}, [projects]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onUpdateProject)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onUpdateProject },
					},
				} = data;
				const newProjects = projects.filter(d => d.id !== onUpdateProject.id);
				const updatedData: any = [...newProjects, onUpdateProject];
				updateProjects(updatedData);
				// console.log('update => listProjects');
			},
		});

		return () => subscription.unsubscribe();
	}, [projects]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onDeleteProject)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onDeleteProject },
					},
				} = data;
				const newProjects = projects.filter(d => d.id !== onDeleteProject.id);
				const updatedData: any = [...newProjects, onDeleteProject];
				updateProjects(updatedData);
				// console.log('delete => listProjects');
			},
		});

		return () => subscription.unsubscribe();
	}, [projects]);

	return projects;
}

export default ProjectsSubscription;
