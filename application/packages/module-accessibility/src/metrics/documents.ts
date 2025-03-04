import { ACT } from "./act";
import ACTDocument from "./act/description.mdx";
import { BEST_PRACTICE } from "./best-practice";
import bestPracticeDocument from "./best-practice/description.mdx";
import AccessibilityDocument from "./description.mdx";
import { WCAG2A } from "./wcag2a";
import WCAG2ADocument from "./wcag2a/description.mdx";
import { WCAG2AA } from "./wcag2aa";
import WCAG2AADocument from "./wcag2aa/description.mdx";
import { WCAG2AAA } from "./wcag2aaa";
import WCAG2AAADocument from "./wcag2aaa/description.mdx";
import { WCAG21A } from "./wcag21a";
import WCAG21ADocument from "./wcag21a/description.mdx";
import { WCAG21AA } from "./wcag21aa";
import WCAG21AADocument from "./wcag21aa/description.mdx";
import { WCAG22AA } from "./wcag22aa";
import WCAG22AADocument from "./wcag22aa/description.mdx";

export { AccessibilityDocument };

export const AccessibilityCategoryDocuments = {
	[ACT.id]: ACTDocument,
	[BEST_PRACTICE.id]: bestPracticeDocument,
	[WCAG2A.id]: WCAG2ADocument,
	[WCAG2AA.id]: WCAG2AADocument,
	[WCAG2AAA.id]: WCAG2AAADocument,
	[WCAG21A.id]: WCAG21ADocument,
	[WCAG21AA.id]: WCAG21AADocument,
	[WCAG22AA.id]: WCAG22AADocument,
};
