<script>
  export let x = 0
  export let y = 0
  export let width = 0
  export let height = 0
  export let r = 0

  const radius = (r + '').split(' ').map((d) => +d)
  let [rtl = 0, rtr = rtl, rbr = rtr, rbl = rtl] = radius

  export let stroke
  export let strokeWidth
  export let strokeOpacity
  export let strokeLinecap
  export let strokeLinejoin
  export let strokeDasharray
  export let strokeDashoffset
  export let strokeMiterlimit
  export let fill
  export let fillOpacity
  export let fillRule
</script>

<path
  d="M{x + rtl},{y}
     h{width - (rtl + rtr)}
     q{rtr},0 {rtr},{rtr}
     v{height - (rtr + rbr)}
     q0,{rbr} -{rbr},{rbr}
     h-{width - (rbr + rbl)}
     q-{rbl},0 -{rbl},-{rbl}
     v-{height - (rbl + rtl)}
     q0,-{rtl} {rtl},-{rtl}
     z"
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

<style>
  path {
    vector-effect: non-scaling-stroke;
  }
</style>
