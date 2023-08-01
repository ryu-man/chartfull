import { getContext, setContext } from 'svelte';
import { cubicOut } from 'svelte/easing';
import { writable, type Writable } from 'svelte/store';

export const AXIS_CONTEXT_KEY = 'chartfull_axis_context_key';

type AxisContext = {
	currentScale$: Writable<(val: any) => number>;
	previousScale$: Writable<(val: any) => number>;
	tickFormat$: Writable<(val: any) => string>;
	duration$: Writable<number>;
	delay$: Writable<number>;
	easing$: Writable<(t: number) => number>;
	tickSize$: Writable<number>;
	offsetX$: Writable<number>;
	offsetY$: Writable<number>;
	padding$: Writable<number>;
	k: number;
	xy: 'x' | 'y';
};

export function getAxisContext(): AxisContext {
	return getContext(AXIS_CONTEXT_KEY);
}

export function setAxisContext(context: Partial<AxisContext>) {
	return setContext(AXIS_CONTEXT_KEY, {
		currentScale$: writable(),
		previousScale$: writable(),
		tickFormat$: writable((d) => d),
		duration$: writable(0),
		delay$: writable(0),
		easing$: writable(cubicOut),
		tickSize$: writable(6),
		offsetX$: writable(0),
		offsetY$: writable(0),
		padding$: writable(0),
		...context
	});
}
