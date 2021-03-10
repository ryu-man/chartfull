<script>
  import { tick as Tick } from 'svelte'
  import { css } from '../../utils'
  import { graficoContext } from '../../context.svelte'

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
  {#await Tick() then value}
    <g
      class="vertical"
      transform="translate({($xScale?.bandwidth?.() ?? 0) / 2},0)"
    >
      {#each tickValues($xScale, $xTicks) as tick, i (+tick || tick)}
        <slot
          name="vertical"
          x1={$xScale(tick)}
          y1={0}
          x2={$xScale(tick)}
          y2={$innerHeight}
          index={i}
        >
          <line
            x1={$xScale(tick)}
            y1={0}
            x2={$xScale(tick)}
            y2={$innerHeight}
            class="grid-line"
          />
        </slot>
      {/each}
    </g>
    <g
      class="horizontal"
      transform="translate(0, {($yScale?.bandwidth?.() ?? 0) / 2})"
    >
      {#each tickValues($yScale, $yTicks) as tick, i (+tick || tick)}
        <slot
          name="horizontal"
          x1={0}
          y1={$yScale(tick)}
          x2={$innerWidth}
          y2={$yScale(tick)}
          index={i}
        >
          <line
            x1={0}
            y1={$yScale(tick)}
            x2={$innerWidth}
            y2={$yScale(tick)}
            class="grid-line"
          />
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

  .grid-line {
    position: absolute;
    mix-blend-mode: darken;
    /* height: var(--line-width);
    width: 100%; */
    stroke: inherit;
    stroke-dasharray: inherit;
    stroke-width: inherit;
    stroke-dashoffset: inherit;
    stroke-linecap: inherit;
    stroke-opacity: inherit;
    stroke-miterlimit: inherit;
    stroke-linejoin: inherit;
    vector-effect: non-scaling-stroke;
    /* background-color: currentColor; */
    /* border: none; */
  }
  .vertical .grid-line {
    width: var(--line-width);
    height: 100%;
  }
</style>
