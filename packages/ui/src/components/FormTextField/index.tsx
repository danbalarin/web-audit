"use client";
import { TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";

type Props = TextFieldProps & { name: string };

export function FormTextField({ name, ...rest }: Props) {
  const {
    field,
    fieldState: { error },
  } = useController({ name });

  return (
    <TextField
      {...field}
      {...rest}
      inputRef={field.ref}
      error={!!error}
      helperText={error?.message}
    />
  );
}
