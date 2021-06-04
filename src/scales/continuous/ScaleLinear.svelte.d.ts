import { SvelteComponentTyped } from 'svelte'
import {
  ScaleLinear as Scale,
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
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
    domain?: number[]
    range?: Range[]
    ticks?: (count?: number) => number[]
    unknown?: UnknownReturnType<Unknown, undefined>
    interpolate?: Scale<Range, Output, Unknown>['interpolate']
    tickFormat?: Scale<Range, Output, Unknown>['tickFormat']
    invert?: Scale<Range, Output, Unknown>['invert']
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScaleLinear<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {}

export default ScaleLinear
