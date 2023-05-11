import { API, graphqlOperation } from "aws-amplify";
import { createProject, updateProject, deleteProject } from "../graphql/mutations";
import { CreateProjectInput, UpdateProjectInput, DeleteProjectInput } from "../API";

export const createProjectRecord = async (data: CreateProjectInput) => {
	try {
		return await API.graphql(graphqlOperation(createProject, { input: data }));
	} catch (error) {
		return error;
	}
};

export const updateProjectRecord = async (data: UpdateProjectInput) => {
	try {
		return await API.graphql(graphqlOperation(updateProject, { input: data }));
	} catch (error) {
		return error;
	}
};

export const deleteProjectRecord = async (data: DeleteProjectInput) => {
	try {
		return await API.graphql(graphqlOperation(deleteProject, { input: data }));
	} catch (error) {
		return error;
	}
};
