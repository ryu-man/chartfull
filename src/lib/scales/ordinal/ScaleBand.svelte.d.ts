import { SvelteComponentTyped } from 'svelte'
import { ScaleBand as Scale } from 'd3-scale'

interface Props<Domain> {
  domain?: Parameters<Scale<Domain>['domain']>[0]
  range?: Parameters<Scale<Domain>['range']>[0]
  rangeRound?: Parameters<Scale<Domain>['rangeRound']>[0]
  round?: Parameters<Scale<Domain>['round']>[0]
  align?: Parameters<Scale<Domain>['align']>[0]
  paddingInner?: Parameters<Scale<Domain>['paddingInner']>[0]
  paddinOuter?: Parameters<Scale<Domain>['paddingOuter']>[0]
  padding?: Parameters<Scale<Domain>['padding']>[0]
}

interface Slots<Domain> {
  default: {
    scale: Scale<Domain>
    bandwidth?: ReturnType<Scale<Domain>['bandwidth']>
    step?: ReturnType<Scale<Domain>['step']>
  }
}
export default class ScaleBand<
  Domain extends { toString(): string }
> extends SvelteComponentTyped<Props<Domain>, never, Slots<Domain>> {}
