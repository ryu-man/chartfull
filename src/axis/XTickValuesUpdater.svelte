<script>
  import { graficoContext } from '../Context.svelte'

  const { xTickValues } = graficoContext()

  export let id
  export let tickValues

  // $: yTickValues[id] = tickValues
  $: $xTickValues = tickValues

</script>

<slot />
