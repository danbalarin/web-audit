import { useCallback } from "react";
import { useSpeedTest } from "~/features/report/hooks/useSpeedTest";
import { useConnectionCheckState } from "../state";

export const useRunSpeedTest = () => {
	const { run: speedTest } = useSpeedTest({});
	const runSpeedTest = useCallback(async () => {
		try {
			useConnectionCheckState.setState({ status: "speedCheckInProgress" });
			const result = await speedTest();
			useConnectionCheckState.setState({
				status: "speedCheckComplete",
				speed: result,
			});
		} catch (error) {
			useConnectionCheckState.setState({
				status: "error",
				error: `Speed test failed: ${error}`,
			});
		}
	}, [speedTest]);

	return { runSpeedTest };
};
