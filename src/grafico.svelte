<script>
  import { setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { scaleLinear } from 'd3-scale'
  import { graficoContext, key } from './context.svelte'
  import { classNames, css } from './utils'
  import { SizeStore } from './utils/size_store'
  import { storeScale } from './scale/store_scale'

  export let init = basicConfiguration
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

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }

  const {
    widthStore,
    heightStore,
    innerWidthStore,
    innerHeightStore,
    paddingStore
  } = SizeStore(width, height, padding)

  const {
    xAccessors = {
      default: (d) => d.x
    },
    yAccessors = {
      default: (d) => d.y
    },
    xScales = {
      default: storeScale(scaleLinear())
    },
    yScales = {
      default: storeScale(scaleLinear())
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

  function basicConfiguration(node, data = []) {
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
</script>

<figure
  use:css={style}
  use:init={data}
  class={classNames(_class, 'grafico')}
  style={`--height:${height}px;`}
>
  <svg
    height={$innerHeightStore}
    viewBox="0 0 {$innerWidthStore} {$innerHeightStore}"
    preserveAspectRatio="none"
    style={`margin:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px; width: calc(100% - ${padding.left}px - ${padding.right}px);`}
  >
    {#await tick() then value}
      <slot name="grid" />
      <slot
        width={$widthStore}
        height={$heightStore}
        innerWidth={$innerWidthStore}
        innerHeight={$innerHeightStore}
        padding={$paddingStore}
        {xScales}
        {yScales}
        {xAccessors}
        {yAccessors}
        {xAxisId}
        {yAxisId}
      />
    {/await}
  </svg>
  <div
    class="elements"
    style={`padding:${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px;`}
  >
    <div class="inner">
      <slot name="xaxis" />
      <slot name="yaxis" />
      <slot name="legend" />
    </div>
  </div>

  <slot name="title" />
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
