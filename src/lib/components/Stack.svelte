<script>
  import { stack as Stack } from 'd3'

  export let keys = []
  export let offset
  export let order
  export let value

  const stack = Stack()

  $: stack.keys(keys)
  $: offset && stack.offset(offset)
  $: order && stack.order(order)
  $: value && stack.value(value)
</script>

<slot {stack}/>
