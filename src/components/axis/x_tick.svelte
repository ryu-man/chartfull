<script>
  import { cubicOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { css } from '../../utils'
  import { easeBack } from 'd3'

  export let x = 0
  export let tick
  export let formatter
  export let duration = 0
  export let inTranstion = () => {}
  export let outTranstion = () => {}
  export let inParams = {}
  export let outParams = {}
  export let style = {}

  let pos = tweened(x, {
    duration,
    easing: cubicOut
  })

  $: $pos = x

  function init(node, p) {
    css(node, style)
    node.style.position = 'absolute'
    node.style.whiteSpace = 'nowrap'
    node.style.left = `${p}%`
    return {
      update(p) {
        node.style.left = `${p}%`
      }
    }
  }
  function transition(
    node,
    { delay = 0, duration = 30, easing = easeBack, x = 0, y = 0, opacity = 0 }
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
  class="tick">{formatter(tick)}</span
>

<style>
  .tick {
    font-size: 1em;
    font-weight: 400;
    transform: translateX(-50%);
  }
</style>
