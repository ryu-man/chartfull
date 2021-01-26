<script lang="ts">
  import { css } from '../utils'
  import LegendItem from './legend/legend_item.svelte'
  import { chartistContext } from '../context.svelte'

  export let top: number | string = 'unset'
  export let left: number | string = 'unset'
  export let right: number | string = 'unset'
  export let bottom: number | string = 'unset'
  export let style = {}

  const context = chartistContext()
  const { colorScale, keys } = $context
  
  console.log($context)
  let _style = {
    backgroundColor: '#fff',
    padding: '8px',
    boxShadow: '0 0 4px 2px #00000017',
    ...style
  }
</script>

<div
  use:css="{_style}"
  class="legend"
  style="{`top:${top}; left:${left}; bottom:${bottom}; right:${right}`}"
>
  {#each keys as key}
    <slot key="{key}" color="{colorScale(key)}">
      <LegendItem color="{colorScale(key)}">{key}</LegendItem>
    </slot>
  {/each}
</div>

<style>
  div.legend {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    gap: .3vw;
  }
</style>
