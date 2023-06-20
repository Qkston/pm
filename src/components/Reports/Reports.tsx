import moment from "moment";
import { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, Filler, LineElement, LinearScale, PointElement, Title, ChartData } from "chart.js";
import { Avatar, Box, Paper, Step, StepLabel, Stepper, Typography, stepClasses } from "@mui/material";

import { getEmailByCognitoID } from "../../helpers/cognitoHelper";
import { StepIcon, StepperConnector } from "./ReportsComponentsHelper";

import { Project, Task } from "../../API";

type Props = {
	project: Project;
	tasks: Task[];
};

export default function Reports({ project, tasks }: Props) {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, ArcElement);
	const [managerEmail, setManagerEmail] = useState<string>("");

	useEffect(() => {
		getEmailByCognitoID(project.manager_id).then(email => email && setManagerEmail(email));
	}, []);

	const getMonthLabels = () => {
		const startMonth = moment(project.start_date);
		const endMonth = project.finish_date ? moment(project.finish_date) : moment(project.start_date).subtract(1, "month");

		const months = [];
		let current = startMonth;

		while (current.get("month") !== endMonth.get("month")) {
			months.push(current.format("MMMM YYYY"));
			current.add(1, "month");
		}

		months.push(current.format("MMMM YYYY"));
		return months;
	};

	const pieChartTaskData = {
		labels: ["Виконані", "В процесі", "Не початі"],
		datasets: [
			{
				data: [
					tasks.filter(t => t.status === "DONE").length,
					tasks.filter(t => t.status === "INPROGRESS").length,
					tasks.filter(t => t.status === "NEW").length,
				],
				backgroundColor: ["#00FF00", "#FFFF00", "#eaeaf0"],
			},
		],
	};

	const activityLineChartLabels = Array.from({ length: 15 }, (_, i) => moment().subtract(i, "days").startOf("day"));
	const activityLineChartData: ChartData<"line", any, string> = {
		labels: activityLineChartLabels.map(l => l.format("DD.MM")),
		datasets: [
			{
				fill: true,
				data: activityLineChartLabels.map(l => tasks.filter(t => moment(t.complete_date).isSame(l) && t.status === "DONE").length),
				backgroundColor: "#1976d2",
				tension: 1,
			},
		],
	};

	const activityLineChartOptions = {
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
		maintainAspectRatio: false,
		responsive: true,
	};

	return (
		<Box sx={{ width: "100%", height: "100vh", padding: "40px", background: "#eee" }}>
			<Box sx={{ display: "flex", columnGap: "30px", mb: "30px" }}>
				<Paper elevation={1} sx={{ flex: 3, padding: "20px" }}>
					<Box sx={{ display: "flex", alignItems: "center", columnGap: "20px", mb: "20px" }}>
						<Avatar sx={{ width: "64px", height: "64px" }}>{managerEmail ? managerEmail[0].toUpperCase() : undefined}</Avatar>
						<Box>
							<Typography color="text.primary" fontWeight={500}>
								{managerEmail}
							</Typography>
							<Typography color="text.secondary">Менеджер</Typography>
						</Box>
					</Box>
					{project.participant_ids && (
						<Typography color="text.primary" fontWeight={500}>
							Кількість учасників: {project.participant_ids.length}
						</Typography>
					)}
				</Paper>
				<Paper elevation={1} sx={{ flex: 7, padding: "20px", display: "flex", alignItems: "center" }}>
					<Box sx={{ flex: 1.5, display: "flex", alignItems: "center", flexDirection: "column" }}>
						<Typography variant="h3" component="p" color="text.primary">
							{moment().diff(project.start_date, "d")}
						</Typography>
						<Typography color="text.primary" textAlign="center">
							Тривалість проекту
							<br />
							(днів)
						</Typography>
					</Box>
					<Box sx={{ flex: 8.5, display: "flex", alignItems: "center", flexDirection: "column" }}>
						<Stepper activeStep={getMonthLabels().indexOf(moment().format("MMMM YYYY"))} alternativeLabel connector={<StepperConnector />}>
							{getMonthLabels().map((month, index, array) => (
								<Step key={index} sx={{ [`&.${stepClasses.root}`]: { flex: 3, width: project.finish_date ? "120px" : "85px" } }}>
									<StepLabel StepIconComponent={StepIcon} sx={{ display: "flex", flexDirection: "column" }}>
										<Typography variant="body2" component="p" color="text.primary">
											{month}
										</Typography>
										{index === 0 && (
											<Typography variant="caption" component="p" color="text.secondary">
												Початок: {moment(project.start_date).format("DD.MM")}
											</Typography>
										)}
										{index === array.length - 1 && project.finish_date && (
											<Typography variant="caption" component="p" color="text.secondary">
												Кінець: {moment(project.finish_date).format("DD.MM")}
											</Typography>
										)}
									</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
				</Paper>
			</Box>
			<Box sx={{ display: "flex", columnGap: "30px" }}>
				<Paper elevation={1} sx={{ flex: 3, padding: "20px" }}>
					<Typography variant="h5" fontWeight={500} component="p" color="text.primary" marginBottom="10px">
						Завдання
					</Typography>
					<Box sx={{ width: "300px", margin: "0 auto" }}>
						<Pie data={pieChartTaskData} />
					</Box>
					<Box sx={{ mt: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Typography variant="h6" component="p" fontWeight={400} color="text.primary">
							<b>{tasks.filter(t => t.status === "DONE").length}</b> виконано
						</Typography>
						<Typography variant="h6" component="p" fontWeight={400} color="text.primary">
							<b>{tasks.filter(t => t.status === "INPROGRESS").length}</b> в процесі
						</Typography>
						<Typography variant="h6" component="p" fontWeight={400} color="text.primary">
							всього <b>{tasks.length}</b>
						</Typography>
					</Box>
				</Paper>
				<Paper elevation={1} sx={{ flex: 7, padding: "20px" }}>
					<Typography variant="h5" fontWeight={500} component="p" color="text.primary" marginBottom="10px">
						Активність
					</Typography>
					<Box sx={{ height: "350px" }}>
						<Line data={activityLineChartData} options={activityLineChartOptions} />
					</Box>
				</Paper>
			</Box>
		</Box>
	);
}
