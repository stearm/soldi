import { MutationFunctionOptions, ExecutionResult } from "@apollo/react-common";

export type MutationFN<V, T> = (options?: MutationFunctionOptions<T, V> | undefined) => Promise<ExecutionResult<T>>;
