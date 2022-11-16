/* @refresh reload */
import { render } from "solid-js/web";
import { RelayContextProvider } from "solid-relay";

import "./index.css";
import App from "./App";
import environment from "./relay/environment";

render(
	() => (
		<RelayContextProvider environment={environment}>
			<App />
		</RelayContextProvider>
	),
	document.getElementById("root") as HTMLElement
);
