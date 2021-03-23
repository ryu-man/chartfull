<script>
  import {css, classNames} from '../utils'
  let _class
  export { _class as class }
  export let style
</script>

<span use:css={style} class="{classNames(_class, 'label')}">
  <slot />
</span>
