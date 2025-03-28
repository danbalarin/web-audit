import Pino from "pino";
import { env } from "~/env.mjs";

const pino = Pino({
	level: env.NEXT_PUBLIC_LOG_LEVEL,
	timestamp: Pino.stdTimeFunctions.isoTime,
});

export const trpcLogger = pino.child(
	{ module: "trpc" },
	{ msgPrefix: "[trpc] " },
);
export const procedureLogger = trpcLogger.child(
	{ module: "trpc/procedure" },
	{ msgPrefix: "[procedure] " },
);
export const moduleProcessorLogger = pino.child(
	{ module: "module" },
	{ msgPrefix: "[module-processor] " },
);
export const createModuleLogger = (module: string) =>
	pino.child({ module: `module/${module}` }, { msgPrefix: `[${module}] ` });
export const reactLogger = pino.child(
	{ module: "react" },
	{ msgPrefix: "[react] " },
);
