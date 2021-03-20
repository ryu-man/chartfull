<script>
  import { stack as Stack } from 'd3-shape'
  export let data
  export let keys = []
  export let offset
  export let order
  export let value = []
  const stack = Stack().keys(keys).offset(offset).order(order).value(value)

  $: _ = stack(data)
</script>

<slot data={_} />
