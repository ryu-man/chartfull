<script>
  import { cubicIn } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { css } from '../utils'

  import { easeBackIn } from 'd3'
  import { graficoContext } from '../context.svelte'

  /* type EasingFunction = (t: number) => number
  interface TransitionParams {
    delay?: number
    duration?: number
    easing?: EasingFunction
  }
  interface TransitionConfig {
    delay?: number
    duration?: number
    easing?: EasingFunction
    css?: (t: number, u: number) => string
    tick?: (t: number, u: number) => void
  } */

  /* export let width: number
  export let height: number
  export let x: number
  export let y: number */
  const { xScale, yScale, innerHeight } = graficoContext()

  export let x
  export let width
  export let y
  export let height
  export let fill = 'black'
  export let style = {}

  // console.log(xScale(x1))
  // console.log(x1, x2, y1, y2)

  /* $: x = $xScale(x1)
  $: y = $yScale(y1)
  $: width = Math.abs($xScale(x2) - $xScale(x1))
  $: height = Math.abs($yScale(y2) - $yScale(y1)) */
  // $:console.log(x,y,width,height)
</script>

<rect use:css={style} {x} {y} {width} {height} {fill} />

<style>
  rect {
    fill-opacity: 0.7;
    vector-effect: non-scaling-stroke;
  }
</style>
