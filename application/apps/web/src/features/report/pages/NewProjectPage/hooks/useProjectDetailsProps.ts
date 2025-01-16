import { ProjectDetailsFormValues } from "~/features/report/components/ProjectDetailsForm/schema";
import { useAuditState } from "~/features/report/states/auditState";
import { useNewProjectState } from "../state";
import { Step } from "../types/Steps";

export const useProjectDetailsProps = () => {
	const { activeStep } = useNewProjectState();
	const { name, urls } = useAuditState();
	const [homeUrl, restUrls] = Object.entries(urls).reduce(
		(acc, [url, data]) => [
			data.isHome ? url : acc[0],
			data.isHome ? acc[1] : [...acc[1], url],
		],
		["", []] as [string, string[]],
	);
	return {
		defaultValues: {
			projectName: name,
			homeUrl,
			urls: restUrls,
		} as ProjectDetailsFormValues,
		onSubmit: (data: ProjectDetailsFormValues) => {
			const addUrl = useAuditState.getState().addUrl;
			useAuditState.setState({ name: data.projectName });
			addUrl(data.homeUrl, true);
			data.urls.forEach((url) => addUrl(url, false));
			useNewProjectState.setState({ activeStep: Step.ConnectionCheck });
		},
		disabled: activeStep !== Step.ProjectDetails,
	};
};
