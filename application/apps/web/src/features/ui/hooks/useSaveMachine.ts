import { useEffect } from "react";
import { AnyActorRef } from "xstate";
import { saveMachine } from "../utils/machineStorage";

export const useSaveMachine = (actor: AnyActorRef) => {
	useEffect(() => {
		if (actor) {
			return () => {
				saveMachine(actor.id, actor.getPersistedSnapshot());
			};
		}
	}, [actor]);
};
