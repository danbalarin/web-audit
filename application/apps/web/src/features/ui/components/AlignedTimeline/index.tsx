import { Timeline, TimelineProps } from "@mui/lab";

type Props = TimelineProps;

export function AlignedTimeline({ sx: _sx, ...props }: Props) {
	return (
		<Timeline
			sx={{
				// timelineItemClasses.root value pasted here because of pigment-css
				[`& .MuiTimelineItem-root::before`]: {
					flex: "0 !important",
					padding: "0 !important",
				},
			}}
			{...(props as object)}
		/>
	);
}
