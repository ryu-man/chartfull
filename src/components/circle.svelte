<script lang="ts">
  import { quadIn } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { css } from '../utils'
  import { charterContext } from '../context.svelte'

  const context = charterContext()
  $: ({ xScale, xAccessor, yScale, yAccessor } = $context)

  export let index = 0
  export let item = {}
  export let fill: string
  export let r = 8
  export let duration = 0
  export let delay = 0
  export let easing = quadIn
  export let style = {}

  let cx = tweened($xScale($xAccessor(item)), {
    delay: index * delay,
    duration,
    easing
  })
  let cy = tweened(
    $yScale($yAccessor(item), { delay: index * delay, duration, easing })
  )
</script>

<circle transition:fade={{ duration }} use:css={style} {r} cx={$cx} cy={$cy} />

<style>
  /* your styles go here */
</style>
