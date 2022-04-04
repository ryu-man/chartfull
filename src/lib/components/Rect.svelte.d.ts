import { SvelteComponentTyped } from 'svelte'

interface Options<T> {
  delay?: number
  duration?: number | ((from: T, to: T) => number)
  easing?: (t: number) => number
  interpolate?: (a: T, b: T) => (t: number) => T
}

interface Props {
  x?: number
  y?: number
  width?: number
  height?: number

  defaultX?: number
  defaultY?: number
  defaultWidth?: number
  defaultHeight?: number

  optionsX?: Options<number>
  optionsY?: Options<number>
  optionsWidth?: Options<number>
  optionsHeight?: Options<number>
}

interface Slot {
  default: {
    x?: number
    y?: number
    width?: number
    height?: number
  }
}

/**
 * Grafico Rect Component
 */
declare class Rect extends SvelteComponentTyped<Props, never, Slot> {}
export default Rect
