import { OperationResult } from "urql";

export type MutationFN<V, T> = (variables?: V | undefined) => Promise<OperationResult<T>>;
