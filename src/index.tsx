import React from "react";
import ReactDOM from "react-dom/client";

import { Amplify } from "aws-amplify";

import "moment/locale/uk";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "./index.css";
import App from "./App";

import config from "./aws-exports";

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="uk">
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</LocalizationProvider>
);
