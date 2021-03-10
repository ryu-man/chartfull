<script>
  import { graficoContext } from '../context.svelte'

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

<g class="grafico-grid">
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
</g>

<style>
  .grid-line {
    position: absolute;
    mix-blend-mode: darken;
    /* height: var(--line-width);
    width: 100%; */
    stroke: rgba(0, 0, 0, 0.1);
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
