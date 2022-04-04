<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { Grafico, XAxis, YAxis, Tick } from 'graficos'
  import Rect from 'graficos/components/Rect.svelte'
  import { csv, schemeCategory10, scaleBand } from 'd3'
  import MarginDecorator from '../MarginDecorator.svelte'
  import GithubMap from './GithubMap.svelte'

  /**
   * @typedef {Object} Heat
   * @property {string} variable
   * @property {string} group
   * @property {number} value
   */

  /**
   * @type Array<Heat>
   */
  let data = []

  const dataConverter = ({ variable, group, value }) => ({
    group: group,
    variable: variable,
    value: +value
  })
  csv('./heatmap_data.csv', dataConverter).then((res) => (data = res))

  let innerWidth
  let innerHeight

  const xAccessor = ({ variable }) => variable
  const yAccessor = ({ group }) => group

  $: xScale = scaleBand(data.map(xAccessor), [0, innerWidth]).paddingInner(0.01)
  $: yScale = scaleBand(data.map(yAccessor), [0, innerHeight]).paddingInner(
    0.01
  )

  $: xGet = (d) => xScale(xAccessor(d))
  $: yGet = (d) => yScale(yAccessor(d))

  $: xBandwidth = xScale.bandwidth()
  $: yBandwidth = yScale.bandwidth()
</script>

<Meta
  title="Charts/Heatmap chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<MarginDecorator>
  <Story
    name="Normal"
    args={{
      height: 600,
      horizontal: true,
      padding: {
        left: 48,
        top: 16,
        right: 0,
        bottom: 0
      }
    }}
    let:args
  >
    <Grafico {...args} bind:innerWidth bind:innerHeight>
      <XAxis
        scale={xScale}
        orient="bottom"
        y={innerHeight}
        stroke="none"
        let:text
        let:x
      >
        <Tick x={x + xScale.bandwidth() / 2} y={-6}>
          <text>{text}</text>
        </Tick>
      </XAxis>

      <YAxis scale={yScale} orient="left" stroke="none" let:text let:y>
        <Tick x={0} y={y + yScale.bandwidth() / 2}>
          <text>{text}</text>
        </Tick>
      </YAxis>

      {#each data as item, i (i)}
        <Rect
          width={xBandwidth}
          height={yBandwidth}
          x={xGet(item)}
          y={yGet(item)}
          r="4"
        />
      {/each}
    </Grafico>
  </Story>

  <Story name="Year" />

  <Story name="Month" />

  <Story name="GitHub map">
    <GithubMap />
  </Story>
</MarginDecorator>
