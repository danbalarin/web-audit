import { UnionToIntersection } from "./UnionToIntersection";

export type CombineUnion<T> = {
  [K in keyof UnionToIntersection<T>]: UnionToIntersection<T>[K];
};
