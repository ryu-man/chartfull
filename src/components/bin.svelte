<script>
  import { bin as Bin } from 'd3-array'

  export let data = []
  export let domain = []
  export let value
  export let thresholds

  const bin = Bin()

  $: domain && bin.domain(domain)
  $: value && bin.value(value)
  $: thresholds && bin.thresholds(thresholds)
</script>

<slot data={bin(data)} />
