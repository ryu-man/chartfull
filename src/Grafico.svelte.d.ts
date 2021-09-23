import { SvelteComponentTyped } from 'svelte'
import { Writable } from 'svelte/store'

interface Prop<Datum, Value> {
  width?: number
  height?: number
  innerWidth?: number
  innerHeight?: number
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
    scales?: (value: Value) => any
  }
}

declare class Grafico<Datum, Value> extends SvelteComponentTyped<
  Prop<Datum, Value>,
  never,
  Slot<Datum, Value>
> {}
export default Grafico

export const key: any
export const graficoContext: () => {
  widthStore: Writable<number>
  heightStore: Writable<number>
  innerWidthStore: Writable<number>
  innerHeightStore: Writable<number>
  paddingStore: Writable<number>
  dataStore: Writable<any[]>
  xScales
  yScales
  xAccessors
  yAccessors
  xTickValues
  yTickValues
  xAxisId
  yAxisId
  scales: Writable<{
    [key:string]: (domain: any) => any
  }>
  accessors: Writable<{
    [key:string]: (d: any) => any
  }>

  [key: string]: any
}
