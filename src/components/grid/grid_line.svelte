<script>
  import { css } from '../../utils'

  export let x1 = 0
  export let y1 = 0
  export let x2 = 0
  export let y2 = 0
  export let vertical = false
  export let style = {}
  let _class = ''


  export { _class as class }
</script>

{#if vertical}
  <!-- content here -->
  <line
    x1={x1}
    y1={0}
    x2={x2}
    y2={y2}
    use:css={style}
    class="{_class} grid-line"
  />
{:else}
  <line
    x1={0}
    y1={y1}
    x2={x2}
    y2={y2}
    use:css={style}
    class="{_class} grid-line"
  />
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
    vector-effect: non-scaling-stroke;
    /* background-color: currentColor; */
    /* border: none; */
  }
  .grid-line.vertical {
    width: var(--line-width);
    height: 100%;
  }
</style>
