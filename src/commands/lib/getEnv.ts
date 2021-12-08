import type { env } from "../../env";

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export const getEnv = () => {
  return globalThis['env'] as Awaited<ReturnType<typeof env>>;
};