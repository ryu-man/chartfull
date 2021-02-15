<script>
  import { tweened } from 'svelte/motion'
  import { backIn } from 'svelte/easing'
  import { curveMonotoneX, line } from 'd3'
  import { css } from '../utils/css'
  import { interpolatePath } from '../../node_modules/d3-interpolate-path/index'

  export let data
  export let x
  export let y
  export let curve = curveMonotoneX
  export let style = {}
  let _class = ''
  export { _class as class }

  let _line = line() // Creating the line
    .x(x)
    .y(y)
    .curve(curve)
  let path = tweened(_line(data), {
    duration: 300,
    interpolate: interpolatePath
  })

  function init(node, data) {
    css(node, style)

    return {
      update(data) {
        $path = _line(data)
      }
    }
  }
</script>

<path
  use:init={data}
  d={$path}
  class="{_class} line-data"
  fill="transparent"
  stroke="black"
  stroke-width="2px"
/>

<style>
  path {
    stroke-linecap: round;
    stroke-linejoin: round;
    pointer-events: none;
    vector-effect: non-scaling-stroke;
    mix-blend-mode: multiply;
  }
</style>
