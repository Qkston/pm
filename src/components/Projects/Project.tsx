import { Card, CardContent, Typography } from "@mui/material";
import { Project } from "../../API";
import { Divider } from "@aws-amplify/ui-react";

export default function ProjectCard(project: Project) {
	return (
		<Card key={project.id} sx={{ width: 375, height: 200 }}>
			<CardContent>
				<Typography variant="h5" component="h3" sx={{ pb: "5px" }}>
					{project.name}
				</Typography>
				<Divider />
				<Typography sx={{ mt: 1.5 }} color="text.secondary">
					{project.description}
				</Typography>
			</CardContent>
		</Card>
	);
}
