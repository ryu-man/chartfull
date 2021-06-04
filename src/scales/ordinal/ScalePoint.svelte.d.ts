import { SvelteComponentTyped } from 'svelte'
import { ScalePoint as Scale } from 'd3-scale'
import { NumberValue } from 'd3-scale'

interface Props<Domain> {
  domain?: Iterable<Domain>
  range?: Iterable<NumberValue>
  rangeRound?: Iterable<NumberValue>
  round?: boolean
  padding?: number
  align?: number
}

interface Slots<Domain> {
  default: {
    scale: Scale<Domain>
    domain: Domain[]
    range: [number, number]
    round?: boolean
    padding?: number
    align?: number
    bandwidth?: number
    step?: number
    copy?: Scale<Domain>['copy']
  }
}
export default class ScalePoint<
  Domain extends { toString(): string }
> extends SvelteComponentTyped<Props<Domain>, never, Slots<Domain>> {}
