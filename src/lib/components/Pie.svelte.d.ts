import { PieArcDatum } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<This, Datum> {
  data?: Datum[]
  value?: (
    d: Datum
  ) => number | ((d: Datum, i: number, data: Datum[]) => number)
  startAngle?: number | ((this: This, data: Datum[], ...args: any[]) => number)
  endAngle?: number | ((this: This, data: Datum[], ...args: any[]) => number)
  padAngle?: number | ((this: This, data: Datum[], ...args: any[]) => number)
  sort?: ((a: Datum, b: Datum) => number) | null
  sortValues?: ((a: number, b: number) => number) | null
}

interface Slot<This, Datum> {
  default: {
    data?: PieArcDatum<Datum>[]
    value?: Props<This, Datum>['value']
  }
}

/**
 * Grafico Pie Component
 */
declare class Pie<T, Datum> extends SvelteComponentTyped<
  Props<T, Datum>,
  never,
  Slot<T, Datum>
> {}
export default Pie
