import { PLUGIN_NAME } from "../constants/plugin.consts";

export function getStyles() : Promise<string> {
	return window.Blinko.api.config.getPluginConfig.query({
		pluginName: PLUGIN_NAME
	}).then((res: any) => {
		return res.styles || "";
	}).catch(() => {
		return {};
	});
}