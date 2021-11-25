<script context="module">
  const key = Symbol()
  export const get = () => getContext(key)
</script>

<script>
  import { getContext, setContext, tick } from 'svelte'
  export let value

  setContext(key, value)
</script>

{#await tick() then value}
  <slot />
{/await}
