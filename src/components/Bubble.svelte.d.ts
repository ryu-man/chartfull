import { ScaleLinear } from 'd3-scale'
import { NumberValue } from 'd3-scale'
import { SvelteComponentTyped } from 'svelte'

interface Props<T, XValue, YValue, Range, Output, Unknown> {
  xId?: 'x' | (string & {})
  yId?: 'y' | (string & {})
  x?: (d: T) => XValue
  y?: (d: T) => YValue

  domain?: Parameters<ScaleLinear<Range, Output, Unknown>['domain']>[0]
  range?: Parameters<ScaleLinear<Range, Output, Unknown>['range']>[0]
  rangeRound?: Parameters<ScaleLinear<Range, Output, Unknown>['rangeRound']>[0]
  clamp?: Parameters<ScaleLinear<Range, Output, Unknown>['clamp']>[0]
  interpolator?: Parameters<
    ScaleLinear<Range, Output, Unknown>['interpolate']
  >[0]
  nice?: Parameters<ScaleLinear<Range, Output, Unknown>['nice']>[0]
  unknown?: Parameters<ScaleLinear<Range, Output, Unknown>['unknown']>[0]

  //These properties are used for typing manners
  T?: T[]
  XValue?: XValue
  YValue?: YValue
}

interface Slot<T> {
  default: {
    xGet?: (d: T) => NumberValue
    yGet?: (d: T) => NumberValue
    zGet?: (d: T) => NumberValue
  }
}

/**
 * Grafico Bubble Component
 */
declare class Bubble<
  Datum,
  XValue extends number | Date | undefined,
  YValue extends number | Date | undefined,
  Range,
  Output,
  Unknown
> extends SvelteComponentTyped<
  Props<Datum, XValue, YValue, Range, Output, Unknown>,
  never,
  Slot<Datum>
> {}
export default Bubble
