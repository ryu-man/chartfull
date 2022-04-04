<script>
  import { csv } from 'd3'
  import { tick } from 'svelte'

  export let url
  export let converter
  export let onLoad = () => {}

  const res = csv(url, converter).then((data) => {
    onLoad(data)
    return data
  })
</script>

{#await res then data}
  {#await tick() then value}
    <slot {data} />
  {/await}
{/await}
