import { Typography, type TypographyProps } from "@mui/material";
import type { MDXComponents } from "mdx/types";
import { MDXLink } from "./MDXLink";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		a: MDXLink,
		h1: (props) => <Typography variant="h1" {...(props as TypographyProps)} />,
		h2: (props) => <Typography variant="h2" {...(props as TypographyProps)} />,
		h3: (props) => <Typography variant="h3" {...(props as TypographyProps)} />,
		h4: (props) => <Typography variant="h4" {...(props as TypographyProps)} />,
		h5: (props) => <Typography variant="h5" {...(props as TypographyProps)} />,
		h6: (props) => <Typography variant="h6" {...(props as TypographyProps)} />,
		p: (props) => (
			<Typography
				variant="body1"
				sx={{ my: 2, textAlign: "justify", textJustify: "inter-word" }}
				{...(props as TypographyProps)}
			/>
		),
	};
}
