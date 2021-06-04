import { SvelteComponentTyped } from 'svelte'
import { ScaleQuantize as Scale } from 'd3-scale'
import { NumberValue } from 'd3-scale'

interface Props<Range, Unknown> {
  domain?: Iterable<NumberValue>
  range?: Iterable<Range>
  unknown?: Unknown
  ticks?: number
  specifier?: string
  nice?: number
}

interface Slots<Range, Unknown> {
  default: {
    scale?: Scale<Range, Unknown>
    domain?: [number, number]
    range?: Range[]
    quantiles?: number[]
    thresholds?: number[]
    ticks?: number[]
    format?: (d: NumberValue) => string
    copy?: Scale<NumberValue, never>['copy']
    invertExtent?: Scale<NumberValue, never>['invertExtent']
    toString?: Scale<NumberValue, never>['toString']
  }
}

declare class ScaleQuantize<Range, Unknown> extends SvelteComponentTyped<
  Props<Range, Unknown>,
  never,
  Slots<Range, Unknown>
> {}

export default ScaleQuantize
