"use client";

import { TRPCClientError } from "@trpc/client";
import { ErrorMessage } from "~/features/ui/components/ErrorMessage";

type ErrorProps = {
	error: Error & { digest?: string };
	reset: () => void;
};

const ErrorComponent = ({ error }: ErrorProps) => {
	if (error instanceof TRPCClientError) {
		const code = error.data.code;
		if (code && code in ErrorMessage) {
			const Component = ErrorMessage[code as keyof typeof ErrorMessage];
			return <Component resource="project" />;
		}
	}
	return <ErrorMessage title={error.message} />;
};

ErrorComponent.displayName = "ErrorComponent";

export default ErrorComponent;
