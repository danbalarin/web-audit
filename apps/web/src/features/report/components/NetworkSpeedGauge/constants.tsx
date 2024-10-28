import {
  CheckCircle as CheckCircleIcon,
  Report as ReportIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { CircularProgress } from "@repo/ui";

export const MESSAGE_CONFIGS = {
  fast: {
    icon: <CheckCircleIcon color="success" />,
    tooltipText: "Your connection is good",
  },
  medium: {
    icon: <WarningIcon color="warning" />,
    tooltipText: "Your connection is slow, it might affect the tests",
  },
  slow: {
    icon: <ReportIcon color="error" />,
    tooltipText: "Your connection is very slow, it will affect tests",
  },
  waiting: {
    icon: <CircularProgress sx={{ mr: 1 }} size="1.5rem" />,
    tooltipText: "Waiting for connection check",
  },
};
