export function updateStyles(styles : string) {
	const styleTag = document.createElement('style');
	styleTag.innerHTML = styles;
	document.head.appendChild(styleTag);
}