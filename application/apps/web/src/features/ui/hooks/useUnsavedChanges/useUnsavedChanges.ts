import { useEffect } from "react";

export const useUnsavedChanges = (enabled: boolean) => {
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			if (enabled) {
				const confirmationMessage =
					"You have unsaved changes. Are you sure you want to leave?";
				const confirm = window.confirm(confirmationMessage);
				if (!confirm) {
					event.preventDefault();
					event.returnValue = confirmationMessage;
				}
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [enabled]);
};
