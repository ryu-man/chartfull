<script>
  import { css } from '../../utils'

  export let color: string
</script>

<div class="legend-item">
  <span use:css="{{ backgroundColor: color }}" class="dot"></span>
  <span class="key">
    <slot />
  </span>
</div>

<style>
  .legend-item {
    display: flex;
  }
  .legend-item .dot {
    width: 1vw;
    height: 1vw;
    border-radius: 2px;
  }
  .legend-item .key {
    margin-left: 1vw;
  }
</style>
