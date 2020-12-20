<script context="module" lang="ts">
  import { getContext, setContext } from 'svelte'
  import { writable } from 'svelte/store'

  declare type CharterContext = {
    xScale: any
    yScale: any
    xAccessor: any
    yAccessor: any
    colorScale: any
    width: number
    height: number
    innerWidth: number
    innerHeight: number
    ticks: [number, number]
    margin
  }
  export const key = {}

  

  const context = writable({})

  export function _charterContext<T = any>() {
    return getContext<T>(key)
  }
  export function charterContext<T = any>() {
    return getContext<T>(key)
  }

  export function add(key, value) {
    const _newContext = charterContext()()
    _newContext[key] = value
    console.log(_newContext)
    setContext(key, _newContext)
  }
</script>
