<script>
  import { quadIn } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { graficoContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = graficoContext()

  export let item = {}
  export let duration = 0
  export let delay = 0
  export let easing = quadIn
  export let interpolate

  $: cx = tweened($xScale($xAccessor(item)), {
    delay: delay,
    duration,
    easing,
    interpolate
  })
  $: cy = tweened(
    $yScale($yAccessor(item), {
      delay: delay,
      duration,
      easing,
      interpolate
    })
  )
</script>

<slot cx={$cx} cy={$cy}>
  <circle r={8} cx={$cx} cy={$cy} />
</slot>

<style>
  circle {
    vector-effect: non-scaling-stroke;
  }
</style>
