<script lang="ts">
  import { cubicIn } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { css } from '../utils'

  import { easeBackIn } from 'd3'
  import { charterContext } from '../context.svelte'

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

  export let x1: number
  export let x2: number
  export let y1: number
  export let y2: number

  export let style = {}
  
  const { xScale, yScale } = charterContext()()
  
  console.log(xScale(x1))
  // console.log(x1, x2, y1, y2)

  $: x = $xScale(x1)
  $: y = $yScale(y1)
  $: width = Math.abs($xScale(x2) - $xScale(x1))
  $: height = Math.abs($yScale(y2) - $yScale(y1))
  // $:console.log(x,y,width,height)
</script>

<rect
  use:css="{style}"
  x="{x}"
  y="{y}"
  width="{width}"
  height="{height}"
></rect>

<style>
  rect {
    fill: #000;
    fill-opacity: 0.7;
    vector-effect: non-scaling-stroke;
  }
</style>
