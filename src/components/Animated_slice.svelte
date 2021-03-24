<script>
  import { fade } from 'svelte/transition'
  import { tweened } from 'svelte/motion'
  import { interpolate as interpolator } from 'd3'
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

  const points = (item) => {
    const a = innerArc.centroid(item) // line insertion in the slice
    const b = outerArc.centroid(item) // line break: we use the other arc generator that has been built only for that
    const c = outerArc.centroid(item) // Label position = almost the same as posB
    const midangle = item.startAngle + (item.endAngle - item.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
    c[0] = radius * (Math.round(midangle) < Math.PI ? 1 : -1) // multiply by 1 or -1 to put it on the right or on the left
    return [a, b, c]
  }
  const textTranform = (item) => {
    var pos = outerArc.centroid(item)
    var midangle = item.startAngle + (item.endAngle - item.startAngle) / 2
    pos[0] = radius * 1.1 * (Math.round(midangle) < Math.PI ? 1 : -1)
    return `translate(${pos})`
  }
  const textAnchor = (item) => {
    var midangle = item.startAngle + (item.endAngle - item.startAngle) / 2
    return midangle < Math.PI ? 'start' : 'end'
  }

  let path
  let pathTween = tweened(innerArc(item), {
    duration,
    interpolate: (_a, _b) => {
      const i = interpolator(path || item, item)
      path = i(0)
      return (t) => innerArc(i(t))
    }
  })
  let text
  let textTween = tweened(textTranform(item), {
    duration,
    interpolate: (a, b) => {
      const i = interpolator(text || item, item)
      text = i(0)
      return (t) => textTranform(i(t))
    }
  })
  let line
  let lineTween = tweened(points(item), {
    duration,
    interpolate: (a, b) => {
      const i = interpolator(line || item, item)
      line = i(0)
      return (t) => points(i(t))
    }
  })

  $: {
    pathTween.set(innerArc(item))
    /* textTween.set(textTranform(item))
    lineTween.set(points(item)) */
  }
</script>

<g class:active in:fade={{ delay: index * 54 }} out:fade>
  <slot {item}>
    <path
      d={$pathTween}
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
