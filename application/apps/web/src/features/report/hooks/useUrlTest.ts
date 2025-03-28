import { trpc } from "~/server/query/client";

export type UseUrlTestOptions = Record<string, never>;

export type UseUrlTestCompleteResult = {
	ok: boolean;
};

export type UseUrlTestResult = {
	run: (url: string) => Promise<UseUrlTestCompleteResult>;
};

export const useUrlTest = (): UseUrlTestResult => {
	const checkUrl = trpc.useUtils().networkTest.testUrl.fetch;

	const run = (url: string) =>
		new Promise<UseUrlTestCompleteResult>((res, rej) => {
			checkUrl({ url })
				.then(() => {
					res({ ok: true });
				})
				.catch((error) => {
					rej({ ok: false, error });
				});
		});

	return { run };
};
