<script>
	import { format } from 'date-fns';

	export let tick;
	export let angle = 0;

	$: sinSign = Math.sign(Math.sin(angle));
</script>

<g
	font-size="9pt"
	text-anchor="middle"
	transform="rotate({(angle * 180) / Math.PI}) translate({100}, 0)"
>
	<line x2={-8} stroke="rgba(0 0 0 / .1)" />
	<slot>
		<text
			fill="rgba(0 0 0 / .3)"
			transform="rotate({sinSign * -90}) translate(0,{sinSign * -24})"
			dominant-baseline="middle"
		>
			{format(tick, 'MMM')}
		</text>
	</slot>
</g>
