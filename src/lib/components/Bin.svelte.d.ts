import { ThresholdCountGenerator } from 'd3-array'
import { ThresholdNumberArrayGenerator } from 'd3-array'
import { HistogramGeneratorNumber, Bin as D3Bin } from 'd3-array'
import { SvelteComponentTyped } from 'svelte'
import { ScaleLinear as Scale } from 'd3-scale'

interface Props<
  Datum,
  Value extends number | undefined,
  Range,
  Output,
  Unknown
> {
  T?: Datum[]
  binDomain?:
    | [number, number]
    | ((values: Iterable<Value>) => [number, number] | [undefined, undefined])
  value?: (d: Datum, i: number, data: ArrayLike<Datum>) => Value
  thresholds?:
    | number
    | ThresholdCountGenerator<Value>
    | ArrayLike<Value>
    | ThresholdNumberArrayGenerator<Value>

  domain: Parameters<Scale<Range, Output, Unknown>['domain']>[0]
  range: Parameters<Scale<Range, Output, Unknown>['range']>[0]
  rangeRound?: Parameters<Scale<Range, Output, Unknown>['rangeRound']>[0]
  clamp?: Parameters<Scale<Range, Output, Unknown>['clamp']>[0]
  nice?: Parameters<Scale<Range, Output, Unknown>['nice']>[0]
  unknown?: Parameters<Scale<Range, Output, Unknown>['unknown']>[0]
  interpolate?: Parameters<Scale<Range, Output, Unknown>['interpolate']>[0]

  // These properties are used for typing manners

  Datum?: Datum
  Value?: Value
}

interface Slot<
  Datum,
  Value extends number | Date | undefined,
  Range,
  Output,
  Unknown
> {
  default: {
    bin?: HistogramGeneratorNumber<Datum, number>
    data?: D3Bin<Datum, Value>[]
    x0Get?: (d: D3Bin<Datum, number>) => Value
    x1Get?: (d: D3Bin<Datum, number>) => Value
    yGet?: (d: D3Bin<Datum, number>) => Value
    ready?: Promise<any>
    scale?: Scale<Range, Output, Unknown>
  }
}

/**
 * Grafico Bin Component
 */
declare class Bin<
  Datum,
  Value extends number | undefined,
  Range,
  Output,
  Unknown
> extends SvelteComponentTyped<
  Props<Datum, Value, Range, Output, Unknown>,
  never,
  Slot<Datum, Value, Range, Output, Unknown>
> {}
export default Bin
