import { SvelteComponentTyped } from 'svelte'

interface Prop<Datum, Value> {
  width?: number
  height?: number
  padding?: { top?: number; right?: number; bottom?: number; left?: number }
  data?: Datum[]
  style?: CSSStyleDeclaration
  init?: (node: HTMLElement, data: Datum[]) => void
  onMount?: (node: HTMLElement, data: Datum[]) => void
  onUpdate?: (node: HTMLElement, data: Datum[]) => void
  onDestroy?: (node: HTMLElement, data: Datum[]) => void
  class?: string

  /*** These properties are used for typing manners ***/
  Datum?: Datum
  Value?: Value
}

interface Slot<Datum, Value> {
  default: {
    width?: number
    height?: number
    innerWidth?: number
    innerHeight?: number
    padding?: {}
    data?: Datum[]
    xScales?: (value: Value) => Value
    yScales?: (value: Value) => Value
    xAccessors?: (value: Datum) => Value
    yAccessors?: (value: Datum) => Value
    xAxisId?: string
    yAxisId?: string
  }
}

declare class Grafico<Datum, Value> extends SvelteComponentTyped<
  Prop<Datum, Value>,
  never,
  Slot<Datum, Value>
> {}
export default Grafico
