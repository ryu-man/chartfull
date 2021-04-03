import { SvelteComponentTyped } from 'svelte'

interface Options<T> {
  delay?: number
  duration?: number | ((from: T, to: T) => number)
  easing?: (t: number) => number
  interpolate?: (a: T, b: T) => (t: number) => T
}

interface Props {
  cx?: number
  cy?: number
  r?: number
  defaultCX?: number
  defaultCY?: number
  defaultR?: number
  optionsCX?: Options<number>
  optionsCY?: Options<number>
  optionsR?: Options<number>
}

interface Slot {
  default: {
    cx?: number
    cy?: number
    r?: number
  }
}

/**
 * Grafico Circle Component
 */
declare class Circle extends SvelteComponentTyped<Props, never, Slot> {}
export default Circle
