"use client";
import { Delete } from "@mui/icons-material";
import {
	Box,
	Button,
	IconButton,
	InputAdornment,
	Stack,
	StackProps,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

import { useTheme } from "@mui/material-pigment-css";
import { FormTextField } from "../FormTextField";

type Props = StackProps & {
	name: string;
	disabled?: boolean;
};

export function FormTextList({ name, disabled, ...rest }: Props) {
	// const {
	//   fieldState: { error },
	// } = useController({ name });
	const { fields, append, remove } = useFieldArray({ name });

	const addNewRow = () => {
		append("");
	};

	// const color = error ? "error.main" : "rgba(255, 255, 255, 0.7);";
	// const borderColor = error ? "error.main" : "rgba(255, 255, 255, 0.23);";
	const theme = useTheme();

	const disabledColor = theme.palette.text.disabled;

	return (
		<Stack
			component="fieldset"
			spacing={2}
			// TODO: fix colors
			// sx={{ borderRadius: 1, borderColor, color }}
			sx={{ borderRadius: 1, color: "var(--form-text-list-color)" }}
			style={{ "--form-text-list-color": disabled ? disabledColor : "inherit" }}
			{...rest}
		>
			<Box component="legend" sx={{ color: "inherit" }}>
				Tested URLs
			</Box>
			{fields.map((v, i) => (
				<FormTextField
					key={v.id}
					name={`${name}.${i}`}
					id={`${name}.${i}`}
					sx={{ width: "100%" }}
					disabled={disabled}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start" sx={{ color: "inherit" }}>
									{i + 1}#
								</InputAdornment>
							),
							endAdornment: !disabled && (
								<InputAdornment position="end">
									<IconButton
										aria-label="remove url"
										sx={{ color: "grey" }}
										disabled={disabled}
										onClick={() => remove(i)}
									>
										<Delete />
									</IconButton>
								</InputAdornment>
							),
						},
					}}
				/>
			))}
			{!disabled && (
				<Stack direction="row-reverse" spacing={2}>
					<Button
						variant="outlined"
						onClick={addNewRow}
						disabled={disabled}
						type="button"
					>
						Add
					</Button>
				</Stack>
			)}
		</Stack>
	);
}
