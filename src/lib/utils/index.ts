import type { NumberValue, ScaleContinuousNumeric, ScaleOrdinal } from 'd3';
import type { Properties } from 'csstype';

export function css(node: HTMLElement, style: string | Properties) {
	const stylesheet = node.style;

	if (typeof style === 'string') {
		stylesheet.cssText += style;
		return;
	}

	Object.entries(style || {}).forEach((elem) => {
		if (elem[1]) stylesheet[elem[0]] = elem[1];
	});
}

export function register(node, events) {
	Object.keys(events).forEach((key) => node.addEventListener(key, events[key]));
	return () => {
		Object.keys(events).forEach((key) => node.addEventListener(key, events[key]));
	};
}

export function classNames(...args) {
	return args
		.filter(Boolean)
		.map((o) => o.trim())
		.join(' ');
}

export type Accessor<T = any, U = any> = (value: T) => U;
export type Get<D, S, A> = {
	(value: D): ExtractRange<S>;
	scale: S;
	accessor: A;
};
type ExtractDomain<T> = T extends ScaleContinuousNumeric<any, any, any>
	? NumberValue
	: T extends ScaleOrdinal<infer G, any, any>
	? G
	: any;
type ExtractRange<T> = T extends ScaleContinuousNumeric<any, any, any>
	? NumberValue
	: T extends ScaleOrdinal<any, infer G, any>
	? G
	: any;

export function get<
	DATA,
	SCALE extends (v: any) => any,
	ACCESSOR extends (v: DATA) => ExtractDomain<SCALE>
>(scale: SCALE, key: ACCESSOR): Get<DATA, SCALE, ACCESSOR> {
	const get = function (value: DATA): ExtractRange<SCALE> {
		return scale(key(value));
	};
	get.scale = scale;
	get.accessor = key;

	return get;
}
