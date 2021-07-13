<script>
    import { graficoContext } from '../Grafico.svelte'
  
    const { scales, accessors } = graficoContext()
  
    export let xId = 'x'
    export let yId = 'y'
    export let x = $accessors[xId]
    export let y = $accessors[yId]
  
    $accessors[xId] = x
    $accessors[yId] = y
  
    export let xScale = $scales[xId]
    export let yScale = $scales[yId]
  
    $: bandwidth = xScale?.bandwidth?.() || yScale?.bandwidth?.() || 0
    $: step = xScale?.step?.() || yScale?.step?.() || 0
  </script>
  
  <slot
    xGet={(d, ...args) => xScale(typeof d === 'object' ? x(d, ...args) : d)}
    yGet={(d, ...args) => yScale(typeof d === 'object' ? y(d, ...args) : d)}
    {bandwidth}
    {step}
    {xScale}
    {yScale}
  />
  