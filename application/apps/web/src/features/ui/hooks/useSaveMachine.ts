import { useEffect } from "react";
import { AnyActorRef } from "xstate";
import { saveMachine } from "../utils/machineStorage";

export const useSaveMachine = (actor: AnyActorRef) => {
	useEffect(() => {
		if (actor && typeof actor.src === "object") {
			const src = actor?.src as { config: { id: string } };
			return () => {
				saveMachine(src.config?.id ?? "", actor.getPersistedSnapshot());
			};
		}
	}, [actor]);
};
