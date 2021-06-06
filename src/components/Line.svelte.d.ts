import { CurveFactory, CurveFactoryLineOnly, Line as D3Line } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<T> {
  T?: T[]
  xAxisId?: 'default' | (string & {})
  yAxisId?: 'default' | (string & {})
  x?: <D extends T>(d: D, index: number, data: T[]) => number
  y?: <D extends T>(d: D, index: number, data: T[]) => number
  curve?: CurveFactory | CurveFactoryLineOnly
}
interface Slot<T> {
  default: {
    line: D3Line<T>
    d: string
  }
}

/**
 * Graficos Line Component
 */
declare class Line<T> extends SvelteComponentTyped<Props<T>, never, Slot<T>> {}
export default Line
