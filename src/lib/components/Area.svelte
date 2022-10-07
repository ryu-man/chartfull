<script>
  import { area as Area } from 'd3-shape'

  export let x
  export let y0 = 0
  export let y1

  export let x0
  export let x1
  export let y
  export let curve

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

  const root = Area()
  let area = root

  $: area = root.x(x)
  $: area = root.y0(y0)
  $: area = root.y1(y1)

  $: x0 && (area = root.x0(x0))
  $: x1 && (area = root.x1(x1))
  $: y && (area = root.y(y))
  $: curve && (area = root.curve(curve))
</script>

<slot />
<path
  d={area(data)}
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
