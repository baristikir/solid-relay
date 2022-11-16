import { Environment } from "relay-runtime";
import type { Context, JSX } from "solid-js";
import { createContext, useContext, onMount, onCleanup } from "solid-js";
import { ContextOptions } from "./types";

const RELAY_CONTEXT = Symbol("relay-context");

declare global {
	interface Window {
		SolidRelayEnvironmentContext?: Context<Environment | undefined>;
	}
}

export const defaultContext = createContext<Environment | undefined>(undefined);

function getRelayEnvironmentContext(
	context: Context<Environment | undefined> | undefined
) {
	if (context) {
		return context;
	}

	return defaultContext;
}

export function useRelayEnvironment({ context }: ContextOptions = {}) {
	const relayEnvironment = useContext(getRelayEnvironmentContext(context));

	if (!relayEnvironment) {
		throw new Error(
			"No RelayEnvironment set, use RelayEnvironmentProvider to set one"
		);
	}

	return relayEnvironment;
}

interface RelayEnvironmentContextProviderPropsBase {
	environment: Environment;
	children: JSX.Element;
}
type QueryClientProviderPropsWithContext = ContextOptions &
	RelayEnvironmentContextProviderPropsBase;

export type RelayEnvironmentProviderProps = QueryClientProviderPropsWithContext;

export function RelayContextProvider(
	props: RelayEnvironmentProviderProps
): JSX.Element {
	onMount(() => {
		console.log("mounted - `RelayContextProvider`");
	});

	onCleanup(() => {
		// cleanup client environment state here
		console.log("unmounted - `RelayContextProvider`");
	});

	const RelayEnvironmentContext = getRelayEnvironmentContext(props.context);

	return (
		<RelayEnvironmentContext.Provider value={props.environment}>
			{props.children}
		</RelayEnvironmentContext.Provider>
	);
}
