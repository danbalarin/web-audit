import {
  CheckCircle as CheckCircleIcon,
  Report as ReportIcon,
} from "@repo/icons";
import {
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
  Stack,
  useTheme,
  CircularProgress,
} from "@repo/ui";
import { motion } from "framer-motion";

type Props = {
  status: "ok" | "error" | "loading" | "waiting";
  url: string;
};

export function UrlTestTimelineItem({ status, url }: Props) {
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
                Checking
              </>
            )}
            {status === "waiting" && <>Waiting for previous tests</>}
            {status === "ok" && (
              <>
                <CheckCircleIcon fontSize="small" />
                Reachable
              </>
            )}
            {status === "error" && (
              <>
                <ReportIcon />
                Failed to load
              </>
            )}
          </Stack>
        </Stack>
      </TimelineContent>
    </TimelineItem>
  );
}
