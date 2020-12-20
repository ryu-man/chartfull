<script lang="ts">
  import { cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { css } from '../../utils'
  import { easeBack } from 'd3'

  export let x = 0
  export let tick: any
  export let formatter
  export let duration: number = 0
  export let inTranstion: (
    node: Element,
    { delay, duration, easing, x, y, opacity }: Partial<any>
  ) => Partial<any> = transition
  export let outTranstion = transition
  export let inParams: {
    duration?: number
    delay?: number
    easing?: (t: number) => number
    x?: number
    y?: number
  } & Partial<any> = {
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

  let pos = tweened(x, {
    duration,
    easing: cubicOut
  })

  $: $pos = x

  function init(node: HTMLElement, p: number) {
    css(node, style)
    node.style.position = 'absolute'
    node.style.whiteSpace = 'nowrap'
    node.style.left = `calc(${p}% - ${node.offsetWidth / 2}px)`
    return {
      update(p: number) {
        node.style.left = `calc(${p}% - ${node.offsetWidth / 2}px)`
      }
    }
  }
  function transition(
    node: HTMLElement,
    {
      delay = 0,
      duration = 30,
      easing = easeBack,
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
