import { SvelteComponentTyped } from 'svelte'
import {
  ScaleIdentity as Scale,
  NumberValue,
  UnknownReturnType
} from 'd3-scale'

interface Props<Unknown> {
  domain: Iterable<NumberValue>
  range: Iterable<NumberValue>
  unknown: Unknown
  ticks: number
  tickFormat?: [number, string]
  nice?: number
}

interface Slots<Unknown> {
  default: {
    scale: Scale<Unknown>
    domain: number[]
    range: number[]
    ticks: number[]
    unknown: UnknownReturnType<Unknown, undefined>
    tickFormat?: (d: NumberValue) => string
    invert?: Scale<Unknown>['invert']
    copy: Scale<Unknown>['copy']
  }
}

declare class ScaleIdentity<Unknown> extends SvelteComponentTyped<
  Props<Unknown>,
  never,
  Slots<Unknown>
> {}
export default ScaleIdentity
