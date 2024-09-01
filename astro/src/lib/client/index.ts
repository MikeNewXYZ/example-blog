import { createClient } from "@sanity/client";

const client = createClient({
	projectId: "enxovju5",
	dataset: "production",
	useCdn: true,
	apiVersion: "2024-09-01",
	token: process.env.SANITY_SECRET_TOKEN,
});

export default client;
