<script>
  import { graficoContext } from '../context.svelte'

  const { xScale, yScale } = graficoContext()

  export let x1
  export let y1
  export let x2 = 0
  export let y2 = 0

  $: _x1 = $xScale(x1) || 0
  $: _y1 = $yScale(y1) || 0
  $: _x2 = $xScale(x2) || 0
  $: _y2 = $yScale(y2) || 0

</script>

<slot
  x={Math.min(_x1, _x2)}
  y={Math.min(_y1, _y2)}
  width={$xScale?.bandwidth?.() ?? Math.abs(_x2 - _x1)}
  height={Math.abs(_y2 - _y1)}
>
  <rect
    x={Math.min(_x1, _x2)}
    y={Math.min(_y1, _y2)}
    width={$xScale?.bandwidth?.() ?? Math.abs(_x2 - _x1)}
    height={Math.abs(_y2 - _y1)}
  />
</slot>

<style>
  rect {
    fill-opacity: 0.7;
    vector-effect: non-scaling-stroke;
  }
</style>
