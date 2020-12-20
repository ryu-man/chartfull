<script lang="ts">
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'
  import { css } from '../../utils'
  import { charterContext } from '../../context.svelte'

  export let x: number = 0
  export let y: number = 0
  export let width: number = 0
  export let height: number = 0
  export let unite = 'px'
  export let duration: number = 0
  export let delay: number = 0
  export let easing: any = cubicIn
  export let vertical = false
  export let style = {}
  let _class: string = ''

  /* const context = charterContext()
  const { xScale, yScale, innerWidth, innerHeight, xTicks,yTicks } = $context */

  const _x = tweened(x, { duration, delay, easing })
  const _y = tweened(y, { duration, delay, easing })

  $: $_x = x
  $: $_y = y

  export { _class as class }

  function left(node: HTMLElement, x: number) {
    node.style.left = x + unite

    return {
      update(x: number) {
        node.style.left = x + unite
      }
    }
  }
  function top(node: HTMLElement, y: number) {
    node.style.top = y + unite
    return {
      update(y: number) {
        node.style.top = y + unite
      }
    }
  }
</script>

{#if vertical}
  <!-- content here -->
  <line
    x1={$_x}
    y1={0}
    x2={$_x}
    y2={height}
    use:css={style}
    class="{_class} grid-line" />
{:else}
  <line
    x1={0}
    y1={$_y}
    x2={width}
    y2={$_y}
    use:css={style}
    class="{_class} grid-line" />
{/if}

<style>
  .grid-line {
    position: absolute;
    mix-blend-mode: darken;
    /* height: var(--line-width);
    width: 100%; */
    stroke: inherit;
    stroke-dasharray: inherit;
    stroke-width: inherit;
    stroke-dashoffset: inherit;
    stroke-linecap: inherit;
    stroke-opacity: inherit;
    stroke-miterlimit: inherit;
    stroke-linejoin: inherit;
    /* background-color: currentColor; */
    /* border: none; */
  }
  .grid-line.vertical {
    width: var(--line-width);
    height: 100%;
  }
</style>
