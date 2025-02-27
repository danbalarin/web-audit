import { CumulativeLayoutShift } from "./cumulative-layout-shift";
import clsDocument from "./cumulative-layout-shift/description.mdx";
import { FirstContentfulPaint } from "./first-contentful-paint";
import fcpDocument from "./first-contentful-paint/description.mdx";
import { LargestContentfulPaint } from "./largest-contentful-paint";
import lcpDocument from "./largest-contentful-paint/description.mdx";
import { MaxPotentialFID } from "./max-potential-fid";
import maxFidDocument from "./max-potential-fid/description.mdx";
import { SpeedIndex } from "./speed-index";
import siDocument from "./speed-index/description.mdx";
import { TimeToFirstByte } from "./time-to-first-byte";
import ttfbDocument from "./time-to-first-byte/description.mdx";
import { TotalBlockingTime } from "./total-blocking-time";
import tbtDocument from "./total-blocking-time/description.mdx";
import { TotalRequests } from "./total-requests";
import totalRequestDocument from "./total-requests/description.mdx";
import { TransferSize } from "./transfer-size";
import transferSizeDocument from "./transfer-size/description.mdx";

import PerformanceDocument from "./description.mdx";

export { PerformanceDocument };

export const PerformanceCategoryDocuments = {
	[CumulativeLayoutShift.id]: clsDocument,
	[FirstContentfulPaint.id]: fcpDocument,
	[LargestContentfulPaint.id]: lcpDocument,
	[MaxPotentialFID.id]: maxFidDocument,
	[SpeedIndex.id]: siDocument,
	[TimeToFirstByte.id]: ttfbDocument,
	[TotalBlockingTime.id]: tbtDocument,
	[TransferSize.id]: transferSizeDocument,
	[TotalRequests.id]: totalRequestDocument,
};
