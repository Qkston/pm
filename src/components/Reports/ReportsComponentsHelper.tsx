import { Check } from "@mui/icons-material";
import { StepConnector, StepIconProps, stepConnectorClasses, styled } from "@mui/material";

export const StepperConnector = styled(StepConnector)(() => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: "calc(-50% + 16px)",
		right: "calc(50% + 16px)",
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "#1976d2",
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: "#1976d2",
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: "#eaeaf0",
		borderTopWidth: 3,
		borderRadius: 1,
	},
}));

const StepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
	color: "#eaeaf0",
	display: "flex",
	height: 22,
	alignItems: "center",
	...(ownerState.active && {
		color: "#1976d2",
	}),
	"& .StepIcon-completedIcon": {
		color: "#1976d2",
		zIndex: 1,
		fontSize: 18,
	},
	"& .StepIcon-circle": {
		width: 8,
		height: 8,
		borderRadius: "50%",
		backgroundColor: "currentColor",
	},
}));

export const StepIcon = (props: StepIconProps) => {
	const { active, completed, className } = props;

	return (
		<StepIconRoot ownerState={{ active }} className={className}>
			{completed ? <Check className="StepIcon-completedIcon" /> : <div className="StepIcon-circle" />}
		</StepIconRoot>
	);
};
