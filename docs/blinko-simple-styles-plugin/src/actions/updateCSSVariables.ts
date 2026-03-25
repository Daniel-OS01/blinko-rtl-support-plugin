export function updateCSSVariables(element: HTMLElement, vars: Record<string, string>) {
	Object.entries(vars).forEach(([key, value]) => {
		element.style.setProperty(`--${key}`, value, 'important');
	});
}