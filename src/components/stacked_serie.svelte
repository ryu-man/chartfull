<script>
  import { graficoContext } from '../context.svelte'
  import Rect from './rect.svelte'

  // serie
  export let item
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
</script>

<g fill={$serieColorScale(item.key)}>
  {#each item as stack}
    <slot>
      <Rect
        x={$xScale($xAccessor(stack.data))}
        y={$yScale(stack[1])}
        width={$xScale.bandwidth()}
        height={$yScale(stack[0]) - $yScale(stack[1])}
        let:x
        let:y
        let:width
        let:height
      >
        <rect {x} {y} {width} {height} />
      </Rect>
    </slot>
  {/each}
</g>

<style>
</style>
