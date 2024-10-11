<script lang="ts">
	export let x1 = 0;
	export let size = 6;
	export let xy = 'x';
	export let k = 1;

	export let stroke: string | undefined = 'rgba(0 0 0/ .07)';
	export let strokeWidth: string | undefined = '';
	export let strokeOpacity: string | undefined = '';
</script>

<line
	{x1}
	y1={0}
	{...{ [xy === 'x' ? 'y2' : 'x2']: size * k }}
	{stroke}
	stroke-width={strokeWidth}
	stroke-opacity={strokeOpacity}
/>
