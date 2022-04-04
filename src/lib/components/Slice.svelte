<script>
  import Arc from './Arc.svelte'
  import Declare from './Declare.svelte'

  export let item

  export let innerRadius = 0
  export let outerRadius = 8
  export let cornerRadius
  export let context
  export let endAngle
  export let padAngle
  export let padRadius
  export let startAngle
</script>

<Arc
  {innerRadius}
  {outerRadius}
  {cornerRadius}
  {context}
  {endAngle}
  {padAngle}
  {padRadius}
  {startAngle}
  let:arc
>
  <Declare value={arc(item)} let:value={d}>
    <slot {item} {d}>
      <path {d} fill="black" />
    </slot>
  </Declare>
</Arc>

