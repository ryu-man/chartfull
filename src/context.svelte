<script context="module">
  import { getContext, setContext } from 'svelte'
  
  export const key = {}

  export function updateChartistContext(context) {
    setContext(key, Object.assign(context, chartistContext()))
  }
  export function chartistContext() {
    return getContext(key)
  }
</script>

<script>
  setContext(key, {})
</script>
