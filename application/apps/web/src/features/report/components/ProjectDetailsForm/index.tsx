"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormTextField } from "~/features/ui/components/FormTextField";
import { FormTextList } from "~/features/ui/components/FormTextList";

import {
	useNewProjectMachineContext,
	useNewProjectMachineSelector,
} from "../../states/newProject.machine";

import { FORM_NAME } from "./constants";
import { ProjectDetailsFormValues, schema } from "./schema";

export { FORM_NAME };
export type { ProjectDetailsFormValues };

export function ProjectDetailsForm() {
	const newProjectRef = useNewProjectMachineContext();
	const defaultValues = useNewProjectMachineSelector((state) => ({
		projectName: state.context.projectName,
		homeURL: state.context.homeURL,
		urls: Object.keys(state.context.urlsData).filter(
			(u) => u !== state.context.homeURL,
		),
	}));
	const methods = useForm<ProjectDetailsFormValues>({
		resolver: zodResolver(schema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			<Stack
				id={FORM_NAME}
				component="form"
				onSubmit={handleSubmit((data) =>
					newProjectRef.send({
						type: "PROJECT_DETAILS_NEXT",
						output: { ...data, urls: [data.homeURL, ...data.urls] },
					}),
				)}
				spacing={2}
			>
				<FormTextField name="projectName" label="Project Name" />
				<FormTextField name="homeURL" label="Homepage URL" />
				<FormTextList name="urls" />
			</Stack>
		</FormProvider>
	);
}
