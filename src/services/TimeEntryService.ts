import { API, graphqlOperation } from "aws-amplify";
import { createTimeEntry, updateTimeEntry, deleteTimeEntry } from "../graphql/mutations";
import { CreateTimeEntryInput, UpdateTimeEntryInput, DeleteTimeEntryInput } from "../API";

export const createTimeEntryRecord = async (data: CreateTimeEntryInput) => {
	try {
		return await API.graphql(graphqlOperation(createTimeEntry, { input: data }));
	} catch (error) {
		return error;
	}
};

export const updateTimeEntryRecord = async (data: UpdateTimeEntryInput) => {
	try {
		return await API.graphql(graphqlOperation(updateTimeEntry, { input: data }));
	} catch (error) {
		return error;
	}
};

export const deleteTimeEntryRecord = async (data: DeleteTimeEntryInput) => {
	try {
		return await API.graphql(graphqlOperation(deleteTimeEntry, { input: data }));
	} catch (error) {
		return error;
	}
};
