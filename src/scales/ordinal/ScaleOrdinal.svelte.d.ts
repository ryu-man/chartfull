import { SvelteComponentTyped } from 'svelte'
import { ScaleOrdinal as Scale } from 'd3-scale'
import { UnknownReturnType } from 'd3-scale'

interface Props<Domain, Range, Unknown> {
  domain?: Iterable<Domain>
  range?: Iterable<Range>
  unknown?: Unknown
}

interface Slots<Domain, Range, Unknown> {
  default: {
    scale: Scale<string, Range> | Scale<Domain, Range, Unknown>
    domain: Domain[]
    range?: Range[]
    unknown?: UnknownReturnType<Unknown, { name: 'implicit' }>
    copy: Scale<Domain, Range, Unknown>['copy']
  }
}
export default class ScaleOrdinal<
  Domain,
  Range,
  Unknown = never
> extends SvelteComponentTyped<
  Props<Domain, Range, Unknown>,
  never,
  Slots<Domain, Range, Unknown>
> {}
