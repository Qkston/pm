import { API, graphqlOperation } from "aws-amplify";
import { createComment, updateComment, deleteComment } from "../graphql/mutations";
import { CreateCommentInput, UpdateCommentInput, DeleteCommentInput } from "../API";

export const createCommentRecord = async (data: CreateCommentInput) => {
	try {
		return await API.graphql(graphqlOperation(createComment, { input: data }));
	} catch (error) {
		return error;
	}
};

export const updateCommentRecord = async (data: UpdateCommentInput) => {
	try {
		return await API.graphql(graphqlOperation(updateComment, { input: data }));
	} catch (error) {
		return error;
	}
};

export const deleteCommentRecord = async (data: DeleteCommentInput) => {
	try {
		return await API.graphql(graphqlOperation(deleteComment, { input: data }));
	} catch (error) {
		return error;
	}
};
