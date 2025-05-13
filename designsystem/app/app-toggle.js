if (
	typeof window !== "undefined" &&
	window.CSSStyleSheet &&
	document.adoptedStyleSheets
)
	(() => {
		const key = "--mtds-app-expanded";
		const sheet = new CSSStyleSheet();

		document.adoptedStyleSheets.push(sheet);
		window.mtdsToggleAppExpanded = (force) => {
			try {
				const prev = !window.localStorage.getItem(key)?.includes("false");
				const next = force ?? !prev;

				sheet.replaceSync?.(`:root { ${key}: var(${key}--${next})}`);
				window.localStorage.setItem(key, next);
			} catch (err) {} // LocalStorage is full or replaceSync is not supported
		};

		// Set and store initial state - double to get initial value
		window.mtdsToggleAppExpanded(false);
	})();
