import { SvelteComponentTyped } from 'svelte'
import { ScaleTime as Scale } from 'd3-scale'

interface Props<Range, Output, Unknown> {
  domain: Parameters<Scale<Range, Output, Unknown>['domain']>[0]
  range: Parameters<Scale<Range, Output, Unknown>['range']>[0]
  rangeRound?: Parameters<Scale<Range, Output, Unknown>['rangeRound']>[0]
  clamp?: Parameters<Scale<Range, Output, Unknown>['clamp']>[0]
  nice?: Parameters<Scale<Range, Output, Unknown>['nice']>[0]
  unknown?: Parameters<Scale<Range, Output, Unknown>['unknown']>[0]
  interpolate?: Parameters<Scale<Range, Output, Unknown>['interpolate']>[0]
}

interface Slots<Range, Output, Unknown> {
  default: {
    scale: Scale<Range, Output, Unknown>
  }
}

declare class ScaleUtc<Range, Output, Unknown> extends SvelteComponentTyped<
  Props<Range, Output, Unknown>,
  never,
  Slots<Range, Output, Unknown>
> {
  ticks: Scale<Range, Output, Unknown>['ticks']
  tickFormat: Scale<Range, Output, Unknown>['tickFormat']
  copy: Scale<Range, Output, Unknown>['copy']
  invert: Scale<Range, Output, Unknown>['invert']
}
export default ScaleUtc
