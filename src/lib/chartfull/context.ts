import { getContext, setContext } from 'svelte';
import type { ReadableAccess, WritableAccess } from 'svelte-tools';

export const chartfull_context_key = 'chartfull_context_key';

export type ChartfullContext<T> = {
	width$: WritableAccess<number>;
	height$: WritableAccess<number>;
	innerWidth$: ReadableAccess<number>;
	innerHeight$: ReadableAccess<number>;
	paddingBottom$: WritableAccess<number>;
	paddingLeft$: WritableAccess<number>;
	paddingRight$: WritableAccess<number>;
	paddingTop$: WritableAccess<number>;
	data$: WritableAccess<T>;
};

export function getChartfullContext<T>() {
	return getContext(chartfull_context_key) as ChartfullContext<T>;
}

export function setChartfullContext<T>(context: ChartfullContext<T>) {
	setContext(chartfull_context_key, context);
}
