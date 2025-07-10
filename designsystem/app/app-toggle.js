if (
	typeof window !== "undefined" &&
	window.CSSStyleSheet &&
	document.adoptedStyleSheets
)
	(() => {
		const key = "--mtds-app-expanded";
		const sheet = new CSSStyleSheet();
		const prev = () => !window.localStorage.getItem(key)?.includes("false");

		document.adoptedStyleSheets.push(sheet);
		window.mtdsToggleAppExpanded = (force) => {
			try {
				const next = force ?? !prev();
				sheet.replaceSync?.(`:root { ${key}: var(${key}--${next})}`);
				window.localStorage.setItem(key, next);
			} catch (_err) {} // localStorage is full or replaceSync is not supported
		};

		// Set and store initial state
		window.mtdsToggleAppExpanded(prev());
	})();
