<script context="module">
  import { getContext } from 'svelte'

  export const Key = {}
  export const context = () => getContext(Key)
</script>

<script>
  import { classNames } from '../utils'

  export let x = 0
  export let y = 0
  export let scale
  export let tickArguments
  export let tickValues
  export let tickFormat

  let _class
  export { _class as class }

  const identity = (d) => d

  $: values =
    tickValues == null
      ? scale.ticks
        ? scale.ticks.apply(scale, tickArguments)
        : scale.domain()
      : tickValues

  $: format =
    tickFormat == null
      ? scale.tickFormat
        ? scale.tickFormat.apply(scale, tickArguments)
        : identity
      : tickFormat
</script>

<g class={classNames(_class, 'axis')} transform={`translate(${x}, ${y})`}>
  <slot {values} {format} />
</g>
