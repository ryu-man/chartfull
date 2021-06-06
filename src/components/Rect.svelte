<script>
  import { tweened } from 'svelte/motion'

  export let x = 0
  export let y = 0
  export let width = 0
  export let height = 0
  
  export let defaultX = 0
  export let defaultY = 0
  export let defaultWidth = 0
  export let defaultHeight = 0

  export let optionsX
  optionsX = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsX
  }

  export let optionsY
  optionsY = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsY
  }

  export let optionsWidth
  optionsWidth = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsWidth
  }

  export let optionsHeight
  optionsHeight = {
    ...{
      duration: 0,
      delay: 0
    },
    ...optionsHeight
  }

  const _x = tweened(defaultX, optionsX)
  const _y = tweened(defaultY, optionsY)
  const _width = tweened(defaultWidth, optionsWidth)
  const _height = tweened(defaultHeight, optionsHeight)

  $: $_x = x
  $: $_y = y
  $: $_width = width
  $: $_height = height
</script>

<slot x={$_x} y={$_y} width={$_width} height={$_height}>
  <rect x={$_x} y={$_y} width={$_width} height={$_height} />
</slot>

<style>
  rect {
    fill-opacity: 0.7;
    vector-effect: non-scaling-stroke;
  }
</style>
