import { scaleUtc, type ScaleTime } from 'd3-scale';
import { range as sequence } from 'd3-array';

export type ScaleFinance = ScaleTime<number, number, never> & {
	step(): number;
	band(): number;
	padding(): number;
	padding(value: number): ScaleFinance;
	paddingInner(): number;
	paddingInner(value: number): ScaleFinance;
	paddingOuter(): number;
	paddingOuter(value: number): ScaleFinance;
};

const length = (r0 = 0, r1 = 1) => Math.abs((r0 || 0) - (r1 || 1));

export const scaleFinance = (domain = [0, 1], range = [0, 1]): ScaleFinance => {
	let r0 = range[0];
	let r1 = range[1];
	let paddingInner = 0;
	let paddingOuter = 0;

	const scale = scaleUtc();
	const _range = scale.range;

	scale.step = function () {
		return length(r0, r1) / Math.max(1, this.domain().length - paddingInner + paddingOuter * 2);
	};

	scale.band = function () {
		return this.step() * (1 - paddingInner);
	};

	scale.padding = function (...args) {
		if (args.length) {
			const padding = args[0] * this.step();
			paddingInner = padding;
			paddingOuter = padding;
			return this;
		}

		return paddingInner + paddingOuter;
	};

	scale.paddingInner = function (...args) {
		if (args.length) {
			paddingInner = args[0] * this.step();
			return this;
		}
		return paddingInner;
	};

	scale.paddingOuter = function (...args) {
		if (args.length) {
			paddingOuter = args[0] * this.step();
			return this;
		}
		return paddingOuter;
	};

	scale.range = function (...args) {
		if (args.length) {
			const [arg0 = 0, arg1 = 0] = args[0] as number[];

			r0 = arg0 + scale.band() / 2;
			r1 = arg1 - scale.band() / 2;

			return _range(sequence(this.domain().length).map((i) => r0 + this.step() * i));
		}
		return _range();
	};

	return scale.domain(domain).range([r0, r1]);
};

const s = scaleFinance([], []);
