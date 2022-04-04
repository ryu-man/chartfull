import { SvelteComponentTyped } from 'svelte'
import { SharedProps } from './Axis.svelte'

type Domain<T extends (...args: any) => any> = T extends (value: infer G) => any
  ? G
  : any
interface Props<Scale extends (value: any) => any> extends SharedProps {
  id?: 'default' | (string & {})
  x?: number
  y?: number
  scale?: Scale
  orient?: 'top' | 'right' | 'bottom' | 'left'
  ticks?: number
  tickArguments?: any[]
  tickValues?: Iterable<Domain<Scale>>
  tickFormat?: (d: Domain<Scale>) => string
  tickSize?: number
  tickPadding?: number
  offset?: number
  class?: string
}

interface Slots<Scale extends (value: any) => any> {
  default: {
    index?: number
    x?: number
    y?: number
    format?: (d: Domain<Scale>) => string
    formatedTick?: string
    text?: string
    tick?: Domain<Scale>
  }
}

export default class XAxis<
  Scale extends (value: any) => any
> extends SvelteComponentTyped<Props<Scale>, never, Slots<Scale>> {}