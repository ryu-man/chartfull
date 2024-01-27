import { getContext, setContext } from 'svelte';
import { cubicOut } from 'svelte/easing';
import { writable, type Writable } from 'svelte/store';

export const AXIS_CONTEXT_KEY = 'chartfull_axis_context_key';

type AxisContextProps = {
	currentScale: (val: any) => number;
	previousScale: (val: any) => number;
	currentPosition: (d: any) => number;
	previousPosition: (d: any) => number;
	tickFormat: (val: any) => string;
	duration: number;
	delay: number;
	easing: (t: number) => number;
	tickSize: number;
	tickPadding: number;
	k: number;
	xy: 'x' | 'y';
};

type AxisContext = Writable<AxisContextProps>;

export function getAxisContext(): AxisContext {
	return getContext(AXIS_CONTEXT_KEY);
}

export function setAxisContext(context: Partial<AxisContextProps>) {
	return setContext(
		AXIS_CONTEXT_KEY,
		writable({
			currentScale: context.currentScale,
			previousScale: context.previousScale,
			currentPosition: context.currentPosition,
			previousPosition: context.previousPosition,
			tickFormat: context.tickFormat || ((d) => d),
			duration: 0,
			delay: 0,
			easing: cubicOut,
			tickSize: 6,
			tickPadding: 0,
			...context
		})
	);
}
