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

async function getSingleBlogPost(slug: string): Promise<BlogPost | undefined> {
	try {
		const dataArray = await client.fetch(
			groq`*[_type == "blogPostCollection"][slug.current == "${slug}"]{
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
		if (!dataArray || dataArray.length === 0) throw new Error("Failed to fetch single blog post.");

		const data: BlogPost = dataArray[0];
		return data;
	} catch (error) {
		console.error(error);
	}
}

export default getSingleBlogPost;
