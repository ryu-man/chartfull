import { SvelteComponentTyped } from 'svelte'
import {
  ScalePower as Scale,
  NumberValue,
  UnknownReturnType,
  InterpolatorFactory
} from 'd3-scale'

interface Props<Range, Output, Unknown> {
  interpolate?: InterpolatorFactory<Range, Output>
  domain: Iterable<NumberValue>
  range: Iterable<Range>
  unknown?: Unknown
  ticks?: number
  specifier?: string
  nice?: number
  exponent?: number
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
    domain?: Iterable<NumberValue>
    range?: Iterable<Range>
    ticks?: number[]
    unknown?: UnknownReturnType<Unknown, undefined>
    exponent: number
    interpolate?: InterpolatorFactory<any, any>
    format?: (d: NumberValue) => string
    invert?: Scale<Range, Output, Unknown>['invert']
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScalePower<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {}
export default ScalePower
