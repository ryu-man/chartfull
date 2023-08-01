import { writable, derived, type WritableAccess } from 'svelte-tools';
import type { Padding } from '$lib/types';

export function sizeStore(width: number, height: number, padding: Padding) {
	const width$ = writable(width);
	const height$ = writable(height);

	const { paddingBottom$, paddingLeft$, paddingRight$, paddingTop$ } = paddingStore(padding);

	const innerWidth$ = innerWidthStore(width$, paddingLeft$, paddingRight$);

	const innerHeight$ = innerHeightStore(height$, paddingTop$, paddingBottom$);

	return {
		width$,
		height$,
		paddingTop$,
		paddingRight$,
		paddingBottom$,
		paddingLeft$,
		innerWidth$,
		innerHeight$
	};
}

export function paddingStore(padding: Padding) {
	const paddingTop$ = writable(padding.top);
	const paddingRight$ = writable(padding.right);
	const paddingBottom$ = writable(padding.bottom);
	const paddingLeft$ = writable(padding.left);

	return { paddingTop$, paddingRight$, paddingBottom$, paddingLeft$ };
}

export function innerWidthStore(
	width$: WritableAccess<number>,
	padding1$: WritableAccess<number>,
	padding2$: WritableAccess<number>
) {
	return derived([width$, padding1$, padding2$], ([value, p1, p2]) => value - p1 - p2);
}

export function innerHeightStore(
	height$: WritableAccess<number>,
	padding1$: WritableAccess<number>,
	padding2$: WritableAccess<number>
) {
	return derived([height$, padding1$, padding2$], ([height, p1, p2]) => height - p1 - p2);
}
