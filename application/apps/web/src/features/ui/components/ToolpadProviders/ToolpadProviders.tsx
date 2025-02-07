"use client";
import { NotificationsProvider } from "@toolpad/core/useNotifications";
import React from "react";

type ToolpadProvidersProps = {
	children: React.ReactNode;
};

export const ToolpadProviders = ({ children }: ToolpadProvidersProps) => {
	return <NotificationsProvider>{children}</NotificationsProvider>;
};

ToolpadProviders.displayName = "ToolpadProviders";
