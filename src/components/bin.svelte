<script>
  import { css } from '../utils'
  import { chartistContext } from '../context.svelte'

  export let item
  export let style = {}

  const {
    xScale,
    xAccessor,
    yScale,
    yAccessor,
    innerHeight
  } = chartistContext()

  let x = 0
  let y = 0
  let width = 0
  let height = 0

  $: x = $xScale(xAccessor(item))
  $: y = $yScale(yAccessor(item))
  $: width = $xScale.bandwidth()
  $: height = $innerHeight - $yScale(yAccessor(item))
</script>

<rect use:css={style} {x} {y} {width} {height} />

<style>
  rect {
    fill: #000;
    fill-opacity: 0.7;
    vector-effect: non-scaling-stroke;
  }
</style>
