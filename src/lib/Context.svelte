<script context="module">
  import { getContext, setContext } from 'svelte'

  export const key = {}

  export const get = () => getContext(key) || {}
</script>

<script>
  export let value = {}

  setContext(key, value)
</script>

<slot />
