<script>
  import { graficoContext } from '../Context.svelte'

  export let item
  export let label
  export let value

  const context = graficoContext()
  const {
    innerArc,
    outerArc,
    innerRadius,
    radius,
    colorScale,
    width,
    height
  } = $context

  let path
  let d = innerArc(item)

  $: d = innerArc(item)
</script>

<slot {item}>
  <path {d} fill="black" />
</slot>

<style>
  path {
    /* mix-blend-mode: lighten; */
    stroke: #ffffff;
    stroke-width: 4px;
    stroke-linejoin: round;
    transition: stroke-width 0.3s;
  }
</style>
