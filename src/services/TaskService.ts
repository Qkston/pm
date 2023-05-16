import { API, graphqlOperation } from "aws-amplify";
import { createTask, updateTask, deleteTask } from "../graphql/mutations";
import { CreateTaskInput, UpdateTaskInput, DeleteTaskInput } from "../API";

export const createTaskRecord = async (data: CreateTaskInput) => {
	try {
		return await API.graphql(graphqlOperation(createTask, { input: data }));
	} catch (error) {
		return error;
	}
};

export const updateTaskRecord = async (data: UpdateTaskInput) => {
	try {
		return await API.graphql(graphqlOperation(updateTask, { input: data }));
	} catch (error) {
		return error;
	}
};

export const deleteTaskRecord = async (data: DeleteTaskInput) => {
	try {
		return await API.graphql(graphqlOperation(deleteTask, { input: data }));
	} catch (error) {
		return error;
	}
};
