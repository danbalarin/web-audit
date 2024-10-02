import { api } from "~/lib/api";

export type UseUrlTestOptions = {};

export type UseUrlTestCompleteResult = {
  ok: boolean;
};

export type UseUrlTestResult = {
  run: (url: string) => Promise<UseUrlTestCompleteResult>;
};

export const useUrlTest = (): UseUrlTestResult => {
  const checkUrl = api.useUtils().networkTest.testUrl.fetch;

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
