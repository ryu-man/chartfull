import { SvelteComponentTyped } from 'svelte'
import { ScaleSequential as Scale } from 'd3-scale'

interface Props<Output, Unknown> {
  domain: Parameters<Scale<Output, Unknown>['domain']>[0]
  range: Parameters<Scale<Output, Unknown>['range']>[0]
  rangeRound: Parameters<Scale<Output, Unknown>['rangeRound']>[0]
  interpolator?: Scale<Output, Unknown>['interpolator']
  clamp?: Parameters<Scale<Output, Unknown>['clamp']>[0]
  unknown?: Unknown
}

interface Slots<Output, Unknown> {
  default: {
    scale: Scale<Output, Unknown>
  }
}

declare class ScaleSequential<Output, Unknown> extends SvelteComponentTyped<
  Props<Output, Unknown>,
  never,
  Slots<Output, Unknown>
> {}
export default ScaleSequential
