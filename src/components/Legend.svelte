<script>
  import { css } from '../utils'
  // import LegendItem from './legend/legend_item.svelte'
  import { graficoContext } from '../Context.svelte'

  export let top = 'unset'
  export let left = 'unset'
  export let right = 'unset'
  export let bottom = 'unset'
  export let style = {}

  const context = graficoContext()
  const { colorScale, keys } = $context

  let _style = {
    backgroundColor: '#fff',
    padding: '8px',
    boxShadow: '0 0 4px 2px #00000017',
    ...style
  }
</script>

<div
  use:css={_style}
  class="legend"
  style={`top:${top}; left:${left}; bottom:${bottom}; right:${right}`}
>
  {#each keys as key}
    <slot {key} color={colorScale(key)}>
      <!-- <LegendItem color={colorScale(key)}>{key}</LegendItem> -->
    </slot>
  {/each}
</div>

<style>
  div.legend {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    gap: 0.3vw;
  }
</style>
