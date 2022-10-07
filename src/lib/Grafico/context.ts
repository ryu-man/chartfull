import { getContext, setContext } from 'svelte';
import type { ReadableAccess, WritableAccess } from 'svelte-tools';

export const grfico_context_key = 'grafico_context_key';

export type GraficoContext<T> = {
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

export function getGraficoContext<T>() {
	return getContext(grfico_context_key) as GraficoContext<T>;
}

export function setGraficoContext<T>(context: GraficoContext<T>) {
	setContext(grfico_context_key, context);
}
