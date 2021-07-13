import { CurveFactory, Area as D3Area } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<T> {
  T?: T[]
  xId?: 'x' | (string & {})
  yId?: 'y' | (string & {})
  curve?: CurveFactory
  context?: CanvasRenderingContext2D | null

  x?: (d: T, index: number, data: T[]) => number | number
  x0?: (d: T, index: number, data: T[]) => number | number
  x1?: (d: T, index: number, data: T[]) => number | number | null

  y?: (d: T, index: number, data: T[]) => number | number
  y0?: number | ((d: T, index: number, data: T[]) => number) | number
  y1?: (d: T, index: number, data: T[]) => number | number | null

  defined?:  (d: T, index: number, data: T[]) => boolean | boolean
}

interface Slot<T> {
  default: {
    area?: D3Area<T>
  }
}

/**
 * Grafico Area Component
 */
declare class Area<T> extends SvelteComponentTyped<Props<T>, never, Slot<T>> {}
export default Area
