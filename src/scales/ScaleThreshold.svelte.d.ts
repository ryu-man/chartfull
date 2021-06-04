import { SvelteComponentTyped } from 'svelte'
import type { ScaleThreshold as ScaleThresholdType } from 'd3-scale'

interface Props<
  Domain extends number | string | Date,
  Range,
  Unknown
> {
  domain: Iterable<Domain>
  range: Iterable<Range>
  unknown: Unknown
}
interface Slots<Domain extends number | string | Date> {
  default: {
    scale: ScaleThresholdType<Domain, never>
    domain: Iterable<Domain>
    copy: ScaleThresholdType<Domain, never>['copy']
    invertExtent: ScaleThresholdType<Domain, never>['invertExtent']
    toString: ScaleThresholdType<Domain, never>['toString']
  }
}

declare class ScaleThreshold<
  Domain extends number | string | Date,
  Range,
  Unknown = never
> extends SvelteComponentTyped<
  Props<Domain, Range, Unknown>,
  never,
  Slots<Domain>
> {}

export default ScaleThreshold
