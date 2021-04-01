<script>
  import { arc as Arc } from 'd3-shape'

  export let innerRadius = 0
  export let outerRadius = 8
  export let cornerRadius
  export let context
  export let endAngle
  export let padAngle
  export let padRadius
  export let startAngle

  let arc = Arc().innerRadius(innerRadius).outerRadius(outerRadius)

  cornerRadius && arc.cornerRadius(cornerRadius)
  context && arc.context(context)
  endAngle && arc.endAngle(endAngle)
  padAngle && arc.padAngle(padAngle)
  padRadius && arc.padRadius(padRadius)
  startAngle && arc.startAngle(startAngle)
</script>

<slot {arc} centroid={arc.centroid} toString={arc.toString} />
