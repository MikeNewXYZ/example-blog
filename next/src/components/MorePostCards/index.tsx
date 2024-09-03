"use client";
import getBlogPosts from "@/lib/getBlogPosts";
import PostCards, { card } from "../PostCards";
import { useState } from "react";

function MorePostCards() {
	let loadMoreCount = 0;
	const [cards, setCards] = useState<card[] | null>(null);
	const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function loadMoreCards() {
		if (isLoadMoreDisabled) return;
		setIsLoading(true);
		loadMoreCount++;
		const rangeStart = loadMoreCount === 0 ? 7 : 8 * loadMoreCount - 1;
		const rangeEnd = rangeStart + 8;

		const posts = await getBlogPosts([rangeStart, rangeEnd]);
		if (!posts) return;
		if (posts.length < 9) setIsLoadMoreDisabled(true);
		const newCards: card[] = posts.map(({ slug, title, headerImage }) => ({
			isPrimary: false,
			href: "blog/" + slug,
			title: title,
			imageSrc: headerImage.url,
			imageWidth: headerImage.width,
			imageHeight: headerImage.height,
		}));
		setCards((prevCards) => {
			if (!prevCards) {
				return newCards;
			} else {
				return [...prevCards, ...newCards];
			}
		});
		setIsLoading(false);
	}

	return (
		<>
			{cards && <PostCards cards={cards} isImagePriority={false} />}

			<button
				className="btn w-full btn-lg mt-4"
				onClick={loadMoreCards}
				disabled={isLoadMoreDisabled}
			>
				<span>Load More</span>
				{isLoading && <span className="loading loading-spinner loading-lg"></span>}
			</button>
		</>
	);
}

export default MorePostCards;
