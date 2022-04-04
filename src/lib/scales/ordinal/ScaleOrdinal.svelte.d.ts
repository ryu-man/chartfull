import { SvelteComponentTyped } from 'svelte'
import { ScaleOrdinal as Scale } from 'd3-scale'

interface Props<Domain, Range, Unknown> {
  domain?: Parameters<Scale<Domain, Range, Unknown>['domain']>[0]
  range?: Parameters<Scale<Domain, Range, Unknown>['range']>[0]
  unknown?: Unknown
}

interface Slots<Domain, Range, Unknown> {
  default: {
    scale: Scale<string, Range> | Scale<Domain, Range, Unknown>
  }
}
export default class ScaleOrdinal<
  Domain extends { toString(): string },
  Range,
  Unknown = never
> extends SvelteComponentTyped<
  Props<Domain, Range, Unknown>,
  never,
  Slots<Domain, Range, Unknown>
> {}
