export const getCorrectTaskStatus = (status: string) => {
	switch (status) {
		case "NEW":
			return "Не почато";
		case "INPROGRESS":
			return "В процесі";
		case "DONE":
			return "Завершено";
		default:
			return "-";
	}
};

export const getStatusColor = (status: string) => (status === "DONE" ? "#00FF00" : status === "INPROGRESS" ? "#FFFF00" : "#EFEFEF");
