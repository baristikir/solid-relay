import type {
	CacheConfig,
	Environment,
	FetchPolicy,
	GraphQLResponse,
	OperationType,
	RenderPolicy,
} from "relay-runtime";
import type { Context } from "solid-js";

export interface ContextOptions {
	/**
	 * Use this to pass your Solid Relay context. Otherwise, `defaultContext` will be used.
	 */
	context?: Context<Environment | undefined>;
}

export interface RenderProps<TGQLQuery extends OperationType> {
	error: Error | null;
	data: TGQLQuery["response"] | null | undefined;
	isLoading: boolean;
	retry(): void;
}

export type QueryOptions = {
	fetchPolicy?: FetchPolicy;
	fetchKey?: string | number;
	networkCacheConfig?: CacheConfig;
	skip?: boolean;
	onResponse?: (response: GraphQLResponse) => void;
	onComplete?: (_e: Error | null) => void;
	UNSTABLE_renderPolicy?: RenderPolicy;
};

export interface Options {
	fetchPolicy?: FetchPolicy;
	onResponse?: (response: GraphQLResponse) => void;
	onComplete?: (arg: Error | null) => void;
	UNSTABLE_renderPolicy?: RenderPolicy;
}
