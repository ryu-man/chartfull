import { CurveFactory } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<Datum> {
  xAxisId?: 'default' | string
  yAxisId?: 'default' | string
  data?: ArrayLike<Datum>
  curve?: CurveFactory
  x?: (d: Datum, ...args: any) => number
  y0?: number | ((d: Datum, index: number, data: Datum[]) => number)
  y1?: (d: Datum, ...args: any) => number

  Datum?: Datum
}

interface Slot<Datum> {
  default: {
    area?: (data: Iterable<Datum> | Datum[]) => string | null
    d?: string
  }
}

/**
 * Grafico Area Component
 */
declare class Area<Datum> extends SvelteComponentTyped<
  Props<Datum>,
  never,
  Slot<Datum>
> {}
export default Area
