import "@aws-amplify/ui-react/styles.css";
import { withAuthenticator, View } from "@aws-amplify/ui-react";
import { Box, Button, Divider, Typography } from "@mui/material";

import logo from "./images/logo.png";
import Projects from "./components/Projects/Projects";

function App({ signOut }: { signOut?: () => void }) {
	return (
		<View className="App">
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					padding: "20px 30px",
					margin: "0",
				}}>
				<Box sx={{ display: "flex", alignItems: "center", columnGap: "20px" }}>
					<img src={logo} alt="Logo" width={48} />
					<Typography variant="h4" component="h1" fontWeight={500}>
						Project Management
					</Typography>
				</Box>
				<Button variant="outlined" size="large" onClick={signOut}>
					Вихід
				</Button>
			</Box>
			<Divider />
			<Box>
				<Projects />
			</Box>
		</View>
	);
}

export default withAuthenticator(App);
