// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type LogFn = (...args: any[]) => void;

export type Logger = {
	fatal: LogFn;
	error: LogFn;
	warn: LogFn;
	info: LogFn;
	trace: LogFn;
	debug: LogFn;
	child: (options: Record<string, unknown>) => Logger;
};
