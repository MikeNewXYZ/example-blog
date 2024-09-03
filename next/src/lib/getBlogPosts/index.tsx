import groq from "groq";
import client from "../client";

export type BlogPost = {
	slug: string;
	title: string;
	headerImage: {
		url: string;
		width: number;
		height: number;
	};
	body: any[];
};

async function getBlogPosts(range?: [number, number]): Promise<BlogPost[] | undefined> {
	const rangeFilter = range ? `[${range[0]}...${range[1]}]` : "";

	try {
		const dataArray = await client.fetch(
			groq`*[_type == "blogPostCollection"]${rangeFilter}{
				"headerImage": {
					"url": headerImage.asset->url,
					"width": headerImage.asset->metadata.dimensions.width,
					"height": headerImage.asset->metadata.dimensions.height,
				},
				"slug": slug.current,
				"title": title,
				"body": body
			}
		`,
		);
		if (!dataArray || dataArray.length === 0) throw new Error("Failed to fetch blog posts.");

		return dataArray;
	} catch (error) {
		console.error(error);
	}
}

export default getBlogPosts;
