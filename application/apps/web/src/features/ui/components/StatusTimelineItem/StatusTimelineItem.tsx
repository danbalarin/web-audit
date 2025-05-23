import {
	TimelineItem as MuiTimelineItem,
	TimelineConnector,
	TimelineContent,
	TimelineDot,
	TimelineSeparator,
} from "@mui/lab";
import { useTheme } from "@mui/material-pigment-css";
import type React from "react";
import { useMemo } from "react";

export type StatusTimelineItemProps = {
	status: "ok" | "error" | "loading" | "waiting";
	children: React.ReactNode;
};

export function StatusTimelineItem({
	status,
	children,
}: StatusTimelineItemProps) {
	const { palette } = useTheme();

	const color = useMemo(() => {
		switch (status) {
			case "ok":
				return palette.success.main;
			case "error":
				return palette.error.main;
			default:
				return palette.grey[400];
		}
	}, [status]);

	return (
		<MuiTimelineItem style={{ "--timeline-color": color }}>
			<TimelineSeparator>
				<TimelineDot
					sx={{ bgcolor: "var(--timeline-color) !important" }}
					variant={status === "waiting" ? "outlined" : "filled"}
				/>
				<TimelineConnector
					sx={{ bgcolor: "var(--timeline-color) !important" }}
				/>
			</TimelineSeparator>
			<TimelineContent>{children}</TimelineContent>
		</MuiTimelineItem>
	);
}
