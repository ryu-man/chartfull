import { SvelteComponentTyped } from 'svelte'
import type { ScaleDiverging as Scale } from 'd3-scale'

interface Props<Range, Unknown> {
  domain?: Parameters<Scale<Range, Unknown>['domain']>[0]
  range?: Parameters<Scale<Range, Unknown>['range']>[0]
  rangeRound?: Parameters<Scale<Range, Unknown>['rangeRound']>[0]
  clamp?: boolean
  interpolator?: Parameters<Scale<Range, Unknown>['interpolator']>[0]
  unknown?: Unknown
}

interface Slots<Range, Unknown> {
  default: {
    scale?: Scale<Range, Unknown>
  }
}

declare class ScaleDiverging<Range, Unknown> extends SvelteComponentTyped<
  Props<Range, Unknown>,
  never,
  Slots<Range, Unknown>
> {}

export default ScaleDiverging
