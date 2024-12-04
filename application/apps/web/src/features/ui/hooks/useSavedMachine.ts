import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { AnyActorRef, AnyStateMachine, StateFrom } from "xstate";
import { env } from "~/env.mjs";
import { useDebugContext } from "../contexts/DebugContext";
import { loadMachine, saveMachine } from "../utils/machineStorage";

const useSaveMachine = (actor: AnyActorRef) => {
	useEffect(() => {
		if (actor && typeof actor.src === "object") {
			const src = actor?.src as { config: { id: string } };
			return actor.subscribe((s) => saveMachine(src.config?.id ?? "", s))
				.unsubscribe;
		}
	}, [actor]);
};

const useDebugMachine = (id: string, state: StateFrom<AnyStateMachine>) => {
	const { appendMachine, removeMachine } = useDebugContext();
	useEffect(() => {
		appendMachine(id, { data: { ...state } });

		return () => {
			removeMachine(id);
		};
	}, [state]);
};

export const useSavedMachine: typeof useMachine = (...props) => {
	const res = useMachine(props[0], {
		...props[1],
		snapshot: loadMachine(props[0].id),
	});
	useSaveMachine(res[2]);

	// This conditional hook is okay, as env variables can't change during runtime
	if (env.NEXT_PUBLIC_DEBUG) {
		useDebugMachine(props[0].id, res[0]);
	}

	return res;
};
