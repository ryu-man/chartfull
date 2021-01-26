<script lang="ts">
  import { quadIn } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { css } from '../utils'
  import { chartistContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = chartistContext()

  export let index = 0
  export let item = {}
  export let fill: string
  export let r = 8
  export let duration = 0
  export let delay = 0
  export let easing = quadIn
  export let style = {}

  $: cx = tweened($xScale($xAccessor(item)), {
    delay: index * delay,
    duration,
    easing
  })
  $: cy = tweened(
    $yScale($yAccessor(item), { delay: index * delay, duration, easing })
  )
</script>

<circle
  transition:fade={{ duration }}
  use:css={style}
  {r}
  cx={$cx}
  cy={$cy}
  {fill} />

<style>
  circle{
    vector-effect: non-scaling-stroke;
  }
</style>
