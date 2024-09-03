import Image from "next/image";
import { twMerge } from "tailwind-merge";

export type card = {
	isPrimary: boolean;
	href: string;
	title: string;
	imageSrc: string;
	imageWidth: number;
	imageHeight: number;
};

type Props = {
	cards: card[];
	isImagePriority: boolean;
};

function PostCards({ cards, isImagePriority }: Props) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
			{cards.map(({ isPrimary, href, title, imageSrc, imageWidth, imageHeight }, index) => (
				<a
					key={index}
					href={href}
					className={twMerge(
						"block relative w-full h-72 overflow-hidden rounded-lg group",
						isPrimary ? "col-span-1 sm:col-span-2" : "col-span-1",
					)}
				>
					<div
						className={twMerge(
							"w-full h-full flex flex-col justify-end p-2 sm:p-4",
							!isPrimary && "opacity-0 group-hover:opacity-100 transition-opacity duration-500",
						)}
					>
						<h6 className="font-medium text-xl leading-8 text-base-content text-pretty">{title}</h6>
					</div>

					<div
						className={twMerge(
							"absolute inset-0 -z-10 w-full h-full bg-black",
							isPrimary
								? "opacity-70"
								: "opacity-0 group-hover:opacity-70 transition-opacity duration-500",
						)}
					></div>

					<Image
						className="absolute inset-0 -z-20 object-cover w-full h-full"
						src={imageSrc}
						alt={title}
						width={imageWidth}
						height={imageHeight}
						priority={isImagePriority}
					/>
				</a>
			))}
		</div>
	);
}

export default PostCards;
