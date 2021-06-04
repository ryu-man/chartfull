import { SvelteComponentTyped } from 'svelte'
import {
  ScaleLogarithmic as Scale,
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
  tickFormat?: [number, string]
  nice?: number
  base?: number
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
    domain?: number[]
    range?: Iterable<Range>
    ticks?: number[]
    unknown?: UnknownReturnType<Unknown, undefined>
    base: number
    interpolate?: InterpolatorFactory<any, any>
    tickFormat?: (d: NumberValue) => string
    invert?: Scale<Range, Output, Unknown>['invert']
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScaleLog<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {}
export default ScaleLog
