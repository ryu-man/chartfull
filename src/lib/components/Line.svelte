<script>
  import { line as Line, curveLinear } from 'd3-shape'

  export let x = (d) => d
  export let y = (d) => d
  export let curve = curveLinear
  export let defined = true
  export let context

  export let data = []

  export let stroke
  export let strokeWidth
  export let strokeOpacity
  export let strokeLinecap
  export let strokeLinejoin
  export let strokeDasharray
  export let strokeDashoffset
  export let strokeMiterlimit
  export let fill = 'transparent'
  export let fillOpacity
  export let fillRule

  const root = Line()
  let line = root

  $: line = root.x(x)
  $: line = root.y(y)
  $: line = root.curve(curve)
  $: line = root.defined(defined)
  $: line = root.context(context)
</script>

<path
  d={line(data)}
  {fill}
  {stroke}
  stroke-width={strokeWidth}
  stroke-opacity={strokeOpacity}
  stroke-linecap={strokeLinecap}
  stroke-linejoin={strokeLinejoin}
  stroke-dasharray={strokeDasharray}
  stroke-dashoffset={strokeDashoffset}
  stroke-miterlimit={strokeMiterlimit}
  fill-opacity={fillOpacity}
  fill-rule={fillRule}
  on:click
  on:mouseenter
  on:mouseleave
/>
