<script lang="ts">
	import { derived, writable } from 'svelte-tools';

	export let x = 0;
	export let y = 0;
	export let width = 0;
	export let height = 0;
	export let r = '0';

	const r$ = writable(r);
	$: r$.set(r);

	const x$ = writable(x);
	$: x$.set(x);
	const y$ = writable(y);
	$: y$.set(y);
	const width$ = writable(width);
	$: width$.set(width);
	const height$ = writable(height);
	$: height$.set(height);

	type Radius = [number, number, number, number];
	const d$ = derived([x$, y$, width$, height$, r$], ([x, y, width, height, r]) => {
		const [rtl = 0, rtr = rtl, rbr = rtr, rbl = rtl] = (r + '').split(' ').map((d) => +d) as Radius;

		return `M${x + rtl},${y} h${width - (rtl + rtr)} q${rtr},0 ${rtr},${rtr} v${
			height - (rtr + rbr)
		} q0,${rbr} ${-rbr},${rbr} h${-(width - (rbr + rbl))} q${-rbl},0 ${-rbl},${-rbl} v${-(
			height -
			(rbl + rtl)
		)} q0,${-rtl} ${rtl},${-rtl} z`;
	});

	export let stroke = 'rgba(0 0 0 / .2)';
	export let fill = 'rgba(0 0 0 / .1)';
</script>

<path {...$$restProps} d={$d$} {fill} {stroke} on:click on:mouseenter on:mouseleave />

<style>
	path {
		vector-effect: non-scaling-stroke;
	}
</style>
