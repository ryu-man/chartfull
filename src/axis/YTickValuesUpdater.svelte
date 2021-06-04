<script>
  import { graficoContext } from '../Context.svelte'

  const { yTickValues } = graficoContext()

  export let id
  export let tickValues

  // $: yTickValues[id] = tickValues
  $: $yTickValues = tickValues
</script>

<slot />
