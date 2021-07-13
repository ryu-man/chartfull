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

  const root = Arc()
  let arc = root

  $: arc = root.innerRadius(innerRadius)
  $: arc = root.outerRadius(outerRadius)
  $: cornerRadius && (arc = root.cornerRadius(cornerRadius))
  $: context && (arc = root.context(context))
  $: endAngle && (arc = root.endAngle(endAngle))
  $: padAngle && (arc = root.padAngle(padAngle))
  $: padRadius && (arc = root.padRadius(padRadius))
  $: startAngle && (arc = root.startAngle(startAngle))
</script>

<slot {arc} />
