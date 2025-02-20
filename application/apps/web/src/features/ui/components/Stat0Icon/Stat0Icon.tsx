import { SvgIcon, SvgIconProps } from "@mui/material";

type Stat0Props = SvgIconProps;

export const Stat0Icon = (props: Stat0Props) => {
	return (
		<SvgIcon {...props}>
			<svg
				width="25"
				height="24"
				viewBox="0 0 25 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<mask
					id="mask0_8873_2018"
					style={{ maskType: "alpha" }}
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width="25"
					height="24"
				>
					<rect x="0.28833" width="24" height="24" fill="#D9D9D9" />
				</mask>
				<g mask="url(#mask0_8873_2018)">
					<path
						d="M12.2883 19L5.28833 12L12.2883 5L19.2883 12L12.2883 19ZM12.2883 16.15L16.4383 12L12.2883 7.85L8.13833 12L12.2883 16.15Z"
						fill="currentColor"
					/>
				</g>
			</svg>
		</SvgIcon>
	);
};

Stat0Icon.displayName = "Stat0";
