<script>
  import { Grafico, Declare, ScaleOrdinal, XAxis, Tick } from 'graficos'
  import Spring from 'graficos/components/Spring.svelte'

  import { csv, schemeCategory10, max } from 'd3'
  import { scaleBand, scaleLinear } from 'd3-scale'
  import { onMount } from 'svelte'

  export let args = {}

  let data = []

  csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
    Country: Country + '',
    Value: +Value
  })).then((res) => (data = res))

  let samples = []

  onMount(() => {
    const interval = setInterval(() => {
      if (samples.length < data.length) {
        const [d] = data.slice(samples.length, data.length)
        samples = [...samples, d]
      } else {
        clearInterval(interval)
      }
    }, 900)

    return () => clearInterval(interval)
  })

  let innerWidth
  let innerHeight

  const [xAccessor, yAccessor] = [(d) => +d.Value, (d) => d.Country]

  $: xScale = scaleLinear([0, max(samples, (d) => +d.Value)], [0, innerWidth])
  $: yScale = scaleBand(samples.map(yAccessor), [
    (innerHeight * samples.length) / 10,
    0
  ]).padding(0.2)
</script>

<Grafico
  bind:innerWidth
  bind:innerHeight
  data={samples}
  padding={{ left: 96 }}
  fontFamily="Brandon Grotesque"
  {...args}
>
  <XAxis scale={xScale} orient="bottom" y={innerHeight} let:text let:x>
    <Tick {x} y2={-innerHeight}>
      <text>{text}</text>
    </Tick>
  </XAxis>

  <ScaleOrdinal
    domain={samples.map(yAccessor)}
    range={schemeCategory10}
    let:scale={scaleOrdinale}
  >
    <Declare
      value={[(d) => xScale(xAccessor(d)), (d) => yScale(yAccessor(d))]}
      let:value={[xGet, yGet]}
    >
      {#each samples as item, i (i)}
        <Spring
          from={[0, 0, 0, 0]}
          to={[yGet(item), xGet(item), yScale.bandwidth(), 1]}
          damping={0.5}
          stiffness={0.04}
          let:value={[y, width, height, opacity]}
        >
          <g transform={`translate(${0},${y})`}>
            <text
              dx={72 * (1 - opacity) - 16}
              dy={yScale.bandwidth() / 2}
              {opacity}
              text-anchor="end"
              fonts-size="24"
              fill="gray">{yAccessor(item)}</text
            >
            <rect {width} {height} fill={scaleOrdinale(yAccessor(item))} />
          </g>
        </Spring>
      {/each}
    </Declare>
  </ScaleOrdinal>
</Grafico>
