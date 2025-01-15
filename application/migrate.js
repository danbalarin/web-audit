const fs = require("fs");
const path = require("path");

const migrationPath = process.argv[2];

if (!migrationPath) {
	console.error("Please provide a migration path as the first argument.");
	process.exit(1);
}

fs.readdir(migrationPath, (err, files) => {
	if (err) {
		console.error(`Error reading directory: ${err.message}`);
		process.exit(1);
	}

	files.forEach((file) => {
		const subDirPath = path.join(migrationPath, file);
		if (fs.lstatSync(subDirPath).isDirectory()) {
			const indexPath = path.join(subDirPath, "index.tsx");
			if (fs.existsSync(indexPath)) {
				const newComponentName = `${file}.tsx`;
				const newComponentPath = path.join(subDirPath, newComponentName);
				fs.renameSync(indexPath, newComponentPath);

				const indexTsContent = `export { ${file.split(".")[0]} } from './${file}';\n`;
				fs.writeFileSync(path.join(subDirPath, "index.ts"), indexTsContent);
			}
		}
	});
});
