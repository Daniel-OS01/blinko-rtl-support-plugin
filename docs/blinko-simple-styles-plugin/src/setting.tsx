import { useEffect, useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';
import { getCSSVariables } from './actions/getCSSVariables';
import { saveSettings } from './actions/saveSettings';
import { updateCSSVariables } from './actions/updateCSSVariables';
import { ChangeEvent } from 'preact/compat';
import { getStyles } from './actions/getStyles';
import { updateStyles } from './actions/updateStyles';

export function Setting(): JSXInternal.Element {
  const [colorsVars, setColorsVars] = useState<Record<string, string>>({});
  const [styles, setStyles] = useState<string>("");

  useEffect(() => {
    getCSSVariables().then((vars) => {
      setColorsVars(vars);
    });

    getStyles().then((styles) => {
      setStyles(styles);
    });
  }, []);

  useEffect(() => {
    updateCSSVariables(document.documentElement, colorsVars);
    updateStyles(styles);
  }, [colorsVars, styles]);

  const handleSave = async () => {
    await saveSettings({ colorsVars, styles });
  };

  const handleColorVariablesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedValue = JSON.parse(e.currentTarget.value);
      setColorsVars(parsedValue);
    } catch { }
  }

  const handleStylesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      setStyles(e.currentTarget.value);
    } catch { }
  }

  return (
    <div className="max-w-2xl mx-auto p-2 rounded-lg">
      <div className={"mb-6"}>
        <label className="block text-sm font-medium mb-2">
          CSS Variables
          <textarea
            value={JSON.stringify(colorsVars, null, 2)}
            onChange={handleColorVariablesChange}
            placeholder='{"primary": "#ff0000", "secondary": "#00ff00"}'
            className="mt-1 block w-full h-40 px-3 py-2 border rounded-md shadow-sm sm:text-sm bg-primary!"
          />
        </label>
      </div>

      <div className={"mb-6"}>
        <label className="block text-sm font-medium mb-2">
          Styles
          <textarea
            value={styles}
            onChange={handleStylesChange}
            className="mt-1 block w-full h-40 px-3 py-2 border rounded-md shadow-sm sm:text-sm bg-primary!"
          />
        </label>
      </div>

      <button
        onClick={handleSave}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md bg-primary text-primary-foreground cursor-pointer"
      >
        Save Settings
      </button>
    </div>
  );
}
