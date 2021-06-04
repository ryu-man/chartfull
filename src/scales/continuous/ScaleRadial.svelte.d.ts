import { SvelteComponentTyped } from 'svelte'
import { ScaleRadial as Scale, NumberValue, UnknownReturnType } from 'd3-scale'

interface Props<Range, Output, Unknown> {
  domain: Iterable<NumberValue>
  range: Iterable<Range>
  rangeRound?: Iterable<NumberValue>
  clamp?: boolean
  unknown?: Unknown
  ticks?: number
  tickFormat?: [number, string] | [number, number, number, string]
  nice?: number
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
    domain?: number[]
    range?: Range[]
    clamp?: boolean
    ticks?: number[]
    unknown?: UnknownReturnType<Unknown, undefined>
    tickFormat?: (d: NumberValue) => string
    invert?: Scale<Range, Output, Unknown>['invert']
    copy?: Scale<Range, Output, Unknown>['copy']
  }
}

declare class ScaleRadial<
  Range,
  Output,
  Unknown = never
> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {}
export default ScaleRadial
