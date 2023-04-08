/**
 * @param {HTMLElement} node
 * @param {{handler?: (...params: any) => any}} [options]
 */
export default function (node, options) {
	let handler = options?.handler || (() => {});

	/**
	 * @param {ResizeObserverEntry[]} entries
	 */
	function handleResize(entries) {
		entries.forEach((entry) => {
			if (entry.target !== node) return;
			handler();
			node.dispatchEvent(new CustomEvent('resize', { detail: entry.target }));
		});
	}

	const observer = new ResizeObserver(handleResize);
	observer.observe(node);

	return {
		/**
		 * @param {{handler?: (...params: any) => any}} options
		 */
		update(options) {
			handler = options?.handler || (() => {});
		},
		destroy() {
			observer.disconnect();
		}
	};
}
