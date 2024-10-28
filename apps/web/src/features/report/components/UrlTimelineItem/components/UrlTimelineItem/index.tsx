import {
  CheckCircle as CheckCircleIcon,
  Report as ReportIcon,
} from "@mui/icons-material";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { CircularProgress, Stack, useTheme } from "@mui/material";
import { motion } from "framer-motion";

import { UrlTimelineState } from "../../constants";

export type UrlTimelineItemProps = {
  status: UrlTimelineState;
  url: string;
  config: Record<UrlTimelineState, string>;
};

export function UrlTimelineItem({ status, url, config }: UrlTimelineItemProps) {
  const { palette } = useTheme();

  const color =
    status === "loading" || status === "waiting"
      ? undefined
      : status === "ok"
        ? "success"
        : "error";

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color={color} />
        <TimelineConnector sx={{ backgroundColor: `${color}.main` }} />
      </TimelineSeparator>
      <TimelineContent>
        <Stack>
          {url} check
          <Stack
            direction="row"
            component={motion.span}
            alignItems="center"
            animate={{
              color:
                !status || status === "loading" || status === "waiting"
                  ? undefined
                  : status === "ok"
                    ? palette.success.main
                    : palette.error.main,
            }}
            gap={1}
            ml={1.5}
            mt={1.5}
          >
            {status === "loading" && (
              <>
                <CircularProgress size="1.5rem" />
                {config[status]}
              </>
            )}
            {status === "waiting" && <> {config[status]}</>}
            {status === "ok" && (
              <>
                <CheckCircleIcon fontSize="small" />
                {config[status]}
              </>
            )}
            {status === "error" && (
              <>
                <ReportIcon />
                {config[status]}
              </>
            )}
          </Stack>
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
}
