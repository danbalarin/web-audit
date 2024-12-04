import { Snapshot } from "xstate";

const KEY = "machines";

export const loadMachine = <TOutput>(
	name: string,
): Snapshot<TOutput> | undefined => {
	if (typeof localStorage === "undefined") {
		return;
	}
	const snapshot = localStorage.getItem(KEY);

	if (snapshot) {
		const machines = JSON.parse(snapshot);
		return machines[name];
	}

	return undefined;
};

export const saveMachine = <TOutput>(
	name: string,
	snapshot: Snapshot<TOutput>,
) => {
	if (typeof localStorage === "undefined") {
		return;
	}
	const machines = JSON.parse(localStorage.getItem(KEY) || "{}");

	machines[name] = snapshot;

	localStorage.setItem(KEY, JSON.stringify(machines));
};

export const clearMachines = () => {
	localStorage.removeItem(KEY);
};
