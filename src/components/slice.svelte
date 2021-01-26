<script lang="ts">
  import { fade } from 'svelte/transition'
  import { chartistContext } from '../context.svelte'
  import type { ScaleOrdinal, PieArcDatum } from 'd3'

  export let index: number = 0
  export let item: PieArcDatum<any>
  export let color: ScaleOrdinal<string, string> //(d: string) => string
  export let duration: number = 300

  let active: boolean = false

  const context = chartistContext()
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
  let d= innerArc(item)

  $: d = innerArc(item)
</script>

<g class:active in:fade={{ delay: index * 54 }} out:fade>
  <slot {item}>
    <path
      d={d}
      fill={color(label(item.data))}
      on:click={() => (active = !active)} />
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
