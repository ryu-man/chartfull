import { gsap } from 'gsap';

export function animate(node: SVGElement, vars: gsap.TweenVars) {
	gsap.set(node, vars);

	return {
		update(vars: gsap.TweenVars) {
			gsap.to(node, vars);
		}
	};
}

export type AnimateFromParams = { from?: gsap.TweenVars; to?: gsap.TweenVars };

export function animateFrom(node: SVGElement, params: AnimateFromParams = {}) {
	const { from = {}, to = {} } = params;

	gsap.set(node, from);

	return {
		update(params: AnimateFromParams = {}) {
			const { from = {}, to = {} } = params;

			gsap.fromTo(node, from, to);
		}
	};
}
