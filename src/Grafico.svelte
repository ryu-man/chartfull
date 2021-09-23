<script context="module">
  export const key = {}

  export const graficoContext = () => getContext(key) || {}
</script>

<script>
  import { getContext, setContext, tick } from 'svelte'
  import { writable } from 'svelte/store'
  import { classNames, css } from './utils'
  import { sizeStore } from './utils/sizeStore'

  export let init = initialize
  export let width = 300
  export let height = 300
  export let innerWidth = 0
  export let innerHeight = 0
  export let padding = {}
  export let data = []
  export let style = {}
  let _class = ''
  export { _class as class }

  const {
    widthStore,
    heightStore,
    innerWidthStore,
    innerHeightStore,
    paddingStore
  } = sizeStore(width, height, {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  })

  const { dataStore = writable(data), ...rest } = graficoContext() ?? {}

  const scales = writable({})
  const accessors = writable({})

  const context = {
    widthStore,
    heightStore,
    innerWidthStore,
    innerHeightStore,
    paddingStore,
    dataStore,
    scales,
    accessors,
    ...rest
  }

  setContext(key, context)

  function initialize(node, data = []) {
    $widthStore = node.offsetWidth

    onMount?.(node, data)

    return {
      update(data) {
        $widthStore = node.offsetWidth
      }
    }
  }

  $: $dataStore = data

  $: innerWidth = $innerWidthStore
  $: innerHeight = $innerHeightStore
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
    <g
      transform={`translate(${$paddingStore.left}, ${$paddingStore.top})`}
      font-family="system-ui"
    >
      {#await tick() then _}
        <slot
          width={$widthStore}
          height={$heightStore}
          innerWidth={$innerWidthStore}
          innerHeight={$innerHeightStore}
          padding={$paddingStore}
          data={$dataStore}
        />
      {/await}

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
  figcaption {
    font-family: 'Brandon Grotesque';
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
    top: 0;
    right: 0;
    font-weight: 600;
    font-size: 1.2em;
  }
</style>
