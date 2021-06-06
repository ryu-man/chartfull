import { CurveFactory, Area as D3Area } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<T> {
  T?: T[]
  xAxisId?: 'default' | string
  yAxisId?: 'default' | string
  curve?: CurveFactory
  x?: (d: T, index: number, data: T[]) => number
  y0?: number | ((d: T, index: number, data: T[]) => number)
  y1?: (d: T, index: number, data: T[]) => number
}

interface Slot<T> {
  default: {
    area?: D3Area<T>
    d?: string
  }
}

/**
 * Grafico Area Component
 */
declare class Area<T> extends SvelteComponentTyped<Props<T>, never, Slot<T>> {}
export default Area
