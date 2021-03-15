<script>
  import { backOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  export let cx = 0
  export let cy = 0
  export let r = 8

  export let defaultCX = 0
  export let defaultCY = 0
  export let defaultR = 0

  export let optionsCX = {
    duration: 0,
    delay: 0,
    easing: backOut
  }
  export let optionsCY = {
    duration: 0,
    delay: 0,
    easing: backOut
  }
  export let optionsR = {
    duration: 0,
    delay: 0,
    easing: backOut
  }

  const _cx = tweened(defaultCX, optionsCX)
  const _cy = tweened(defaultCY, optionsCY)
  const _r = tweened(defaultR, optionsR)

  $: $_cx = cx
  $: $_cy = cy
  $: $_r = r
</script>

<slot cx={$_cx} cy={$_cy} r={$_r}>
  <circle r={$_r} cx={$_cx} cy={$_cy} />
</slot>

<style>
  circle {
    vector-effect: non-scaling-stroke;
  }
</style>
