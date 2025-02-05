import { TRPCClientError } from "@trpc/client";
import { useUrlTest } from "~/features/report/hooks/useUrlTest";
import { useConnectionCheckState } from "../states/useConnectionCheckState";

export const useCheckUrls = (urls: string[]) => {
	const { run: urlTest } = useUrlTest();

	const checkUrl = async (url: string) => {
		try {
			useConnectionCheckState.setState({ status: `urlCheckInProgress.${url}` });
			const result = await urlTest(url);
			useConnectionCheckState.getState().checkUrlResult(url, result.ok);
		} catch (error) {
			console.log(error);
			if (error instanceof TRPCClientError) {
				useConnectionCheckState.setState({
					status: "error",
					error: `URL test failed: ${error.message}`,
				});
			}
		}
	};

	const checkAllUrls = async () => {
		for (const url in urls) {
			await checkUrl(url);
		}
		useConnectionCheckState.setState({ status: "urlCheckComplete" });
	};

	return { checkAllUrls };
};
