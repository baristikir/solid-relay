import { Disposable, GraphQLTaggedNode, OperationType } from "relay-runtime";
import { batch, createComputed, createResource, onCleanup } from "solid-js";
import { createStore, unwrap } from "solid-js/store";
import { useRelayEnvironment } from "./RelayEnvironmentProvider";
import { QueryOptions, RenderProps } from "./types";
import { createOperation } from "./utils";

export interface CreateQueryResult<TQuery extends OperationType>
	extends RenderProps<TQuery> {}

export function createQuery<TQueryGQL extends OperationType>(
	gql: GraphQLTaggedNode,
	variables: TQueryGQL["variables"],
	options: QueryOptions = {}
): CreateQueryResult<TQueryGQL> {
	const [argsState, setArgsState] = createStore({ gql, variables, options });

	createComputed(() => {
		const newArgs = { gql, variables, options };
		setArgsState(newArgs);
	});

	const subscriptions = new Set<Disposable>();

	const environment = useRelayEnvironment();
	const operation = createOperation(gql, variables);

	const [state, setState] = createStore<Promise<TQueryGQL["response"]>>(
		unwrap(
			environment
				.execute({ operation })
				.toPromise()
				.then(() => {
					const snapshot = environment.lookup(operation.fragment);
					subscriptions.add(
						environment.subscribe(snapshot, (newSnapshot) =>
							Promise.resolve(newSnapshot.data)
						)
					);
					return snapshot.data;
				})
		)
	);

	const [dataResource, { mutate, refetch }] = createResource(
		() =>
			new Promise((resolve) => {
				if (state) {
					const result = unwrap(state) as TQueryGQL["response"];
					resolve(result);
				}
			})
	);

	const unsubscribe = () => {
		subscriptions.forEach((sub) => {
			sub.dispose();
		});
		subscriptions.clear();
	};

	onCleanup(() => unsubscribe());

	batch(() => {
		mutate(() => unwrap(state));
		refetch();
	});

	subscriptions.add(environment.retain(operation));

	const handler = {
		get(target: any, prop: any): any {
			if (prop === "data") {
				return dataResource();
			}
			return Reflect.get(target, prop);
		},
	};

	return new Proxy(state, handler);
}
