<script>
  import { quadIn } from 'svelte/easing'
  import { css } from '../utils'
  import { chartistContext } from '../context.svelte'

  const { xScale, xAccessor, yScale, yAccessor } = chartistContext()

  export let index = 0
  export let cx
  export let cy
  export let fill
  export let r = 8
  export let duration = 0
  export let delay = 0
  export let easing = quadIn
  export let style = {}
</script>

<circle use:css={style} {r} {cx} {cy} />

<style>
  circle {
    vector-effect: non-scaling-stroke;
  }
</style>
