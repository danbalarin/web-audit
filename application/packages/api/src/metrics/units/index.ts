import type { Arbitrary } from "./arbitrary";
import type { Input } from "./input";
import type { Memory } from "./memory";
import type { Time } from "./time";
export * from "./arbitrary";
export * from "./input";
export * from "./memory";
export * from "./time";

export type MetricUnit = Arbitrary | Memory | Time | Input;
