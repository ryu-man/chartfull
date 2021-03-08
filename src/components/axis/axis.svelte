<script context="module">
</script>

<script>
  import { tick } from 'svelte'

  export let position = 'bottom'
  let _class = ''
  export { _class as class }
</script>

<div class="{_class + ' '}{position + ' '} axis">
  <div class="inner-axis">
    <slot />
  </div>

  <slot name="label" />
</div>

<style>
  .axis {
    position: absolute;
  }
  .x.axis {
    height: 2em;
    width: 100%;
  }
  .x.axis.mirror {
    width: 2em;
    height: 100%;
  }
  .y.axis {
    height: 100%;
    width: 2em;
  }
  .y.axis.mirror {
    width: 100%;
    height: 2em;
  }
  .axis.top {
    padding-bottom: 0.7em;
    bottom: 100%;
  }
  .axis.bottom {
    padding-top: 0.7em;
    top: 100%;
  }
  .axis.left {
    padding-right: 0.7em;
    right: 100%;
  }
  .axis.right {
    padding-left: 0.7em;
    left: 100%;
  }
  .axis > .inner-axis {
    position: relative;
    width: inherit;
    height: inherit;
  }
  .x.axis :global(.label) {
    position: absolute;
    right: 0;
  }
  .y.axis :global(.label) {
    position: absolute;
    left: 0;
    bottom: 101%;
  }

  .axis :global(.tick) {
    font-size: 1em;
    font-weight: 400;
  }
  .x.axis :global(.tick) {
    transform: translateX(-50%);
  }
  .y.axis :global(.tick) {
    transform: translateY(-50%);
  }
</style>
