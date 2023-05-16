import "@aws-amplify/ui-react/styles.css";
import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, View } from "@aws-amplify/ui-react";
import { Box, Button, Divider, Typography } from "@mui/material";

import logo from "./images/logo.png";
import Projects from "./components/Projects/Projects";
import { useUserContext } from "./contexts/UserContext";

function App({ signOut }: { signOut?: () => void }) {
	const { setUserID } = useUserContext();

	useEffect(() => {
		const getCognitoID = async () => {
			try {
				const user = await Auth.currentAuthenticatedUser();
				const cognitoID = user.signInUserSession.idToken.payload.sub;
				setUserID(cognitoID || "");
			} catch (error) {
				console.log("Помилка отримання Cognito ID:", error);
			}
		};

		getCognitoID();
	}, []);

	return (
		<View>
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
						Task Tracker: Project Management with Time Tracking
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
