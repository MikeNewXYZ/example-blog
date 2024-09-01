import type { BlogPostCollection } from "../../types/sanity.types";
import client from "../client";

type arguments = {
	start?: number;
	end?: number;
};

async function getBlogPosts({ start, end }: arguments = {}): Promise<
	BlogPostCollection[] | undefined
> {
	const range = !start || !end ? "" : `[${start}...${end}]`;

	try {
		const dataArray = await client.fetch(`*[_type == "blogPostCollection"]${range}`);

		if (!dataArray || dataArray.length === 0) throw new Error("Failed to fetch blog posts.");

		return dataArray;
	} catch (error) {
		console.error(error);
	}
}

export default getBlogPosts;
