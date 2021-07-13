<script>
  import { graficoContext } from '../Grafico.svelte'

  const { scales, accessors } = graficoContext()

  export let xId = 'x'
  export let yId = 'y'
  export let x = $accessors[xId]
  export let y = $accessors[yId]

  $accessors[xId] = x
  $accessors[yId] = y

  export let xScale
  export let yScale

  let isXInteriour = !xScale
  let isYInteriour = !yScale

  $: isXInteriour && (xScale = $scales[xId])
  $: isYInteriour && (yScale = $scales[yId])
</script>

<slot
  xGet={(d, ...args) => xScale(typeof d === 'object' ? x(d, ...args) : d)}
  yGet={(d, ...args) => yScale(typeof d === 'object' ? y(d, ...args) : d)}
  xBandwidth={xScale?.bandwidth?.()}
  yBandwidth={yScale?.bandwidth?.()}
  xStep={xScale?.step?.()}
  yStep={yScale?.step?.()}
  {xScale}
  {yScale}
/>
