import { useUrlTest } from "~/features/report/hooks/useUrlTest";
import { useAuditState } from "~/features/report/states/auditState";
import { useConnectionCheckState } from "../state";

export const useCheckAllUrls = () => {
	const { run: urlTest } = useUrlTest();

	const urls = useAuditState((s) => s.urls);

	const checkUrl = async (url: string) => {
		console.log("checkUrl", url);
		try {
			useConnectionCheckState.setState({ status: `urlCheckInProgress.${url}` });
			const result = await urlTest(url);
			useConnectionCheckState.getState().checkUrlResult(url, result.ok);
		} catch (error) {
			useConnectionCheckState.setState({
				status: "error",
				error: `URL test failed: ${error}`,
			});
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
