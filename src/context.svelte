<script context="module" lang="ts">
  import { getContext, setContext } from 'svelte'
  
  export const key = {}

  export function updateChartistContext(context) {
    setContext(key, Object.assign(context, chartistContext()))
  }
  export function chartistContext<T = any>() {
    return getContext<T>(key)
  }
</script>

<script>
  setContext(key, {})
</script>
