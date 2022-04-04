<script>
	import { curveLinear } from 'd3-shape';
	import Line from './line';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let data = [];

	export let x;
	export let y;
	export let defined = true;
	export let curve = curveLinear;
	export let context;

	export let stroke = 'gray';
	export let strokeWidth;
	export let strokeOpacity;
	export let strokeLinecap;
	export let strokeLinejoin;
	export let strokeDasharray;
	export let strokeDashoffset;
	export let strokeMiterlimit;
	export let fill = 'transparent';
	export let fillOpacity;
	export let fillRule;

	const root = Line(x, y);
	let line = root;

	$: line = root.x(x);
	$: line = root.y(y);
	$: line = root.defined(defined);
	$: line = root.curve(curve);
	$: line = root.context(context);

	function constant(x) {
		return function constant() {
			return x;
		};
	}
	function toString(data) {
		return data.map(([c, ...rest]) => c + rest.join(',')).join('');
	}

	const store = tweened([], {
		easing: cubicOut,
		interpolate: (a, b) => {
			if (!a.length && !b.length) {
				return () => [];
			}

			const aArray = !a.length ? [b[0]] : a.slice().filter((d) => d[0] !== 'Z');
			const bArray = !b.length ? [a[0]] : b.slice().filter((d) => d[0] !== 'Z');

			const extendLength = aArray.length - bArray.length;

			if (extendLength <= 0) {
				return (t) =>
					aArray
						.concat(new Array(Math.abs(extendLength)).fill(aArray[aArray.length - 1]))
						.map(([c, ...coords], i) => [
							c,
							...coords.map((d, ii) => d + (bArray[i][ii + 1] - d) * t)
						]);
			}

			return (t) =>
				bArray
					.concat(new Array(extendLength).fill(bArray[bArray.length - 1]))
					.map(([c, ...coords], i) => [c, ...coords.map((d, ii) => d + aArray[i][ii + 1] * t)]);
		}
	});

	$: $store = line(data);

	$: d = toString($store);
</script>

<path
	{d}
	{stroke}
	stroke-width={strokeWidth}
	stroke-opacity={strokeOpacity}
	stroke-linecap={strokeLinecap}
	stroke-linejoin={strokeLinejoin}
	stroke-dasharray={strokeDasharray}
	stroke-dashoffset={strokeDashoffset}
	stroke-miterlimit={strokeMiterlimit}
	{fill}
	fill-opacity={fillOpacity}
	fill-rule={fillRule}
/>
