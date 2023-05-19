import { useEffect, useState } from "react";
import moment from "moment";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import DeleteIcon from "@mui/icons-material/Delete";

import TimeEntriesSubscription from "../../subscriptions/TimeEntrySubscription";

import { CreateTimeEntryInput, Task, TimeEntry as TimeEntryAPI, UpdateTimeEntryInput } from "../../API";
import { useUserContext } from "../../contexts/UserContext";
import { createTimeEntryRecord, deleteTimeEntryRecord, updateTimeEntryRecord } from "../../services/TimeEntryService";
import { updateTaskRecord } from "../../services/TaskService";

type Props = {
	tasks: Task[];
};

type TimerType = {
	h: number;
	m: number;
	s: number;
};

export default function TimeEntry({ tasks }: Props) {
	const { userID } = useUserContext();

	const timeEntries = TimeEntriesSubscription();

	const [selectedTask, setSelectedTask] = useState<Task>();
	const [selectedTimeEntry, setSelectedTimeEntry] = useState<TimeEntryAPI>();

	const [timerValue, setTimerValue] = useState<TimerType>({ h: 0, m: 0, s: 0 });

	const [isTimerOn, setTimerOnStatus] = useState<boolean>(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);

	useEffect(() => {
		const uncompletedTask = tasks.find(({ id }) => timeEntries.some(te => !te.end && id === te.task_id && !te._deleted));

		setSelectedTask(uncompletedTask);
		setTimerOnStatus(!!uncompletedTask);
	}, [tasks]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (selectedTask && isTimerOn) {
				const timeEntry = timeEntries.find(te => !te.end && selectedTask.id === te.task_id && !te._deleted);
				if (!timeEntry) return;

				const duration = moment.duration(moment(timeEntry.start).diff(moment()));

				const h = Math.abs(duration.hours());
				const m = Math.abs(duration.minutes());
				const s = Math.abs(duration.seconds());

				setTimerValue({ h, m, s });
			} else setTimerValue({ h: 0, m: 0, s: 0 });
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, [isTimerOn, timeEntries]);

	const getCorrectTaskStatus = (status: string) => {
		switch (status) {
			case "NEW":
				return "Не почато";
			case "INPROGRESS":
				return "В процесі";
			case "DONE":
				return "Виконано";
			default:
				return "-";
		}
	};

	const onCreate = () => {
		if (!selectedTask || !userID) return;
		const data: CreateTimeEntryInput = {
			task_id: selectedTask.id,
			user_id: userID,
			start: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
		};

		createTimeEntryRecord(data).then(() => {
			const { id, _version } = selectedTask;
			if (selectedTask.status !== "INPROGRESS") updateTaskRecord({ id, status: "INPROGRESS", _version });
		});
	};

	const onUpdate = () => {
		if (!selectedTask) return;

		const timeEntry = timeEntries.find(te => !te.end && selectedTask.id === te.task_id && !te._deleted);
		if (!timeEntry) return;
		const { id, _version } = timeEntry;

		const data: UpdateTimeEntryInput = { id, end: moment().format("YYYY-MM-DDTHH:mm:ss.SSSZ"), _version };
		updateTimeEntryRecord(data).then(() => setSelectedTask(undefined));
	};

	const getGroupingKey = (timeEntry: TimeEntryAPI) => {
		const start = moment(timeEntry.start).startOf("day");
		const end = timeEntry.end ? moment(timeEntry.end).startOf("day") : null;

		if (start.isSame(moment(), "day")) return "Сьогодні";
		if (start.isSame(moment().subtract(1, "day"), "day")) return "Вчора";
		if (end && end.isSame(start, "day")) return start.format("DD/MM/YYYY");

		return "Other";
	};

	const groupedTimeEntries: { entries: TimeEntryAPI[] } = timeEntries
		.filter(te => te.end && userID === te.user_id && tasks.some(t => t.id === te.task_id) && !te._deleted)
		.sort((a, b) => moment(b.start).diff(a.start))
		.reduce((groups: any, entry) => {
			const key = getGroupingKey(entry);

			if (!groups[key]) groups[key] = [];
			groups[key].push(entry);

			return groups;
		}, {});

	return (
		<Box>
			<Box sx={{ display: "flex", alignItems: "center", columnGap: "30px" }}>
				<FormControl fullWidth variant="standard">
					<InputLabel>Виберіть завдання для відстеження</InputLabel>
					<Select
						value={selectedTask?.id || ""}
						onChange={(event: SelectChangeEvent) => {
							if (isTimerOn) {
								setTimerOnStatus(!isTimerOn);
								onUpdate();
							}
							setSelectedTask(tasks.find(t => t.id === event.target.value) || (undefined as Task | undefined));
						}}>
						{tasks.map(t => {
							const statusColor = t.status === "DONE" ? "#00FF00" : t.status === "INPROGRESS" ? "#FFFF00" : "#EFEFEF";
							return (
								<MenuItem key={t.id} value={t.id}>
									<span>{t.title}</span>
									{t.id !== selectedTask?.id && (
										<Box sx={{ background: statusColor, borderRadius: "20px", fontSize: "14px", ml: "10px", p: "5px 10px" }}>
											{getCorrectTaskStatus(t.status)}
										</Box>
									)}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<Box>
					<Typography fontSize={18}>{moment(timerValue).format("HH:mm:ss")}</Typography>
				</Box>
				<IconButton
					disabled={!selectedTask}
					onClick={() => {
						setTimerOnStatus(!isTimerOn);
						isTimerOn ? onUpdate() : onCreate();
					}}
					sx={{
						width: "75px",
						background: "#1976d2",
						borderRadius: "4px",
						":hover": { background: "#166abe" },
						":disabled": { background: "#bdbdbd" },
					}}>
					{isTimerOn ? <PauseIcon sx={{ color: "#fff" }} /> : <PlayArrowIcon sx={{ color: "#fff" }} />}
				</IconButton>
			</Box>
			<Box sx={{ mt: "30px" }}>
				{Object.entries(groupedTimeEntries).map(([day, entries]) => (
					<Box key={day}>
						<Typography component={"h5"} variant="h5" sx={{ mb: "10px" }}>
							{day}
						</Typography>
						{entries.map((e: TimeEntryAPI) => {
							const task = tasks.find(t => t.id === e.task_id);
							return (
								<Box
									key={e.id}
									sx={{
										display: "flex",
										alignItems: "center",
										m: "0 0 5px 10px",
										p: "5px",
										columnGap: "20px",
										":hover": { background: "#efefef" },
									}}>
									{task && <Typography sx={{ flex: 4 }}>{task.title}</Typography>}
									<Typography>{moment(e.start).format("HH:mm:ss")}</Typography>
									<Typography>-</Typography>
									<Typography>{moment(e.end).format("HH:mm:ss")}</Typography>
									<IconButton
										onClick={() => {
											setOpenConfirmDelete(true);
											setSelectedTimeEntry(e);
										}}>
										<DeleteIcon color="error" />
									</IconButton>
								</Box>
							);
						})}
					</Box>
				))}
			</Box>
			{openConfirmDelete && selectedTimeEntry && (
				<Dialog open onClose={() => setOpenConfirmDelete(false)}>
					<DialogTitle>Видалення запису відстеження часу</DialogTitle>
					<DialogContent>
						<DialogContentText>Ви дійсно хочете видалити запис відстеження часу? Після видалення він зникне назавжди</DialogContentText>
					</DialogContent>
					<DialogActions sx={{ display: "flex", justifyContent: "center", columnGap: "20px", mb: "10px" }}>
						<Button
							onClick={() => {
								const { id, _version } = selectedTimeEntry;
								deleteTimeEntryRecord({ id, _version });
								setOpenConfirmDelete(false);
							}}
							variant="contained"
							color="error">
							Видалити
						</Button>
						<Button onClick={() => setOpenConfirmDelete(false)} autoFocus variant="outlined">
							Скасувати
						</Button>
					</DialogActions>
				</Dialog>
			)}
		</Box>
	);
}
