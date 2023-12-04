import * as zod from "zod";

export const schema = zod.object({
  projectName: zod.string().trim().min(1, { message: "Name is required" }),
  homeURL: zod.string().trim().url(),
  urls: zod.array(zod.string().trim().url()).optional().default([]),
});

export type ProjectDetailsFormValues = zod.infer<typeof schema>;
