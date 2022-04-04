<script>
	export let x1 = 0;
	export let x2 = 1;
	export let y1 = 0;
	export let y2 = 1;
	export let width = 24;

	export let quartiles = [0.25, 0.5, 0.75];

	export let stroke = 'gray';
	export let strokeWidth = 2;
	export let fill = '#CED4DA';
	export let fillOpacity = 1

	$: _width = width ?? Math.abs(x2 - x1);
	$: halfWidth = _width / 2;
	$: height = Math.abs(q1 - q3);
	$: [q1, q2, q3] = quartiles;
</script>

<g class="box" transform="translate({x1})" {stroke} {fill} fill-opacity={fillOpacity}>
	<line class="whisker" x1={0} x2={0} {y1} {y2} stroke-width={strokeWidth} />
	<line
		class="upperExtreme"
		x1={-halfWidth}
		x2={-halfWidth + _width}
		{y1}
		y2={y1}
		stroke-width={strokeWidth}
	/>
	<line
		class="lowerExtreme"
		x1={-halfWidth}
		x2={-halfWidth + _width}
		y1={y2}
		{y2}
		stroke-width={strokeWidth}
	/>
	<rect x={-halfWidth} y={Math.min(q1, q3)} {height} width={_width} />
	<line class="median" x1={-halfWidth} x2={-halfWidth + _width} y1={q2} y2={q2} />

	<g class="data">
		<slot />
	</g>
</g>
