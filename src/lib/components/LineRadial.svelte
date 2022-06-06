<script>
	import { lineRadial, curveLinearClosed } from 'd3';

	export let radius;
	export let angle;
	export let data = [];

	export let stroke = "currentColor"
	export let fill = "none"

	$: line = lineRadial().radius(radius).angle(angle).curve(curveLinearClosed);
</script>

<path d={line(data)} {fill} {stroke} />
