import { SvelteComponentTyped } from 'svelte'
import {
  ScalePower as Scale,
  NumberValue,
  UnknownReturnType,
  InterpolatorFactory
} from 'd3-scale'

interface Props<Range, Output, Unknown> {
  domain: Parameters<Scale<Range, Output, Unknown>['domain']>[0]
  range: Parameters<Scale<Range, Output, Unknown>['range']>[0]
  rangeRound?: Parameters<Scale<Range, Output, Unknown>['rangeRound']>[0]
  clamp?: Parameters<Scale<Range, Output, Unknown>['clamp']>[0]
  nice?: Parameters<Scale<Range, Output, Unknown>['nice']>[0]
  unknown?: Parameters<Scale<Range, Output, Unknown>['unknown']>[0]
  interpolate?: Parameters<Scale<Range, Output, Unknown>['interpolate']>[0]
  exponent?: Parameters<Scale<Range, Output, Unknown>['exponent']>[0]
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
    tickFormat?: (d: NumberValue) => string
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScaleSqrt<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {
  ticks: Scale<Range, Output, Unknown>['ticks']
  tickFormat: Scale<Range, Output, Unknown>['tickFormat']
  copy: Scale<Range, Output, Unknown>['copy']
  invert: Scale<Range, Output, Unknown>['invert']
}
export default ScaleSqrt
