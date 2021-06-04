import { SvelteComponentTyped } from 'svelte'
import {
  ScaleTime as Scale,
  NumberValue,
  UnknownReturnType,
  InterpolatorFactory
} from 'd3-scale'
import { TimeInterval, CountableTimeInterval } from 'd3-time'

interface Props<Range, Output, Unknown> {
  interpolate?: InterpolatorFactory<Range, Output>
  domain: Iterable<Date | NumberValue>
  range: Iterable<Range>
  rangeRound?: Iterable<NumberValue>
  unknown?: Unknown
  ticks?: number | TimeInterval
  tickFormat?: [number, string]
  nice?: number | CountableTimeInterval
  clamp?: boolean
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
    domain?: Date[]
    range?: Range[]
    ticks?: Date[]
    unknown?: UnknownReturnType<Unknown, undefined>
    clamp?: boolean
    interpolate?: InterpolatorFactory<any, any>
    tickFormat?: (d: Date) => string
    invert?: Scale<Range, Output, Unknown>['invert']
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScaleUtc<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {}
export default ScaleUtc
