"use client";
import { Delete } from "@mui/icons-material";
import {
	Button,
	IconButton,
	InputAdornment,
	Stack,
	StackProps,
} from "@mui/material";
import { useFieldArray } from "react-hook-form";

import { FormTextField } from "../FormTextField";

type Props = StackProps & {
	name: string;
};

export function FormTextList({ name, ...rest }: Props) {
	// const {
	//   fieldState: { error },
	// } = useController({ name });
	const { fields, append, remove } = useFieldArray({ name });

	const addNewRow = () => {
		append("");
	};

	// const color = error ? "error.main" : "rgba(255, 255, 255, 0.7);";
	// const borderColor = error ? "error.main" : "rgba(255, 255, 255, 0.23);";

	return (
		<Stack
			component="fieldset"
			spacing={2}
			// TODO: fix colors
			// sx={{ borderRadius: 1, borderColor, color }}
			sx={{ borderRadius: 1 }}
			{...rest}
		>
			<legend>Tested URLs</legend>
			{fields.map((v, i) => (
				<FormTextField
					key={v.id}
					name={`${name}.${i}`}
					id={`${name}.${i}`}
					sx={{ width: "100%" }}
					slotProps={{
						input: {
							startAdornment: (
								<InputAdornment position="start">{i + 1}#</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="remove url"
										sx={{ color: "grey" }}
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
			<Stack direction="row-reverse" spacing={2}>
				<Button variant="outlined" onClick={addNewRow} type="button">
					Add
				</Button>
			</Stack>
		</Stack>
	);
}
