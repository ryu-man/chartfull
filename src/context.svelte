<script context="module">
  import { getContext, setContext } from 'svelte'
  
  export const key = {}

  export function updateGraficoContext(context) {
    setContext(key, Object.assign(context, graficoContext()))
  }
  export function graficoContext() {
    return getContext(key)
  }
</script>

<script>
  setContext(key, {})
</script>
