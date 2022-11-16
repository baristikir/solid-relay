import type { Component } from "solid-js";
import { createQuery, graphql } from "solid-relay";
import logo from "./logo.svg";
import styles from "./App.module.css";
import { AppBooksQuery } from "./__generated__/AppBooksQuery.graphql";

const App: Component = () => {
	const data = createQuery<AppBooksQuery>(
		graphql`
			query AppBooksQuery {
				books {
					title
				}
			}
		`,
		{}
	);

	return (
		<div class={styles.App}>
			<header class={styles.header}>
				<img src={logo} class={styles.logo} alt="logo" />

				<p>Fetched Data from Relay Store:</p>
				{JSON.stringify(data.data)}
			</header>
		</div>
	);
};

export default App;
