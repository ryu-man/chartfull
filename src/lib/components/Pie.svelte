<script>
  import { pie as Pie } from 'd3-shape'

  export let data = []
  export let value = (d) => d.value
  export let startAngle
  export let endAngle
  export let padAngle
  export let sort
  export let sortValues

  const root = Pie().value(value)
  let pie = root

  $: startAngle && (pie = root.startAngle(startAngle))
  $: endAngle && (pie = root.endAngle(endAngle))
  $: padAngle && (pie = root.padAngle(padAngle))
  $: sort && (pie = root.sort(sort))
  $: sortValues && (pie = root.sortValues(sortValues))
</script>

<slot data={pie(data)} {value} />

