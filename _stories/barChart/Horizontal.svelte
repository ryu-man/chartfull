<script>
  import { Grafico, Declare, ScaleOrdinal, XAxis, Tick } from 'graficos'
  import Spring from 'graficos/components/Spring.svelte'

  import { onMount } from 'svelte'
  import { csv, schemeCategory10, max } from 'd3'
  import { scaleLinear, scaleBand } from 'd3-scale'

  export let args = {}

  let data = []

  csv('./7_OneCatOneNum_header.csv', ({ Country, Value }) => ({
    Country: Country + '',
    Value: +Value
  })).then((res) => (data = res))

  let innerWidth
  let innerHeight

  const [xAccessor, yAccessor] = [(d) => +d.Value, (d) => d.Country]

  let xScale = scaleLinear([0, max(data, xAccessor)], [0, innerWidth])
  $: xScale = xScale.domain([0, max(data, xAccessor)]).range([0, innerWidth])

  let yScale = scaleBand(data.map(yAccessor), [innerHeight, 0]).padding(0.2)
  $: yScale = yScale
    .domain(data.map(yAccessor))
    .range([innerHeight, 0])
    .padding(0.2)
</script>

<Grafico
  padding={{ left: 96 }}
  fontFamily="Brandon Grotesque"
  bind:innerWidth
  bind:innerHeight
  {...args}
>
  <XAxis scale={xScale} y={innerHeight} orient="bottom" let:text let:x>
    <Tick {x} y2={-innerHeight}>
      <text>{text}</text>
    </Tick>
  </XAxis>
  <ScaleOrdinal
    domain={data.map(yAccessor)}
    range={schemeCategory10}
    let:scale={scaleOrdinale}
  >
    <Declare
      value={[(d) => xScale(xAccessor(d)), (d) => yScale(yAccessor(d))]}
      let:value={[xGet, yGet]}
    >
      {#each data as item, i (i)}
        <Spring
          from={[0, 0, 0, 0]}
          to={[yGet(item), xGet(item), yScale.bandwidth(), 1]}
          damping={0.5}
          stiffness={0.04}
          let:value={[y, width, height, opacity]}
        >
          <g transform={`translate(${0},${yGet(item)})`}>
            <text
              dx={-16}
              dy={yScale.bandwidth() / 2}
              text-anchor="end"
              fonts-size="24"
              fill="gray">{yAccessor(item)}</text
            >
            <rect
              width={xGet(item)}
              height={yScale.bandwidth()}
              fill={scaleOrdinale(yAccessor(item))}
            />
          </g>
        </Spring>
      {/each}
    </Declare>
  </ScaleOrdinal>
</Grafico>
