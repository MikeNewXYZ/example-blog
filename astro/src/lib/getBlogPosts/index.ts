import client from "../client";
import groq from "groq";

export type BlogPost = {
	slug: string;
	title: string;
	headerImage: {
		url: string;
		width: number;
		height: number;
	};
	body: {}[];
};

async function getBlogPosts(): Promise<BlogPost[] | undefined> {
	try {
		const dataArray = await client.fetch(
			groq`*[_type == "blogPostCollection"]{
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
