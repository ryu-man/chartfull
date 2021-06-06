<script>
  import { setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { scaleLinear } from 'd3-scale'
  import { graficoContext, key } from './Context.svelte'
  import { classNames, css } from './utils'
  import { sizeStore } from './utils/sizeStore'
  import { scaleStore } from './scales'

  export let init = initialize
  export let width = 300
  export let height = 300
  export let padding = {}
  export let data = []
  export let style = {}
  export let onMount
  export let onUpdate
  export let onDestroy
  let _class = ''
  export { _class as class }

  padding = { top: 72, right: 72, bottom: 72, left: 72, ...padding }

  const {
    widthStore,
    heightStore,
    innerWidthStore,
    innerHeightStore,
    paddingStore
  } = sizeStore(width, height, padding)

  const {
    xAccessors = {
      default: (d) => d.x
    },
    yAccessors = {
      default: (d) => d.y
    },
    xScales = {
      default: scaleStore(scaleLinear())
    },
    yScales = {
      default: scaleStore(scaleLinear())
    },
    dataStore = writable(data),
    xTickValues = writable([]),
    yTickValues = writable([]),
    xAxisId = 'default',
    yAxisId = 'default',
    ...rest
  } = graficoContext() ?? {}

  let context = {
    widthStore,
    heightStore,
    innerWidthStore,
    innerHeightStore,
    paddingStore,
    dataStore,
    xScales,
    yScales,
    xAccessors,
    yAccessors,
    xTickValues,
    yTickValues,
    xAxisId,
    yAxisId,
    ...rest
  }

  setContext(key, context)

  function initialize(node, data = []) {
    $widthStore = node.offsetWidth

    onMount?.(node, data)

    return {
      update(data) {
        $widthStore = node.offsetWidth

        onUpdate?.(node, data)
      },
      destroy() {
        onDestroy?.()
      }
    }
  }

  $: $dataStore = data

</script>

<figure
  use:css={style}
  use:init={data}
  class={classNames(_class, 'grafico')}
  style={`--height:${height}px;`}
>
  <svg
    height={$heightStore}
    viewBox="0 0 {$widthStore} {$heightStore}"
    preserveAspectRatio="none"
  >
    <g transform={`translate(${padding.left}, ${padding.top})`}>
      {#await tick() then _}
        <slot name="grid" />
        <slot
          width={$widthStore}
          height={$heightStore}
          innerWidth={$innerWidthStore}
          innerHeight={$innerHeightStore}
          padding={$paddingStore}
          data={$dataStore}
          {xScales}
          {yScales}
          {xAccessors}
          {yAccessors}
          {xAxisId}
          {yAxisId}
        />
      {/await}
      <slot name="xaxis" />
      <slot name="yaxis" />
      <slot name="svg" />
    </g>
  </svg>

  <slot name="html" />

  <figcaption>
    <slot name="title" />
  </figcaption>
</figure>

<style>
  .grafico {
    width: 100%;
    min-width: 600px;
    height: var(--height);
    min-height: 300px;
    position: relative;
    margin: 0;
  }
  svg {
    width: 100%;
    overflow: visible;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
  .elements > .inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .grafico :global(figcaption) {
    position: absolute;
    bottom: 101%;
    right: 0;
    font-weight: 600;
    font-size: 1.2em;
  }

</style>
