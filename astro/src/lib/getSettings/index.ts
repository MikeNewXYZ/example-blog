import client from "../client";

export type Settings = {
	siteTitle: string;
	siteDescription: string;
	siteKeywords: string;
};

async function getSettings(): Promise<Settings | undefined> {
	try {
		const dataArray = await client.fetch('*[_type == "settingsSingleton"]');

		if (!dataArray || dataArray.length === 0) throw new Error("Failed to fetch settings.");

		const data: Settings = dataArray[0];

		return data;
	} catch (error) {
		console.error(error);
	}
}

export default getSettings;
