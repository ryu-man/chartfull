import { CurveFactory, CurveFactoryLineOnly, Line as D3Line } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<Datum> {
  xAxisId?: 'default'
  yAxisId?: 'default'
  x?: (d: Datum, ...args: any) => Datum[keyof Datum]
  y?: (d: Datum, ...args: any) => Datum[keyof Datum]
  curve?: CurveFactory | CurveFactoryLineOnly
  data?: Datum[]
  typeof?: Datum
}
interface Slot<Datum> {
  default: {
    line: D3Line<[number, number]>
    d: string
  }
}

/**
 * Graficos Line Component
 */
declare class Line<Datum> extends SvelteComponentTyped<
  Props<Datum>,
  never,
  Slot<Datum>
> {}
export default Line
