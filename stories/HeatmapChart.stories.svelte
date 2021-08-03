<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import {
    Grafico,
    Declare,
    ScaleOrdinal,
    XAxis,
    YAxis,
    ScaleLinear,
    Tick,
    Ordinal,
    Rect,
    ScaleBand,
    DualOrdinal
  } from '../src'
  import Spring from '../src/components/Spring.svelte'

  import { csv, schemeCategory10, max } from 'd3'
  import MarginDecorator from './MarginDecorator.svelte'
  import { onMount } from 'svelte'

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

  csv('./heatmap_data.csv', ({ variable, group, value }) => ({
    group: group,
    variable: variable,
    value: +value
  })).then((res) => (data = res))

  /**
   * @type Array<Heat>
   */
  let samples = []

  onMount(() => {
    /* const interval = setInterval(() => {
      if (samples.length < data.length) {
        const [d] = data.slice(samples.length, data.length)
        samples = [...samples, d]
      } else {
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval) */
  })

  $: samples = data
</script>

<Meta
  title="Elements/Heatmap chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Story
  name="Normal"
  args={{
    height: 600,
    horizontal: true
  }}
  let:args
>
  <MarginDecorator>
    <Declare
      value={[({ variable }) => variable, ({ group }) => group]}
      let:value={[xAccessor, yAccessor]}
    >
      <Grafico {...args} data={samples} let:innerWidth let:innerHeight>
        <ScaleBand
          domain={samples.map(xAccessor)}
          range={[0, innerWidth]}
          paddingInner={0.01}
          let:scale
        >
          <XAxis
            {scale}
            orient="top"
            tickPadding={16}
            tickSize={innerHeight - 6}
            let:tick
            let:format
            let:x
            let:d
          >
            <Tick x={x + scale.bandwidth() / 2} y={-6} let:tickSize let:props>
              <text {...props} fonts-size="24" fill="gray" font-family="Brandon Grotesque"
                >{format(tick)}</text
              >
            </Tick>
            <path slot="path" {d} stroke="gray" stroke-width="2" fill="none" />
          </XAxis>
        </ScaleBand>

        <ScaleBand
          domain={samples.map(yAccessor)}
          range={[0, innerHeight]}
          paddingInner={0.01}
          let:scale
        >
          <YAxis orient="left" {scale} tickPadding={16} let:tick let:y>
            <Tick x={0} y={y + scale.bandwidth() / 2} tickSize={0} let:props>
              <text
                {...props}
                fonts-size="24"
                fill="gray"
                font-family="Brandon Grotesque">{tick}</text
              >
            </Tick>
          </YAxis>
        </ScaleBand>

        <DualOrdinal
          T={typeof samples}
          x={xAccessor}
          y={yAccessor}
          let:xGet
          let:yGet
          let:xBandwidth
          let:yBandwidth
        >
          {#each samples as item, i (i)}
            <rect
              width={xBandwidth}
              height={yBandwidth}
              x={xGet(item)}
              y={yGet(item)}
            />
          {/each}
        </DualOrdinal>
      </Grafico>
    </Declare>
  </MarginDecorator>
</Story>
