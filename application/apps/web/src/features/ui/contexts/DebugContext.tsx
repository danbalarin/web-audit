"use client";

import type { PropsWithChildren } from "react";
import { createContext, useCallback, useContext, useState } from "react";

type XStateMachine = {
	name: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any;
};

type DebugContextType = {
	machines: XStateMachine[];
	appendMachine: (name: string, data: Omit<XStateMachine, "name">) => void;
	removeMachine: (name: string) => void;
};

const DebugContext = createContext<DebugContextType>({
	machines: [],
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	appendMachine: () => {},
	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	removeMachine: () => {},
});

export const DebugContextProvider = ({ children }: PropsWithChildren) => {
	const [machines, setMachines] = useState<XStateMachine[]>([]);

	const appendMachine = useCallback(
		(name: string, data: Omit<XStateMachine, "name">) => {
			const newMachines = JSON.parse(
				JSON.stringify(machines),
			) as XStateMachine[];
			const found = newMachines.findIndex((machine) => machine.name === name);
			if (found !== -1) {
				newMachines[found] = { name, ...data };
			} else {
				newMachines.push({ name, ...data });
			}
			setMachines(newMachines);
		},
		[machines],
	);

	const removeMachine = useCallback(
		(name: string) => {
			const newMachines = JSON.parse(
				JSON.stringify(machines),
			) as XStateMachine[];
			const found = newMachines.findIndex((machine) => machine.name === name);
			if (found) {
				newMachines.splice(found, 1);
			}
			setMachines(newMachines);
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
