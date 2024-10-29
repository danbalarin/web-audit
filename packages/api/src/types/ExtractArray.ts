export type ExtractArray<T> = T extends Array<infer U> ? U : T;
