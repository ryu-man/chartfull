export const code = `
<script>
  import { Chartfull, XAxis, YAxis, Tick, Area } from 'graficos'
  import { csv, extent, max, timeParse, scaleLinear, scaleTime } from 'd3'

  let data = []
  const parser = timeParse('%Y-%m-%d')

  const dataConverter = (d) => ({
    date: parser(d.date),
    value: +d.value
  })

  csv('./data.csv', dataConverter).then((res) => (data = res))

  const [xAccessor, yAccessor] = [(d) => d.date, (d) => +d.value]
  let innerWidth
  let innerHeight

  $: xScale = scaleTime(extent(data, xAccessor), [0, innerWidth])
  $: yScale = scaleLinear([0, max(data, yAccessor)], [innerHeight, 0])

  $: xScaled = (d) => xScale(xAccessor(d))
  $: y1Scaled = (d) => yScale(yAccessor(d))
</script>

<Chartfull
    {data}
    padding={{ top: 24, left: 64, right: 0, bottom: 24 }}
    fontSize="14"
    bind:innerWidth
    bind:innerHeight
>
    <XAxis scale={xScale} y={innerHeight} orient="bottom" let:x let:text>
        <Tick {x} y2={-innerHeight} stroke="#e8e8e8">
            <text>{text}</text>
        </Tick>
        <text x={innerWidth} y={24} slot="label">Year</text>
    </XAxis>

    <YAxis scale={yScale} let:y let:text>
        <Tick {y} x2={-innerWidth} stroke="#e8e8e8">
            <text>{text}</text>
        </Tick>
        <text slot="label">Value</text>
    </YAxis>
    <Area x={xScaled} y0={innerHeight} y1={y1Scaled} {data} fill="grey"/>
</Chartfull>
`
