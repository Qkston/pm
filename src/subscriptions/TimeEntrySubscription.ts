import { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listTimeEntries } from "../graphql/queries";
import { onCreateTimeEntry, onUpdateTimeEntry, onDeleteTimeEntry } from "../graphql/subscriptions";
import { TimeEntry } from "../API";

function TimeEntriesSubscription() {
	const [timeEntries, updateTimeEntries] = useState<TimeEntry[]>([]);

	useEffect(() => {
		async function fetchData() {
			try {
				const responseData: any = await API.graphql(graphqlOperation(listTimeEntries));
				if (responseData.data.listTimeEntries && responseData.data.listTimeEntries.items && responseData.data.listTimeEntries.items.length > 0)
					updateTimeEntries(responseData.data.listTimeEntries.items);
				// console.log('fetch => listTimeEntries', responseData.data.listTimeEntries.items);
			} catch (error) {
				console.log("timeEntries error", error);
			}
		}

		fetchData();
	}, []);

	// subscriptions

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onCreateTimeEntry)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onCreateTimeEntry },
					},
				} = data;
				const updatedData: any = [...timeEntries, onCreateTimeEntry];
				updateTimeEntries(updatedData);
				// console.log('create => listTimeEntries');
			},
		});

		return () => subscription.unsubscribe();
	}, [timeEntries]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onUpdateTimeEntry)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onUpdateTimeEntry },
					},
				} = data;
				const newTimeEntries = timeEntries.filter(d => d.id !== onUpdateTimeEntry.id);
				const updatedData: any = [...newTimeEntries, onUpdateTimeEntry];
				updateTimeEntries(updatedData);
				// console.log('update => listTimeEntries');
			},
		});

		return () => subscription.unsubscribe();
	}, [timeEntries]);

	useEffect(() => {
		const subscription = (API.graphql(graphqlOperation(onDeleteTimeEntry)) as any).subscribe({
			next: (data: any) => {
				const {
					value: {
						data: { onDeleteTimeEntry },
					},
				} = data;
				const newTimeEntries = timeEntries.filter(d => d.id !== onDeleteTimeEntry.id);
				const updatedData: any = [...newTimeEntries, onDeleteTimeEntry];
				updateTimeEntries(updatedData);
				// console.log('delete => listTimeEntries');
			},
		});

		return () => subscription.unsubscribe();
	}, [timeEntries]);

	return timeEntries;
}

export default TimeEntriesSubscription;
