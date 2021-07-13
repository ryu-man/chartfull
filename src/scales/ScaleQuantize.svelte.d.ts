import { SvelteComponentTyped } from 'svelte'
import { ScaleQuantize as Scale } from 'd3-scale'

interface Props<Range, Unknown> {
  domain?: Parameters<Scale<Range, Unknown>['domain']>[0]
  range?: Parameters<Scale<Range, Unknown>['range']>[0]
  invertExtent?: Parameters<Scale<Range, Unknown>['invertExtent']>[0]
  unknown?: Unknown
  ticks?: Parameters<Scale<Range, Unknown>['ticks']>[0]
  nice?: Parameters<Scale<Range, Unknown>['nice']>[0]
}

interface Slots<Range, Unknown> {
  default: {
    scale?: Scale<Range, Unknown>
  }
}

declare class ScaleQuantize<Range, Unknown> extends SvelteComponentTyped<
  Props<Range, Unknown>,
  never,
  Slots<Range, Unknown>
> {}

export default ScaleQuantize
