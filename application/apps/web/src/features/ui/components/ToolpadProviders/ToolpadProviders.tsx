"use client";
import { DialogsProvider } from "@toolpad/core/useDialogs";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import React from "react";

type ToolpadProvidersProps = {
	children: React.ReactNode;
};

export const ToolpadProviders = ({ children }: ToolpadProvidersProps) => {
	return (
		<DialogsProvider>
			<NotificationsProvider>{children}</NotificationsProvider>
		</DialogsProvider>
	);
};

ToolpadProviders.displayName = "ToolpadProviders";
