import { spawn } from "child_process";

export async function spawnChild<TRes = unknown>(
	command: string,
	args?: string[],
): Promise<TRes> {
	const child = spawn(command, args);

	let data = "";
	for await (const chunk of child.stdout) {
		data += chunk;
	}
	let error = "";
	for await (const chunk of child.stderr) {
		console.error("stderr chunk: " + chunk);
		error += chunk;
	}
	const exitCode = await new Promise((resolve) => {
		child.on("close", resolve);
	});

	if (exitCode) {
		throw new Error(`subprocess error exit ${exitCode}, ${error}`);
	}
	return JSON.parse(data);
}
