import type { Arbitrary } from "./arbitrary";
import type { Memory } from "./memory";
import type { Time } from "./time";
export * from "./arbitrary";
export * from "./memory";
export * from "./time";

export type MetricUnit = Arbitrary | Memory | Time;
