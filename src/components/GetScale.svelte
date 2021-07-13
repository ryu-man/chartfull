<script>
  import { graficoContext } from '../Grafico.svelte'

  const { scales } = graficoContext()

  export let id

  $: scale = Array.isArray(id) ? id.map((i) => $scales[i]) : $scales[id]
</script>

<slot {scale} />
