import { SvelteComponentTyped } from 'svelte'
import {
  ScaleSequential as Scale,
  NumberValue,
  UnknownReturnType
} from 'd3-scale'

interface Props<Output, Unknown> {
  interpolator?: (t: number) => Output
  domain: Iterable<NumberValue>
  range: Iterable<Range>
  unknown?: Unknown
  ticks?: number
  specifier?: string
  nice?: number
}

interface Slots<Output, Unknown> {
  default: {
    scale: Scale<Output, Unknown>
    domain?: number[]
    range?: Range[]
    ticks?: number[]
    unknown?: UnknownReturnType<Unknown, undefined>
    interpolator(interpolator: (t: number) => Output): Scale<Output, Unknown>
    interpolator<NewOutput>(
      interpolator: (t: number) => NewOutput
    ): ScaleSequential<NewOutput, Unknown>
    format?: (d: NumberValue) => string
    copy?: Scale<Output, Unknown>['copy']
    toString?: Scale<Output, Unknown>['toString']
  }
}

declare class ScaleSequential<Output, Unknown> extends SvelteComponentTyped<
  Props<Output, Unknown>,
  never,
  Slots<Output, Unknown>
> {}
export default ScaleSequential
