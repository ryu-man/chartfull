<script>
	import { Chartfull, XAxis, YAxis, Tick } from 'graficos';

	import { csv, schemeCategory10, max, extent, group, rollup, range, min } from 'd3';
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import Tweened from './Tweened.svelte';

	export let args = {};

	let data = [];

	csv('./population.csv', ({ year, age, sex, people }) => ({
		year: +year,
		age: +age,
		sex: +sex,
		people: +people
	})).then((res) => (data = res));

	let year;
	let birthyear;

	let innerWidth;
	let innerHeight;
	const [xAccessor, yAccessor] = [(d) => d.age, (d) => +d.people];

	$: barWidth = Math.floor((innerWidth) / 19) - 4;
	$: barHalfWidth = barWidth / 2;

	$: age1 = max(data, (d) => d.age);
	$: year0 = min(data, (d) => d.year);
	let year1 = 1;
	$: {
		year1 = max(data, (d) => d.year);
		!year && (year = year1);
	}

	$: xScale = scaleLinear([year1 - age1, year1], [innerWidth - barHalfWidth, 0 + barHalfWidth]);
	$: yScale = scaleLinear([0, max(data, yAccessor)], [innerHeight, 0]);
	$: ageScale = scaleLinear([0, 95], [innerWidth - barHalfWidth, 0 + barHalfWidth]);
	$: colorScale = scaleOrdinal(data.map(xAccessor), schemeCategory10);

	$: _ = rollup(
		data,
		(d) => d.map((dd) => dd.people),
		(d) => d.year,
		(d) => d.year - d.age
	);

	$: birthyears = range(year0 - age1, year1 + 1, 5);

	$: tweenedData = birthyears.map((birthyear) => {
		const [male = 0, female = 0] = _.get(year)?.get(birthyear) ?? [0, 0];

		return {
			male,
			female,
			birthyear
		};
	});

	$: xGet = (d) => xScale(xAccessor(d));
	$: yGet = (d) => yScale(yAccessor(d));

	let startDrag = false;

	/**
	 *
	 * @param node {SVGRectElement}
	 * @param param1
	 */
	function rectIn(node, { duration = 200 }) {
		const height = +node.getAttribute('height');
		return {
			duration,
			tick: (t) => {
				node.setAttribute('height', height * t);
			}
		};
	}
	/**
	 *
	 * @param node {SVGRectElement}
	 * @param param1
	 */
	function rectOut(node, { duration = 200 }) {
		const height = +node.getAttribute('height');

		return {
			duration,
			tick: (t) => {
				node.setAttribute('height', height - height * t);
			}
		};
	}
</script>

<Chartfull
	bind:innerWidth
	bind:innerHeight
	{...args}
	padding={{ bottom: 32, right: 64, left: 24 }}
	fontSize="16"
>
	<YAxis
		scale={yScale}
		x={innerWidth}
		orient="right"
		tickSize={innerWidth}
		tickFormat={(d) => Math.round(d / 1e6) + 'M'}
		let:tick
	>
		<Tick {tick} x2={-innerWidth} />
		<text slot="label" font-weight="700">Population</text>
	</YAxis>

	<XAxis scale={ageScale} y={innerHeight} tickValues={range(0, 100, 5)} let:tick>
		<Tick {tick} />
		<text slot="label" x="0" text-anchor="start">Years</text>
	</XAxis>

	<g class="data">
		<Tweened
			data={tweenedData}
			key={(d) => d.birthyear}
			value={(d) => {
				let r = ageScale(year - d.birthyear);
				let width = barWidth;

				const [r0, r1] = ageScale.range();

				if (r < r1) {
					r = r1 ;
					width = 0;
				} else if (r > r0) {
					r = r0 + barWidth;
					width = 0;
				}

				return {
					male: yScale(d.male),
					female: yScale(d.female),
					x: r,
					width: width,
					birthyear: d.birthyear
				};
			}}
			enter={(d) => ({
				male: innerHeight,
				female: innerHeight,
				x: ageScale(year - d.birthyear),
				width: barWidth,
				birthyear: d.birthyear
			})}
			exit={(d) => ({
				male: 0,
				female: 0,
				x: 0,
				width: barWidth,
				birthyear: d.birthyear
			})}
			duration={200}
			let:data
		>
			{#each data as { male, female, x, width, birthyear } (birthyear)}
				<g transform="translate({x},0)">
					<rect
						x={-barHalfWidth}
						width={width}
						y={male}
						height={innerHeight - male}
						fill="rgba(0,0,0,0.4)"
					/>
					<rect
						x={-barHalfWidth}
						width={width}
						y={female}
						height={innerHeight - female}
						fill="rgba(0,0,0,0.4)"
					/>
				</g>
			{/each}
		</Tweened>
	</g>

	<text
		x="0"
		y="0"
		font-size="72pt"
		font-weight="600"
		fill="rgba(0, 0, 0, 0.25)"
		dominant-baseline="hanging"
		style:cursor="pointer"
		style:user-select="none"
		on:mousedown={(e) => {
			startDrag = true;
			e.currentTarget.dataset.clientX = e.clientX;
			e.currentTarget.dataset.year = year;
		}}
		on:mouseup={() => {
			startDrag = false;
		}}
		on:mousemove={(e) => {
			if (!startDrag) return;
			year = Math.max(
				year0,
				Math.min(
					year1,
					+e.currentTarget.dataset.year +
						Math.round((e.clientX - +e.currentTarget.dataset.clientX) / 20) * 10
				)
			);
		}}>{year}</text
	>
</Chartfull>
