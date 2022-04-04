<script>
  import { Story } from '@storybook/addon-svelte-csf'
  import { Grafico, XAxis, YAxis, Tick } from 'graficos'
  import { parse, getWeekOfMonth, startOfYear, endOfYear } from 'date-fns'
  import {
    csv,
    schemeCategory10,
    max,
    scaleBand,
    group,
    scaleTime,
    extent,
    scaleQuantize,
    scaleQuantile,
    timeWeek
  } from 'd3'

  let data = []

  const dataConverter = ({ date, author }) => {
    return {
      date: parse(date, 'dd/mm/yyyy', new Date())
    }
  }
  const ready = csv('./heatmap/commits1.csv', dataConverter).then(
    (res) => (data = res)
  )

  let innerWidth
  let innerHeight

  const xAccessor = (d) => d.date
  const yAccessor = (d) => d[' author']
  const padding = 0.08
  const today = new Date()
  const yearDomain = [startOfYear(today), endOfYear(today)]

  let dateScale = scaleTime([0, 1], [0, innerWidth])
  $: frequencies = group(data, (d) => d.date)
  $: dd = Array.from(frequencies.keys())
  $: xScale = scaleBand(timeWeek.range(...yearDomain), [
    0,
    innerWidth
  ]).paddingInner(padding)
  $: dateScale = scaleTime(yearDomain, [0, innerWidth])
  $: yScale = scaleBand([0, 1, 2, 3, 4, 5, 6], [0, innerHeight]).paddingInner(
    padding
  )
  $: frequencyScale = scaleQuantile(
    new Set(Array.from(frequencies.values()).map((d) => d.length)).values(),
    ['grey', 'green', 'darkgreen']
  )

  $: xGet = (d) => xScale(xAccessor(d))
  $: yGet = (d) => yScale(getWeekOfMonth(d.date))

  $: xBandwidth = xScale.bandwidth()
  $: yBandwidth = yScale.bandwidth()
</script>

{#await ready then value}
  <Grafico height={xScale.bandwidth() * 7} bind:innerWidth bind:innerHeight>
    <XAxis
      scale={dateScale}
      orient="bottom"
      y={innerHeight}
      stroke="none"
      let:text
      let:x
    >
      <Tick {x}>
        <text>{text}</text>
      </Tick>
    </XAxis>

    <YAxis scale={yScale} orient="left" stroke="none" let:text let:y>
      <Tick x={0} y={y + yScale.bandwidth() / 2}>
        <text>{text}</text>
      </Tick>
    </YAxis>

    {#each data as item, i (i)}
      <rect
        width={xBandwidth}
        height={yBandwidth}
        x={xGet(item)}
        y={yGet(item)}
        rx="4"
        ry="4"
      />
    {/each}
  </Grafico>
{/await}
