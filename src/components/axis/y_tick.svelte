<script lang="ts">
  import { cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { css } from '../../utils'

  export let y = 0
  export let tick: any
  export let formatter:(value: any)=>string
  export let duration: number = 400
  export let inTranstion = transition
  export let outTranstion = transition
  export let inParams: {
    duration?: number
    delay?: number
    easing?: (t: number) => number
    x?: number
    y?: number
  } = {
    duration: 400,
    delay: 0,
    x: 0,
    y: 0
  }
  export let outParams: {
    duration?: number
    delay?: number
    easing?: (t: number) => number
    x?: number
    y?: number
  } = {
    duration: 200,
    delay: 0,
    x: 0,
    y: 0
  }
  export let style = {}

  let pos = tweened(y, { duration, easing: cubicOut })

  $: $pos = y

  function init(node: HTMLElement, p: number) {
    css(node, style)
    node.style.position = 'absolute'
    node.style.whiteSpace = 'nowrap'
    node.style.top = `calc(${p}% - ${node.offsetHeight / 2}px)`
    node.style.left = '0'
    return {
      update(p: number) {
        node.style.top = `calc(${p}% - ${node.offsetHeight / 2}px)`
      }
    }
  }
  function transition(
    node: HTMLElement,
    {
      delay = 0,
      duration = 30,
      easing = cubicOut,
      x = 0,
      y = 0,
      opacity = 0
    }: TransitionParams
  ) {
    return {
      delay: delay,
      duration: duration,
      easing: easing,
      css: (t: number, u: number) => {
        return `transform: translate(${x * u}px,${y * u}px);opacity: ${t};`
      }
    }
  }
  interface TransitionParams {
    delay?: number
    duration?: number
    easing?: (t: number) => number
    x?: number
    y?: number
    opacity?: number
  }
</script>

<span
  use:init="{$pos}"
  in:inTranstion="{inParams}"
  out:outTranstion="{outParams}"
  class="tick"
  
>{formatter(tick)}</span>

<style>
  span{
    font-size: 1em;
    font-weight: 400;
  }
</style>
