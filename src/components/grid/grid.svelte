<script>
  import { tick } from 'svelte'
  import { css } from '../../utils'
  import { graficoContext } from '../../context.svelte'
  import GridLine from './grid_line.svelte'

  export let stroke = 'rgba(0, 0, 0, 0.1)'
  export let strokeDasharray
  export let strokeWidth
  export let strokeDashoffset
  export let strokeLinecap
  export let strokeOpacity
  export let strokeMiterlimit
  export let strokeLinejoin

  const {
    xScale,
    yScale,
    height,
    innerWidth,
    innerHeight,
    xTicks,
    yTicks
  } = graficoContext()

  function tickValues(scale, ticks) {
    return scale?.ticks?.(ticks) ?? scale.domain()
  }
</script>

<svg
  use:css={{
    stroke,
    strokeDasharray,
    strokeDashoffset,
    strokeWidth,
    strokeLinecap,
    strokeLinejoin,
    strokeMiterlimit,
    strokeOpacity
  }}
  class="grafico-grid"
  height={$height}
  viewBox={`0 0 ${$innerWidth} ${$innerHeight}`}
  preserveAspectRatio="none"
  vector-effect="non-scaling-stroke"
>
  {#await tick() then value}
    <g class="vertical">
      {#each tickValues($xScale, $xTicks) as tick, i (+tick || tick)}
        <slot
          name="vertical"
          x1={$xScale(tick)}
          y1={0}
          x2={$xScale(tick)}
          y2={$innerHeight}
          index={i}
        >
          <GridLine
            x1={$xScale(tick)}
            x2={$xScale(tick)}
            y2={$innerHeight}
            vertical
          />
        </slot>
      {/each}
    </g><g class="horizontal">
      {#each tickValues($yScale, $yTicks) as tick, i (+tick || tick)}
        <slot
          name="horizontal"
          x1={0}
          y1={$yScale(tick)}
          x2={$innerWidth}
          y2={$yScale(tick)}
          index={i}
        >
          <GridLine y1={$yScale(tick)} x2={$innerWidth} y2={$yScale(tick)} />
        </slot>
      {/each}
    </g>
  {/await}
</svg>

<style>
  .grafico-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
