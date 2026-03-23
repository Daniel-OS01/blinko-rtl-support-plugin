import { PLUGIN_NAME } from "../constants/plugin.consts";

export function getCSSVariables() : Promise<Record<string, string>> {
	return window.Blinko.api.config.getPluginConfig.query({
		pluginName: PLUGIN_NAME
	}).then((res: any) => {
		return res.colorsVars || {};
	}).catch(() => {
		return {};
	});
}