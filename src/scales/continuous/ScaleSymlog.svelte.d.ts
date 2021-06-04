import { SvelteComponentTyped } from 'svelte'
import {
  ScaleSymLog as Scale,
  NumberValue,
  UnknownReturnType,
  InterpolatorFactory
} from 'd3-scale'

interface Props<Range, Output, Unknown> {
  interpolate?: InterpolatorFactory<Range, Output>
  domain: Iterable<NumberValue>
  range: Iterable<Range>
  unknown?: Unknown
  clamp?: boolean
  ticks?: number
  tickFormat?: [number, string] | [number, number, number, string]
  nice?: number
  constant?: number
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
    domain?: number[]
    range?: Range[]
    unknown?: UnknownReturnType<Unknown, undefined>
    clamp?: boolean
    ticks?: number[]
    constant?: number
    interpolate?: InterpolatorFactory<any, any>
    tickFormat?: (d: NumberValue) => string
    invert?: Scale<Range, Output, Unknown>['invert']
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScaleSqrt<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {}
export default ScaleSqrt
