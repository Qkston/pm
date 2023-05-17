import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listTasks } from "../graphql/queries";
import { onCreateTask, onUpdateTask, onDeleteTask } from "../graphql/subscriptions";
import { Task } from "../API";

function TasksSubscription() {
	const [tasks, updateTasks] = useState<Task[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const responseData: any = await API.graphql(graphqlOperation(listTasks));
				if (responseData.data.listTasks && responseData.data.listTasks.items && responseData.data.listTasks.items.length > 0)
					updateTasks(responseData.data.listTasks.items);
				// console.log('fetch => listTasks', responseData.data.listTasks.items);
			} catch (error) {
				console.log("tasks error", error);
			}
		}

		fetchData();
	}, []);

	// subscriptions

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onCreateTask)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onCreateTask },
					},
				} = data;
				const updatedData: any = [...tasks, onCreateTask];
				updateTasks(updatedData);
				// console.log('create => listTasks');
			},
		});

		return () => subscription.unsubscribe();
	}, [tasks]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onUpdateTask)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onUpdateTask },
					},
				} = data;
				const newTasks = tasks.filter(d => d.id !== onUpdateTask.id);
				const updatedData: any = [...newTasks, onUpdateTask];
				updateTasks(updatedData);
				// console.log('update => listTasks');
			},
		});

		return () => subscription.unsubscribe();
	}, [tasks]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onDeleteTask)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onDeleteTask },
					},
				} = data;
				const newTasks = tasks.filter(d => d.id !== onDeleteTask.id);
				const updatedData: any = [...newTasks, onDeleteTask];
				updateTasks(updatedData);
				// console.log('delete => listTasks');
			},
		});

		return () => subscription.unsubscribe();
	}, [tasks]);

	return tasks;
}

export default TasksSubscription;
