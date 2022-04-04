<script>
	import { Grafico, XAxis, YAxis, Tick, Bin } from 'graficos';
	import { csv, scaleLinear } from 'd3';
	import { onMount } from 'svelte';
	let data = [];

	onMount(async () => {
		data = await csv('/1_OneNum.csv', (d) => ({
			price: +d.price
		}));
	});

	const value = (d) => d.price;

	let innerWidth;
	let innerHeight;

	$: xScale = scaleLinear([0, 1000], [0, innerWidth]);
</script>

<div>
    <Grafico bind:innerWidth bind:innerHeight>
        <XAxis scale={xScale} y={innerHeight} tickSize={-innerHeight} orient="bottom" let:text let:x>
            <Tick {x}>
                <text>{text}</text>
            </Tick>
        </XAxis>
    
        <Bin
            {data}
            {xScale}
            domain={xScale.domain()}
            {value}
            thresholds={xScale.ticks(70)}
            range={[innerHeight, 0]}
            let:x0Get
            let:x1Get
            let:yGet
            let:data
            let:yScale
        >
            <YAxis scale={yScale} let:text let:y>
                <Tick {y} x2={-innerWidth}>
                    <text>{text}</text>
                </Tick>
            </YAxis>
    
            {#each data as d, i (i)}
                <rect
                    x={1}
                    width={x1Get(d) - x0Get(d) - 1}
                    height={innerHeight - yGet(d)}
                    transform={`translate(${x0Get(d)},${yGet(d)})`}
                    fill="grey"
                />
            {/each}
        </Bin>

        <text font-size="24pt" font-weight="900" text-anchor="end" x={innerWidth}>Histogram using grafico library</text>
    </Grafico>
</div>

<style>
    div{
        height: 100%;
        width: 100%;
        padding: 64px;
        box-sizing: border-box;
    }
</style>
