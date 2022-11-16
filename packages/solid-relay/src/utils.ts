import {
	CacheConfig,
	createOperationDescriptor,
	getRequest,
	GraphQLTaggedNode,
	OperationDescriptor,
	OperationType,
	Variables,
} from "relay-runtime";
import { QueryFetcher } from "./QueryFetcher";

export function createOperation(
	gqlQuery: GraphQLTaggedNode,
	variables: Variables,
	cacheConfig?: CacheConfig | null
): OperationDescriptor {
	return createOperationDescriptor(
		getRequest(gqlQuery),
		variables,
		cacheConfig
	);
}

export function getOrCreateQueryFetcher<TOperationType extends OperationType>(
	gqlQuery: GraphQLTaggedNode,
	variables: TOperationType["variables"],
	networkCacheConfig: CacheConfig
): QueryFetcher<TOperationType> {
	const query = createOperation(gqlQuery, variables, networkCacheConfig);
	const queryFetcher = new QueryFetcher<TOperationType>();
	queryFetcher.setQuery(gqlQuery, variables, networkCacheConfig, query);
	return queryFetcher;
}
