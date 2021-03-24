<script>
  import { tweened } from 'svelte/motion'

  export let cx = 0
  export let cy = 0
  export let r = 0

  export let defaultCX = 0
  export let defaultCY = 0
  export let defaultR = 0

  export let optionsCX
  optionsCX = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsCX
  }

  export let optionsCY
  optionsCY = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsCY
  }

  export let optionsR
  optionsR = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsR
  }

  const _cx = tweened(defaultCX, optionsCX)
  const _cy = tweened(defaultCY, optionsCY)
  const _r = tweened(defaultR, optionsR)

  $: $_cx = cx
  $: $_cy = cy
  $: $_r = r
</script>

<slot cx={$_cx} cy={$_cy} r={$_r} />

<style>
  circle {
    vector-effect: non-scaling-stroke;
  }
</style>
