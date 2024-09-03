import { notFound } from "next/navigation";
import getBlogPosts from "@/lib/getBlogPosts";
import getSettings from "@/lib/getSettings";
import getSingleBlogPost from "@/lib/getSingleBlogPost";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

export const dynamicParams = false;

export async function generateStaticParams() {
	const posts = await getBlogPosts();
	if (!posts) notFound();

	let slugs = [];
	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		slugs.push({ slug: post.slug });
	}
	return slugs;
}

type Props = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: Props) {
	const settings = await getSettings();
	const singlePost = await getSingleBlogPost(params.slug);

	return {
		title: `${settings?.siteTitle} - ${singlePost?.title}`,
		description: settings?.siteDescription,
		keywords: settings?.siteKeywords,
	};
}

async function SingleBlogPostPage({ params }: Props) {
	const singlePost = await getSingleBlogPost(params.slug);
	if (!singlePost) notFound();

	return (
		<main className="w-full overflow-x-hidden flex flex-col gap-8">
			<header className="w-full h-80 overflow-hidden relative">
				<div className="absolute w-full h-full z-20 inset-0 flex justify-center items-center">
					<h1 className="text-center text-4xl md:text-6xl lg:text-8xl font-black uppercase max-w-[60rem]">
						{singlePost.title}
					</h1>
				</div>

				<div className="absolute w-full h-full z-10 inset-0 bg-black opacity-50"></div>

				<Image
					className="w-full h-full object-cover blur-md"
					src={singlePost.headerImage.url}
					width={singlePost.headerImage.width}
					height={singlePost.headerImage.height}
					alt={singlePost.title}
					draggable={false}
					priority
				/>
			</header>

			<article className="container prose prose-xl px-2 mx-auto">
				<PortableText value={singlePost.body} />
			</article>
		</main>
	);
}

export default SingleBlogPostPage;
