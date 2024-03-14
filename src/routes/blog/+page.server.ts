import path from "path";
import fs from "fs/promises";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	const basePath = "static/blog";
	const files = await fs.readdir(basePath);
	// get all file contents in an array
	const posts = await Promise.all(
		files.map(async (filename) => {
			const filePath = path.join(basePath, filename);
			let contents = await fs.readFile(filePath, "utf-8");
			const title =
				contents
					.split("\n")
					.find((line) => line.startsWith("#"))
					?.slice(1) ||
				filename
					.split("-")
					.slice(1)
					.join(" ")
					.split(".md")
					.slice(0, -1)
					.join(".md")
					.replace(/^\w/gm, (c) => c.toUpperCase());
			// remove title from contents
			return {
				contents: contents.split("\n").slice(1).join("\n"),
				title,
				slug: filename.split(".md").slice(0, -1).join(".md").split("-").slice(1).join("-"),
			};
		}),
	);
	return {
		posts,
	};
}