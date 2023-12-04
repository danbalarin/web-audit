"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, FormTextList, FormTextField } from "@repo/ui";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

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
    urls: Object.keys(state.context.urlsData),
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
          newProjectRef.send({ type: "PROJECT_DETAILS_NEXT", output: data })
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
