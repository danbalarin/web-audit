import React from "react";

import { URL_TEST_TIMELINE_ITEM_STATES } from "../../constants";
import { UrlTimelineItem, UrlTimelineItemProps } from "../UrlTimelineItem";

type Props = Omit<UrlTimelineItemProps, "config">;

export function UrlTestTimelineItem(props: Props) {
  return <UrlTimelineItem {...props} config={URL_TEST_TIMELINE_ITEM_STATES} />;
}
