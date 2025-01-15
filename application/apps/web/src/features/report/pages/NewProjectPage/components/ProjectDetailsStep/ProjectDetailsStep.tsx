import {
	ProjectDetailsForm,
	ProjectDetailsFormValues,
} from "~/features/report/components/ProjectDetailsForm";
import { useAuditState } from "~/features/report/states/auditState";

type Props = {
	onNext: () => void;
};

export function ProjectDetailsStep({ onNext }: Props) {
	const { name, urls } = useAuditState();
	const homeUrl = Object.entries(urls).find(([_key, url]) => url.isHome)?.[0];
	const otherUrls = Object.entries(urls)
		.filter(([_key, url]) => !url.isHome)
		.map(([key]) => key);
	const onSubmit = (data: ProjectDetailsFormValues) => {
		useAuditState.setState({ name: data.projectName });
		useAuditState.getState().addUrl(data.homeUrl, true);
		data.urls.forEach((url) => useAuditState.getState().addUrl(url, false));
		onNext();
	};
	return (
		<ProjectDetailsForm
			onSubmit={onSubmit}
			defaultValues={{ projectName: name, homeUrl, urls: otherUrls }}
		/>
	);
}
