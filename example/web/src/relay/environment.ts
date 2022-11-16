import {
	Environment,
	Network,
	RecordSource,
	RequestParameters,
	Store,
	Variables,
} from "relay-runtime";

async function fetchQuery(operation: RequestParameters, variables: Variables) {
	const response = await fetch("http://localhost:4000/", {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json",
		},
		body: JSON.stringify({
			id: operation.id,
			query: operation.text,
			variables,
		}),
	});

	return response.json();
}

const environment = new Environment({
	network: Network.create(fetchQuery),
	store: new Store(new RecordSource(), { gcReleaseBufferSize: 10 }),
});

export default environment;
