import { writeFile } from "fs/promises";
import fetch from "node-fetch";

fetch(
	"https://raw.githubusercontent.com/RetireJS/retire.js/master/repository/jsrepository-v4.json",
)
	.then((res) => res.json())
	.then((data) => {
		writeFile("./assets/retire-repo.json", JSON.stringify(data));
	});
