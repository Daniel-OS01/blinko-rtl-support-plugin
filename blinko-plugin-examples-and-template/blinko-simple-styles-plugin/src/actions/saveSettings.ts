import { PLUGIN_NAME } from "../constants/plugin.consts";

export async function saveSettings(settings : Record<string, any>) {
	window.Blinko.toast.success("Settings saved successfully!");
	window.Blinko.closeDialog();

	Object.keys(settings).forEach(async (key) => {
		await window.Blinko.api.config.setPluginConfig.mutate({
			pluginName: PLUGIN_NAME,
			key: key,
			value: settings[key]
		});
	});
	
	window.Blinko.api.config.getPluginConfig.query({
		pluginName: PLUGIN_NAME
	});
}