import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listComments } from "../graphql/queries";
import { onCreateComment, onUpdateComment, onDeleteComment } from "../graphql/subscriptions";
import { Comment } from "../API";

type Props = {
	task_id?: string;
};

function CommentsSubscription(props?: Props) {
	const [comments, updateComments] = useState<Comment[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const responseData: any = await API.graphql(graphqlOperation(listComments, { filter: { task_id: { eq: props?.task_id } } }));
				if (responseData.data.listComments && responseData.data.listComments.items && responseData.data.listComments.items.length > 0)
					updateComments(responseData.data.listComments.items);
				// console.log('fetch => listComments', responseData.data.listComments.items);
			} catch (error) {
				console.log("comments error", error);
			}
		}

		fetchData();
	}, []);

	// subscriptions

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onCreateComment)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onCreateComment },
					},
				} = data;
				const updatedData: any = [...comments, onCreateComment];
				updateComments(updatedData);
				// console.log('create => listComments');
			},
		});

		return () => subscription.unsubscribe();
	}, [comments]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onUpdateComment)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onUpdateComment },
					},
				} = data;
				const newComments = comments.filter(d => d.id !== onUpdateComment.id);
				const updatedData: any = [...newComments, onUpdateComment];
				updateComments(updatedData);
				// console.log('update => listComments');
			},
		});

		return () => subscription.unsubscribe();
	}, [comments]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onDeleteComment)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onDeleteComment },
					},
				} = data;
				const newComments = comments.filter(d => d.id !== onDeleteComment.id);
				const updatedData: any = [...newComments, onDeleteComment];
				updateComments(updatedData);
				// console.log('delete => listComments');
			},
		});

		return () => subscription.unsubscribe();
	}, [comments]);

	return comments;
}

export default CommentsSubscription;
