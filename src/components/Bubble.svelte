<script>
  import { graficoContext } from '../Grafico.svelte'
  import { ScaleLinear } from '../scales'
  const { scales, accessors } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'
  export let x = $accessors[xId]
  export let y = $accessors[yId]

  $accessors[xId] = x
  $accessors[yId] = y

  export let domain = [0, 1]
  export let range = [0, 1]
  export let rangeRound
  export let clamp = false
  export let interpolator
  export let nice
  export let unknown

  const xScale = $scales[xId]
  const yScale = $scales[yId]
</script>

<ScaleLinear
  {domain}
  {range}
  {rangeRound}
  {clamp}
  {interpolator}
  {nice}
  {unknown}
  let:scale={zScale}
>
  <slot
    xGet={(d) => $xScale(x(d))}
    yGet={(d) => $yScale(y(d))}
    zGet={(d) => zScale(d)}
  />
</ScaleLinear>
