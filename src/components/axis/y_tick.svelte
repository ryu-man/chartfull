<script>
  import { cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { css } from '../../utils'

  export let y = 0
  export let tick
  export let formatter
  export let duration = 400
  export let delay = 0
  export let easing = cubicOut
  export let inTranstion = transition
  export let outTranstion = transition
  export let inParams = {}
  export let outParams = {}
  export let style = {}

  let pos = tweened(y, { duration, delay, easing })

  $: $pos = y

  function init(node, p) {
    css(node, style)
    node.style.position = 'absolute'
    node.style.whiteSpace = 'nowrap'
    node.style.top = `${p}%`
    node.style.left = '0'
    return {
      update(p) {
        node.style.top = `${p}%`
      }
    }
  }
  function transition(
    node,
    { delay = 0, duration = 30, easing = cubicOut, x = 0, y = 0, opacity = 0 }
  ) {
    return {
      delay: delay,
      duration: duration,
      easing: easing,
      css: (t, u) => {
        return `transform: translate(${x * u}px,${y * u}px);opacity: ${t};`
      }
    }
  }
</script>

<span
  use:init={$pos}
  in:inTranstion|local={inParams}
  out:outTranstion|local={outParams}
  class="tick">{formatter?.(tick)}</span
>

<style>
  .tick {
    font-size: 1em;
    font-weight: 400;
    transform: translateY(-50%);
  }
</style>
