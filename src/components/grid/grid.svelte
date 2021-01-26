<script lang="ts">
  import { tick } from 'svelte'
  import { cubicIn } from 'svelte/easing'
  import { css } from '../../utils'
  import { chartistContext } from '../../context.svelte'
  import GridLine from './grid_line.svelte'

  export let duration: number = 400
  export let delay: number = 0
  export let easing: any = cubicIn

  export let stroke: string = 'rgba(0, 0, 0, 0.1)'
  export let strokeDasharray: string
  export let strokeWidth: string
  export let strokeDashoffset: string
  export let strokeLinecap: string
  export let strokeOpacity: string
  export let strokeMiterlimit: string
  export let strokeLinejoin: string

  const {
    xScale,
    yScale,
    height,
    innerWidth,
    innerHeight,
    xTicks,
    yTicks,
    margin
  } = chartistContext()

  function tickValues(scale, ticks): any[] {
    return scale?.ticks?.(ticks) ?? scale.domain()
  }
</script>

<svg
  use:css={{ stroke, strokeDasharray, strokeDashoffset, strokeWidth, strokeLinecap, strokeLinejoin, strokeMiterlimit, strokeOpacity }}
  class="chartist-grid"
  height={$height}
  viewBox="0 0 {$innerWidth} {$innerHeight}"
  preserveAspectRatio="none"
  vector-effect="non-scaling-stroke" >
  {#await tick() then value}
    <g class="vertical">
      {#each tickValues($xScale, $xTicks) as tick, i (+tick || tick)}
        <slot name="vertical" x={$xScale(tick)} index={i}>
          <GridLine
            x={$xScale(tick)}
            width={$innerWidth}
            height={$innerHeight}
            unite="%"
            {duration}
            delay={delay * i}
            {easing}
            vertical />
        </slot>
      {/each}
    </g>
    <g class="horizontal">
      {#each tickValues($yScale, $yTicks) as tick, i (+tick || tick)}
        <slot name="horizontal" y={$yScale(tick)} index={i}>
          <GridLine
            y={$yScale(tick)}
            width={$innerWidth}
            height={$innerHeight}
            unite="%"
            {duration}
            delay={delay * i} />
        </slot>
      {/each}
    </g>
  {/await}
</svg>

<style>
  .chartist-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
