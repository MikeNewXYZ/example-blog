import type { SettingsSingleton } from "../../types/sanity.types";
import client from "../client";

async function getSettings(): Promise<SettingsSingleton | undefined> {
	try {
		const dataArray = await client.fetch('*[_type == "settingsSingleton"]');

		if (!dataArray || dataArray.length === 0) throw new Error("Failed to fetch settings.");

		const data: SettingsSingleton = dataArray[0];

		return data;
	} catch (error) {
		console.error(error);
	}
}

export default getSettings;
