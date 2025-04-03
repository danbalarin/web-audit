import { ActionConsistency } from "./action-consistency";
import ActionConsistencyDocument from "./action-consistency/description.mdx";
import { Aesthetics } from "./aesthetics";
import AestheticsDocument from "./aesthetics/description.mdx";
import { BrandCompliance } from "./brand-compliance";
import BrandComplianceDocument from "./brand-compliance/description.mdx";
import { ClearFeedback } from "./clear-feedback";
import ClearFeedbackDocument from "./clear-feedback/description.mdx";
import { ContextualCues } from "./contextual-cues";
import ContextualCuesDocument from "./contextual-cues/description.mdx";
import UsabilityDocument from "./description.mdx";
import { FlexibleNavigation } from "./flexible-navigation";
import FlexibleNavigationDocument from "./flexible-navigation/description.mdx";
import { IconMetaphors } from "./icon-metaphors";
import IconMetaphorsDocument from "./icon-metaphors/description.mdx";
import { ImmediateFeedback } from "./immediate-feedback";
import ImmediateFeedbackDocument from "./immediate-feedback/description.mdx";
import { NotFoundPage } from "./not-found-page";
import NotFoundPageDocument from "./not-found-page/description.mdx";
import { VisualConsistency } from "./visual-consistency";
import VisualConsistencyDocument from "./visual-consistency/description.mdx";

export { UsabilityDocument };

export const UsabilityCategoryDocuments = {
	[NotFoundPage.id]: NotFoundPageDocument,
	[ImmediateFeedback.id]: ImmediateFeedbackDocument,
	[ClearFeedback.id]: ClearFeedbackDocument,
	[IconMetaphors.id]: IconMetaphorsDocument,
	[FlexibleNavigation.id]: FlexibleNavigationDocument,
	[VisualConsistency.id]: VisualConsistencyDocument,
	[ActionConsistency.id]: ActionConsistencyDocument,
	[ContextualCues.id]: ContextualCuesDocument,
	[Aesthetics.id]: AestheticsDocument,
	[BrandCompliance.id]: BrandComplianceDocument,
};
