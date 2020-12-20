<script lang="ts">
  import { css } from '../utils'
  import { charterContext } from '../context.svelte'

  export let item: any
  export let style = {}

  const {xScale, xAccessor, yScale, yAccessor, innerHeight} = charterContext()

  let x: number = 0
  let y: number = 0
  let width: number = 0
  let height: number = 0

  $: x = $xScale($xAccessor(item)) 
  $: y = $yScale($yAccessor(item))
  $: width = $xScale.bandwidth()
  $: height =  $innerHeight - $yScale($yAccessor(item))
</script>



<rect use:css={style} {x} {y} {width} {height} />
<style>
  rect {
    fill: #000;
    fill-opacity: 0.7;
    vector-effect: non-scaling-stroke;
  }
</style>
