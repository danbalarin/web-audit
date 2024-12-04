"use client";

import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

type XStateMachine = object;

type DebugContextType = {
	machines: Record<string, XStateMachine>;
	appendMachine: (name: string, data: Omit<XStateMachine, "name">) => void;
	removeMachine: (name: string) => void;
};

const DebugContext = createContext<DebugContextType>({
	machines: {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	appendMachine: () => {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	removeMachine: () => {},
});

export const DebugContextProvider = ({ children }: PropsWithChildren) => {
	const [machines, setMachines] = useState<Record<string, XStateMachine>>({});

	const appendMachine = useCallback(
		(name: string, data: Omit<XStateMachine, "name">) => {
			setMachines((m) => ({ ...m, [name]: { ...(m[name] ?? {}), ...data } }));
		},
		[machines],
	);

	const removeMachine = useCallback(
		(name: string) => {
			setMachines((m) => {
				const newMachines = { ...m };
				delete newMachines[name];
				return newMachines;
			});
		},
		[machines],
	);

	return (
		<DebugContext.Provider value={{ machines, appendMachine, removeMachine }}>
			{children}
		</DebugContext.Provider>
	);
};

export const useDebugContext = () => {
	const context = useContext(DebugContext);

	if (!context) {
		throw new Error(
			"useDebugContext must be used within a DebugContextProvider",
		);
	}

	return context;
};
