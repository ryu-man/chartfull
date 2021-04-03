import { HistogramGeneratorNumber, Bin as D3Bin } from 'd3-array'
import { SvelteComponentTyped } from 'svelte'

interface Props<Datum, Value extends number | Date | undefined> {
  data?: Datum[]
  domain?:
    | [number, number]
    | ((values: Iterable<Value>) => [number, number] | [undefined, undefined])
  value?: (d: Datum, i: number, data: ArrayLike<Datum>) => Value
  thresholds?: number

  // These properties are used for typing manners

  Datum?: Datum
  Value?: Value
}

interface Slot<Datum, Value extends number | Date | undefined> {
  default: {
    bin?: HistogramGeneratorNumber<Datum, number>
    data?: D3Bin<Datum, Value>[]
    x0Get?: (d: D3Bin<Datum, number>) => Value
    x1Get?: (d: D3Bin<Datum, number>) => Value
    yGet?: (d: D3Bin<Datum, number>) => Value
  }
}

/**
 * Grafico Bin Component
 */
declare class Bin<
  Datum,
  Value extends number | Date | undefined
> extends SvelteComponentTyped<
  Props<Datum, Value>,
  never,
  Slot<Datum, Value>
> {}
export default Bin
