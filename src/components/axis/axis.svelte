<script lang="ts">
  import { extent } from 'd3'

  import { tick } from 'svelte'
  import { charterContext } from '../../context.svelte'

  const context = charterContext()
  let { innerWidth, data, xAccessor } = context

  export let scale: any
  export let dimension:number
  export let ticks: number | null
  export let nice: boolean = false
  export let format: string
  export let position: string = 'bottom'
  export let style = {}
  let _class = ''
  export { _class as class }

  let formatter: (value: any) => string
  console.log(scale)
  ticks && (context.xTicks = ticks)
  console.log('axis')
  nice && scale.nice()
  formatter = scale?.tickFormat?.(ticks, format) ?? ((d) => d)

  function tickValues(scale, ticks): any[] {
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
          {formatter} />
      {/each}
    {/await}
  </div>

  <slot name="label">
    <span style="position:absolute;right:0;">label</span>
  </slot>
</div>

<style>
  :global(.axis) {
    position: absolute;
  }
  :global(.x.axis) {
    height: 2em;
    width: 100%;
  }
  :global(.y.axis) {
    height: 100%;
    width: 2em;
  }
  :global(.axis.top) {
    padding-bottom: 0.7em;
    bottom: 100%;
  }
  :global(.axis.bottom) {
    padding-top: 0.7em;
    top: 100%;
  }
  :global(.axis.left) {
    padding-right: 0.7em;
    right: 100%;
  }
  :global(.axis.right) {
    padding-left: 0.7em;
    left: 100%;
  }
  :global(.axis > .inner-axis) {
    position: relative;
    width: inherit;
    height: inherit;
  }
</style>
