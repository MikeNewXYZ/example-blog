/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	basePath: "/example-blog",
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: "/images/enxovju5/production/**",
			},
		],
	},
};

export default nextConfig;
