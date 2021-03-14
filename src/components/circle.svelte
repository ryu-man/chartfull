<script>
  import { backOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'

  export let cx = 0
  export let cy = 0
  export let defaultCX = 0
  export let defaultCY = 0

  export let durationCX = 0
  export let delayCX = 0
  export let easingCX = backOut
  export let interpolateCX

  export let durationCY = 0
  export let delayCY = 0
  export let easingCY = backOut
  export let interpolateCY

  const _cx = tweened(defaultCX, {
    duration: durationCX,
    delay: delayCX,
    easing: easingCX,
    interpolate: interpolateCX
  })

  const _cy = tweened(defaultCY, {
    duration: durationCY,
    delay: delayCY,
    easing: easingCY,
    interpolate: interpolateCY
  })

  $: $_cx = cx
  $: $_cy = cy
</script>

<slot cx={$_cx} cy={$_cy}>
  <circle r={8} cx={$_cx} cy={$_cy} />
</slot>

<style>
  circle {
    vector-effect: non-scaling-stroke;
  }
</style>
