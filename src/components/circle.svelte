<script>
  import { graficoContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = graficoContext()

  export let item = {}
  export let r = 8

  $: cx = $xScale($xAccessor(item))
  $: cy = $yScale($yAccessor(item))

</script>

<slot {cx} {cy}>
  <circle {r} {cx} {cy} />
</slot>

<style>
  circle {
    vector-effect: non-scaling-stroke;
    mix-blend-mode: multiply;
  }
</style>
