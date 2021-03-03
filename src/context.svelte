<script context="module">
  import { getContext, setContext } from 'svelte'

  export const key = {}

  export function updateGraficoContext(context) {
    setContext(key, Object.assign(context, graficoContext()))
  }
  export function graficoContext() {
    return getContext(key) || {}
  }
</script>

<script>
  export let value = {}
  
  setContext(key, value)
</script>

<slot />
