# Solid-Relay

> 🚧 Still in Development

[Relay](https://relay.dev) Integration for [SolidJS](https://www.solidjs.com/)

Goal of this project is the use GraphQL in SolidJS, powered by the production-ready Relay runtime.

## Roadmap

- [ ] GraphQL Query
- [ ] GraphQL Mutation
- [ ] GraphQL Subscription

### Apps and Packages

Example Apps (Test Environment):

- `web`: A SolidJS web app, to test `solid-relay` integration.
- `server`: A simple static Apollo GraphQL Server.

Packages:

- `solid-relay`: Integration of `relay-runtime` and `solidjs`.

### Develop

First of all install project dependencies, preferred `pnpm` as package manager:

```
pnpm install
```

To develop all apps and packages, run the following command:

```
pnpm run dev
```

# Usage

First create a Relay Environment and set it to the context via `RelayEnvironmentProvider`

(See example/web/src/relay/environment.ts):

```ts
import {
	Environment,
	Network,
	RecordSource,
	RequestParameters,
	Store,
	Variables,
} from "relay-runtime";

const environment = new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource(), { gcReleaseBufferSize: 10 }),
});

export default environment;
```

Set it to the context:

(See example/web/src/index.tsx)

```ts
import { render } from "solid-js/web";
import { RelayContextProvider } from "solid-relay";

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
```

Writing GraphQL queries through relay:

```ts
import { createQuery, graphql } from "solid-relay";
import type { Component } from "solid-js";

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
		<div>
			<p>Fetched Data from Relay Store:</p>
			{JSON.stringify(data.data)}
		</div>
	);
};
```
