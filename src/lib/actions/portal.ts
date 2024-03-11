import { tick } from 'svelte';

export function portal(node: HTMLElement, target: HTMLElement = document.body) {
	tick().then(() => port(node, target));

	return {
		destroy() {
			node.remove();
		},
		update(target: HTMLElement = document.body) {
			tick().then(() => port(node, target));
		}
	};

	function port(node: HTMLElement, target: HTMLElement = document.body) {
		if (!target) {
			throw Error('[actions] portal: Target element is undefined.');
		}

		node.hidden = true;

		target.appendChild(node);

		node.hidden = false;
	}
}
