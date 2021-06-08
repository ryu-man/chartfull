<script context="module">
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  export const Key = {}
  export const context = () => getContext(Key)

</script>

<script>
  import { classNames } from '../utils'

  export let x = 0
  export let y = 0
  export let scale
  export let orient = 'top'
  export let tickArguments
  export let tickValues
  export let tickFormat
  export let tickSize = 6
  export let tickPadding = 3
  export let offset =
    typeof window !== 'undefined' && window.devicePixelRatio > 1 ? 0 : 0.5

  let _class
  export { _class as class }

  setContext(Key, writable({ orient, tickSize, tickPadding, offset }))

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
