import { useUrlTest } from "~/features/report/hooks/useUrlTest";
import { useConnectionCheckState } from "../states/useConnectionCheckState";

export const useCheckUrls = (urls: string[]) => {
	const { run: urlTest } = useUrlTest();

	const checkUrl = async (url: string) => {
		try {
			useConnectionCheckState.setState({ status: `urlCheckInProgress.${url}` });
			const result = await urlTest(url);
			useConnectionCheckState.getState().checkUrlResult(url, result.ok);
			// biome-ignore lint/suspicious/noExplicitAny: error handling
		} catch (error: any) {
			useConnectionCheckState.setState({
				status: "error",
				error: `URL test failed: ${error?.message}`,
			});
			useConnectionCheckState.getState().checkUrlResult(url, false);
		}
	};

	const checkAllUrls = async () => {
		for (const url of urls) {
			await checkUrl(url);
			if (useConnectionCheckState.getState().error) {
				return;
			}
		}
		useConnectionCheckState.setState({ status: "urlCheckComplete" });
	};

	return { checkAllUrls };
};
