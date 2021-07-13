import { SvelteComponentTyped } from 'svelte'
import type { ScaleQuantile as Scale } from 'd3-scale'
import { NumberValue } from 'd3-scale'

interface Props<Range, Unknown> {
  domain?: Iterable<NumberValue>
  range?: Iterable<Range>
  unknown?: Unknown
}

interface Slots<Range, Unknown> {
  default: {
    scale?: Scale<Range, Unknown>
  }
}

declare class ScaleQuantile<Range, Unknown> extends SvelteComponentTyped<
  Props<Range, Unknown>,
  never,
  Slots<Range, Unknown>
> {}

export default ScaleQuantile
