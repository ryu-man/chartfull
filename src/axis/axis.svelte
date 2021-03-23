<script>
  import { classNames } from '../../utils'

  export let id = {}
  export let position
  let _class
  export { _class as class }
</script>

<div class={classNames(_class, position, 'axis')}>
  <div class="inner-axis">
    <slot />
  </div>

  <slot name="label" />
</div>

<style>
  .axis {
    --border-width: 2px;
    position: absolute;
    
  }
  .x.axis {
    height: 2em;
    width: calc(100% + var(--border-width) * 2);
    left: calc(var(--border-width) * -1);
    padding-left: var(--border-width);
    padding-right: var(--border-width);
    box-sizing: border-box;
  }
  .y.axis {
    height: 100%;
    width: 2em;
  }
  .x.axis.top {
    padding-bottom: 0.7em;
    bottom: 100%;

    border-bottom: 2px;
    border-bottom-style: solid;
    border-bottom-color: currentColor;
  }
  .x.axis.bottom {
    padding-top: 0.7em;
    top: 100%;
    border-top-width: 2px;
    border-top-style: solid;
    border-top-color: currentColor;
  }
  .y.axis.left {
    padding-right: 0.7em;
    right: 100%;
    border-right-width: 2px;
    border-right-style: solid;
    border-right-color: currentColor;
  }
  .y.axis.right {
    padding-left: 0.7em;
    left: 100%;
    border-left-width: 2px;
    border-left-style: solid;
    border-left-color: currentColor;
  }
  .axis > .inner-axis {
    position: relative;
    width: inherit;
    height: inherit;
  }
  .axis :global(.label){
    position: absolute;
    white-space: nowrap;
  }
  .x.axis :global(.label) {
    right: 0;
  }
  .y.axis :global(.label) {
    left: 0;
    bottom: 101%;
  }

  .axis :global(.tick) {
    height: 26px;
    font-size: 1em;
    font-weight: 400;
    position: absolute;
    white-space: nowrap;
  }
  .x.axis :global(.tick) {
    transform: translateX(-50%);
  }
  .y.axis :global(.tick) {
    transform: translateY(-50%);
  }
  .x.axis.top :global(.tick) {
    bottom: 0;
  }
  .x.axis.bottom :global(.tick) {
    top: 0;
  }
  .y.axis.left :global(.tick) {
    right: 0;
  }
  .y.axis.right :global(.tick) {
    left: 0;
  }
</style>
