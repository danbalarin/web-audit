import { CircularProgress, Stack } from "@mui/material";

import { StatusTimelineItem } from "~/features/ui/components/StatusTimelineItem";

import { UrlTimelineState } from "../../constants";

export type UrlTimelineItemProps = {
	status: UrlTimelineState;
	url: string;
	config: Record<UrlTimelineState, string>;
};

export function UrlTimelineItem({ status, url, config }: UrlTimelineItemProps) {
	return (
		<StatusTimelineItem status={status}>
			<Stack>
				{url} check
				<Stack direction="row" alignItems="center" gap={1} ml={1.5} mt={1.5}>
					{status === "loading" ? (
						<>
							<CircularProgress size="1.5rem" />
							{config[status]}
						</>
					) : (
						config[status]
					)}
				</Stack>
			</Stack>
		</StatusTimelineItem>
	);
}
