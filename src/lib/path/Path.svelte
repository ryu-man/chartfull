<script>
  import Path from './path'

  const path = Path()

  // command, x, y
  /**
   * @type {Array<[string, ...number[]]>}
   */
  let array = path()

  export function moveTo(x, y) {
    array = path.moveTo(+x, +y)
  }
  export function closePath() {
    array = path.closePath()
  }
  export function lineTo(x, y) {
    array = path.lineTo(+x, +y)
  }
  export function quadraticCurveTo(x1, y1, x, y) {
    array = path.quadraticCurveTo(+x1, +y1, +x, +y)
  }
  export function bezierCurveTo(x1, y1, x, y) {
    array = path.bezierCurveTo(+x1, +y1, +x, +y)
  }
  export function arcTo(x1, y1, x2, y2, r) {
    array = path.arcTo(+x1, +y1, +x2, +y2, +r)
  }
  export function arc(x, y, r, a0, a1, ccw) {
    array = path.arc(+x, +y, +r, +a0, +a1, +ccw)
  }
  export function rect(x, y, w, h) {
    array = path.rect(+x, +y, +w, +h)
  }

  import { spring } from 'svelte/motion'

  const sp = spring(
    array.map((d) => d.slice(1)),
    { stiffness: 0.1, damping: 1 }
  )

  $: commands = array.map((d) => d[0])
  $: $sp = array.map((d) => d.slice(1))

  $: d = $sp.map(([x, y], i) => commands[i] + x + ',' + y).join('')
</script>

<slot {d} {array} path={this} />
