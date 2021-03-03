<script>
  import { tick } from 'svelte'
  import Context, { graficoContext } from './context.svelte'
  import { writable } from 'svelte/store'
  import { getInnerSize } from './utils'
  import Pie from './components/pie.svelte'

  // set the dimensions and margins of the graph
  export let width = 300
  export let height = width
  export let padding = {}
  export let data = []
  export let key = (d) => d.key
  export let value = (d) => d.value
  export let style

  console.log(width)

  padding = { top: 32, right: 32, bottom: 72, left: 72, ...padding }
  const innerSize = getInnerSize({ width, height }, padding)
  export let radius = innerSize.innerWidth / 2

  const {
    width: _width = writable(width),
    height: _height = writable(height),
    innerWidth: _innerWidth = writable(innerSize.innerWidth),
    innerHeight: _innerHeight = writable(innerSize.innerHeight),
    /* radius: _radius = writable(radius),
    innerRadius: _innerRadius = writable(innerRadius), */
    data: _data = writable(data),
    ...rest
  } = graficoContext()

  const context = {
    width: _width,
    height: _height,
    innerWidth: _innerWidth,
    innerHeight: _innerHeight,
    // radius: _radius,
    // innerRadius: _innerRadius,
    data: _data,
    key,
    value,
    ...rest
  }

  function init(node, data) {
    $_width = node.offsetWidth

    return {
      update(data) {
        $_data = data
      }
    }
  }
</script>

<Context value={context}>
  <figure
    use:init={data}
    class="pie grafico"
    style={`width:${$_width}px;height:${$_height}px;`}
  >
    <svg viewBox={`0 0 ${$_width} ${$_height}`} preserveAspectRatio="none">
      {#await tick() then value}
        <slot>
          <Pie />
        </slot>
      {/await}
    </svg>
    <slot name="title" />
  </figure>
</Context>

<style>
  .grafico {
    width: auto;
    min-width: 300px;
    height: auto;
    min-height: 300px;
    position: relative;
  }
  path.arc {
    stroke-linejoin: bevel;
  }
  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }
  svg :global(*) {
    vector-effect: non-scaling-stroke;
  }
</style>
