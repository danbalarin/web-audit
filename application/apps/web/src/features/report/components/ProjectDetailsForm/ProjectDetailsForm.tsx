"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import { FormTextField } from "~/features/ui/components/FormTextField";
import { FormTextList } from "~/features/ui/components/FormTextList";

import { FORM_NAME } from "./constants";
import { ProjectDetailsFormValues, schema } from "./schema";

export type { ProjectDetailsFormValues };

type ProjectDetailsFormProps = {
	onSubmit: (data: ProjectDetailsFormValues) => void;
	defaultValues?: Partial<ProjectDetailsFormValues>;
	disabled?: boolean;
};

export function ProjectDetailsForm({
	onSubmit,
	defaultValues,
	disabled,
}: ProjectDetailsFormProps) {
	const methods = useForm<ProjectDetailsFormValues>({
		resolver: zodResolver(schema),
		defaultValues: defaultValues,
		disabled,
	});

	const { handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			<Stack
				id={FORM_NAME}
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				spacing={2}
			>
				<FormTextField
					disabled={disabled}
					name="projectName"
					label="Project Name"
				/>
				<FormTextField
					disabled={disabled}
					name="homeUrl"
					label="Homepage URL"
				/>
				<FormTextList disabled={disabled} name="urls" />
			</Stack>
		</FormProvider>
	);
}

ProjectDetailsForm.FORM_NAME = FORM_NAME;
