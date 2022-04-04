import { CurveFactory, CurveFactoryLineOnly, Line as D3Line } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<T> {
  T?: T[]
  xId?: 'x' | (string & {})
  yId?: 'y' | (string & {})
  context?: CanvasRenderingContext2D | null
  curve?: CurveFactory | CurveFactoryLineOnly
  x?: <D extends T>(d: D, index: number, data: T[]) => number | number
  y?: <D extends T>(d: D, index: number, data: T[]) => number | number
  defined?: (d: T, index: number, data: T[]) => boolean | boolean
}
interface Slot<T> {
  default: {
    line: D3Line<T>
  }
}

/**
 * Graficos Line Component
 */
declare class Line<T> extends SvelteComponentTyped<Props<T>, never, Slot<T>> {}
export default Line
