import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { AnyActorRef } from "xstate";
import { env } from "~/env.mjs";
import { useDebugContext } from "../contexts/DebugContext";
import { loadMachine, saveMachine } from "../utils/machineStorage";

export const useSaveMachine = (actor: AnyActorRef) => {
	useEffect(() => {
		if (actor && typeof actor.src === "object") {
			const src = actor?.src as { config: { id: string } };
			return actor.subscribe((s) => saveMachine(src.config?.id ?? "", s))
				.unsubscribe;
		}
	}, [actor]);
};

export const useDebugMachine = (actor: AnyActorRef) => {
	const { appendMachine, removeMachine } = useDebugContext();
	useEffect(() => {
		if (actor && typeof actor.src === "object") {
			const src = actor?.src as { config: { id: string } };
			const id = src.config.id;
			const unsubscribe = actor.subscribe((s) =>
				appendMachine(id, { data: { ...s } }),
			).unsubscribe;
			return () => {
				unsubscribe();
				removeMachine(id);
			};
		}
	}, []);
};

export const useSavedMachine: typeof useMachine = (...props) => {
	const res = useMachine(props[0], {
		...props[1],
		snapshot: loadMachine(props[0].id),
	});
	useSaveMachine(res[2]);

	// This conditional hook is okay, as env variables can't change during runtime
	if (env.NEXT_PUBLIC_DEBUG) {
		useDebugMachine(res[2]);
	}

	return res;
};
