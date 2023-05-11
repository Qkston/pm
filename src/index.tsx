import React from "react";
import { Amplify } from "aws-amplify";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";

import config from "./aws-exports";

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<React.StrictMode>
		<App signOut={() => {}} />
	</React.StrictMode>
);
