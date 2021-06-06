<script>
  import { pie } from 'd3-shape'
  import Context, { graficoContext } from '../Context.svelte'

  let context = {}
  const {
    innerWidthStore,
    innerHeightStore
  } = (context = graficoContext())

  export let data = []
  export let value = (d) => d.value
  export let startAngle
  export let endAngle
  export let padAngle
  export let sort
  export let sortValues

  context.value = value

  const pies = pie().value(value)
  startAngle && pies.startAngle(startAngle)
  endAngle && pies.endAngle(endAngle)
  padAngle && pies.padAngle(padAngle)
  sort && pies.sort(sort)
  sortValues && pies.sortValues(sortValues)
</script>

<Context value={context}>
  <g
    transform={`translate(${($innerWidthStore || 0) / 2},${
      ($innerHeightStore || 0) / 2
    })`}
  >
    <slot data={pies(data)} {value} />
  </g>
</Context>
