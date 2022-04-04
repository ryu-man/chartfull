import { SvelteComponentTyped } from 'svelte'
import { ScaleThreshold as Scale } from 'd3-scale'

interface Props<Domain extends number | string | Date, Range, Unknown> {
  domain: Parameters<Scale<Domain, Range, Unknown>['domain']>[0]
  range: Parameters<Scale<Domain, Range, Unknown>['range']>[0]
  invertExtent: Parameters<Scale<Domain, Range, Unknown>['invertExtent']>[0]
  unknown: Unknown
}
interface Slots<Domain extends number | string | Date> {
  default: {
    scale: Scale<Domain, never>
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
