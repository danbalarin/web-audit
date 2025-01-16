import { useCallback, useState } from "react";

type UseControlledAccordionProps<TName> = {
	initialExpanded: TName[];
};

export const useControlledAccordion = <TName = string>({
	initialExpanded,
}: UseControlledAccordionProps<TName>) => {
	const [expanded, setExpanded] = useState<TName[]>(initialExpanded);
	const expandOrCollapse = useCallback(
		(panel: TName) => {
			setExpanded((expanded) => {
				if (expanded.includes(panel)) {
					return expanded.filter((p) => p !== panel);
				} else {
					return [...expanded, panel];
				}
			});
		},
		[setExpanded],
	);

	const expand = useCallback((panel: TName) => {
		setExpanded((expanded) => {
			if (!expanded.includes(panel)) {
				return [...expanded, panel];
			}
			return expanded;
		});
	}, []);

	const collapse = useCallback((panel: TName) => {
		setExpanded((expanded) => {
			return expanded.filter((p) => p !== panel);
		});
	}, []);

	const isExpanded = useCallback(
		(panel: TName) => expanded.includes(panel),
		[expanded],
	);

	return {
		expanded,
		isExpanded,
		expand,
		collapse,
		expandOrCollapse,
	};
};
