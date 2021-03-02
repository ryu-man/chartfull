<script context="module">
  let xAxis
  let yAxis

  export let mirror = false

  export const primaryAxis = () => (mirror ? yAxis : xAxis)
  export const secondaryAxis = () => (!mirror ? yAxis : xAxis)

  export function getRange(dimension, indent) {
    return [indent, dimension]
  }
</script>

<script>
  import { tick } from 'svelte'

  export let scale
  export let dimension
  export let ticks
  export let nice = false
  export let format
  export let position = 'bottom'
  export let style = {}
  let _class = ''
  export { _class as class }

  let formatter

  nice && scale.nice()
  formatter = scale?.tickFormat?.(ticks, format) ?? ((d) => d)

  function tickValues(scale, ticks) {
    return scale?.ticks?.(ticks) ?? scale.domain()
  }
</script>

<div class="{_class + ' '}{position + ' '} axis">
  <div class="inner-axis">
    {#await tick() then value}
      {#each tickValues(scale, ticks) as tick, i (+tick || tick)}
        <slot
          coord={(scale(tick) * 100) / dimension}
          {tick}
          index={i}
          {formatter}
        />
      {/each}
    {/await}
  </div>

  <slot name="label">
    <span style="position:absolute;left:100%;">label</span>
  </slot>
</div>

<style>
  .axis {
    position: absolute;
  }
  .x.axis {
    height: 2em;
    width: 100%;
  }
  .x.axis.mirror {
    width: 2em;
    height: 100%;
  }
  .y.axis {
    height: 100%;
    width: 2em;
  }
  .y.axis.mirror {
    width: 100%;
    height: 2em;
  }
  .axis.top {
    padding-bottom: 0.7em;
    bottom: 100%;
  }
  .axis.bottom {
    padding-top: 0.7em;
    top: 100%;
  }
  .axis.left {
    padding-right: 0.7em;
    right: 100%;
  }
  .axis.right {
    padding-left: 0.7em;
    left: 100%;
  }
  .axis > .inner-axis {
    position: relative;
    width: inherit;
    height: inherit;
  }
  .x.axis :global(.label) {
    position: absolute;
    right: 0;
  }
  .y.axis :global(.label) {
    position: absolute;
    left: 0;
    bottom: 101%;
  }
</style>
