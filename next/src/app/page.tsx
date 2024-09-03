import MorePostCards from "@/components/MorePostCards";
import PostCards, { card } from "@/components/PostCards";
import getBlogPosts from "@/lib/getBlogPosts";
import { notFound } from "next/navigation";

async function HomePage() {
	const posts = await getBlogPosts([0, 7]);
	if (!posts) notFound();
	const cards: card[] = posts.map(({ slug, title, headerImage }, index) => ({
		isPrimary: index === 0,
		href: "blog/" + slug,
		title: title,
		imageSrc: headerImage.url,
		imageWidth: headerImage.width,
		imageHeight: headerImage.height,
	}));

	return (
		<section className="py-24 relative">
			<div className="w-full max-w-7xl px-6 lg:px-8 mx-auto">
				<div className="flex items-center justify-center flex-col gap-5 mb-14 text-base-content">
					<h2 className="font-manrope font-bold text-4xl text-center">
						The Art of Minimalism: Living with Less
					</h2>

					<p className="text-base font-normal max-w-3xl mx-auto text-center opacity-80">
						How Simplifying Your Life Can Lead to Greater Happiness and Fulfillment
					</p>
				</div>

				<PostCards cards={cards} isImagePriority />

				<MorePostCards />
			</div>
		</section>
	);
}

export default HomePage;
