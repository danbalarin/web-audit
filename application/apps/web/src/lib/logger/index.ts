import Pino from "pino";
import { env } from "~/env.mjs";

const pino = Pino({
	level: env.NEXT_PUBLIC_LOG_LEVEL,
	timestamp: Pino.stdTimeFunctions.isoTime,
});

export const trpcLogger = pino.child({ module: "trpc" });
export const procedureLogger = trpcLogger.child({ module: "trpc/procedure" });
export const moduleLogger = pino.child({ module: "module" });
export const createModuleLogger = (module: string) =>
	pino.child({ module: `module/${module}` });
export const reactLogger = pino.child({ module: "react" });
