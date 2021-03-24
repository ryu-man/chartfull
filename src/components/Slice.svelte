<script>
  import { fade } from 'svelte/transition'
  import { graficoContext } from '../Context.svelte'

  export let index = 0
  export let item
  export let color //(d: string) => string
  export let duration = 300

  let active = false

  const context = graficoContext()
  const {
    innerArc,
    outerArc,
    innerRadius,
    radius,
    colorScale,
    width,
    height,
    label,
    value
  } = $context

  let path
  let d = innerArc(item)

  $: d = innerArc(item)
</script>

<g class:active in:fade={{ delay: index * 54 }} out:fade>
  <slot {item}>
    <path
      {d}
      fill={color(label(item.data))}
      on:click={() => (active = !active)}
    />
  </slot>
</g>

<style>
  g > path {
    /* mix-blend-mode: lighten; */
    stroke-linejoin: round;
    transition: stroke-width 0.3s;
  }
  g.active > path {
    stroke: #ffffff;
    stroke-width: 4px;
  }
  g {
    transition: transform 0.3s;
  }
  g.active {
    transform: scale(1.1);
  }
</style>
