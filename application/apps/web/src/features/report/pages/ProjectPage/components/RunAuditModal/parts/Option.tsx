import {
	Checkbox,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

type OptionProps = {
	onClick: () => void;
	selected: boolean;
	disabled?: boolean;
	indeterminate?: boolean;
	text: string;
};

export const Option = ({
	onClick,
	selected,
	disabled,
	indeterminate,
	text,
}: OptionProps) => {
	return (
		<ListItem disablePadding>
			<ListItemButton disabled={disabled} onClick={onClick}>
				<ListItemIcon>
					<Checkbox
						checked={selected}
						indeterminate={indeterminate}
						tabIndex={-1}
						disableRipple
					/>
				</ListItemIcon>
				<ListItemText primary={text} />
			</ListItemButton>
		</ListItem>
	);
};

Option.displayName = "Option";
