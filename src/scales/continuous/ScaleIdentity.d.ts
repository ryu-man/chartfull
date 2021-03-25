import { SvelteComponentTyped } from 'svelte'
import {
  ScaleIdentity as Scale,
  NumberValue,
  UnknownReturnType
} from 'd3-scale'

interface Props<Unknown> {
  domain: number[]
  range: number[]
  unknown: Unknown
  ticks: number
  specifier?: string
  nice?: number
}

interface Slots<Unknown> {
  default: {
    scale: Scale<Unknown>
    domain: number[]
    range: number[]
    ticks: number[]
    unknown: UnknownReturnType<Unknown, undefined>
    format?: (d: NumberValue) => string
    invert?: Scale<Unknown>['invert']
    copy: Scale<Unknown>['copy']
    toString: Scale<Unknown>['toString']
  }
}

declare class ScaleIdentity<Unknown> extends SvelteComponentTyped<
  Props<Unknown>,
  never,
  Slots<Unknown>
> {}
export default ScaleIdentity
