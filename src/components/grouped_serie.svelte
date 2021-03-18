<script>
  import { graficoContext } from '../context.svelte'
  import Rect from './rect.svelte'

  const {
    xAccessor,
    yAccessor,
    xScale,
    yScale,
    serieScale,
    serieColorScale,
    seriesData,
    innerHeight
  } = graficoContext()

  export let item

  function position(node, x) {
    node.style.transform = `rotateX(180deg) translate(${x}px, 0)`
  }
</script>

<g use:position={$xScale($xAccessor(item))} class={$xAccessor(item)}>
  {#each $seriesData.map((d) => ({ key: d, value: +item[d] })) as { key, value }}
    <slot color={$serieColorScale(key)}>
      <Rect
        x={$serieScale(key)}
        y={0}
        width={$serieScale.bandwidth()}
        height={$innerHeight - $yScale(value)}
        let:x
        let:y
        let:width
        let:height
      >
        <rect {x} {y} {width} {height} fill={$serieColorScale(key)} />
      </Rect>
    </slot>
  {/each}
</g>

<style>
  g {
    transform-origin: center;
  }
  g :global(rect *) {
    transform: rotateX(180deg);
    transform-origin: center;
  }
</style>
