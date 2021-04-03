import { Series } from 'd3-shape'
import { SvelteComponentTyped } from 'svelte'

interface Props<Datum, Key> {
  data?: Datum[]
  keys?: ArrayLike<Key>
  offset?: (series: Series<Datum, Key>, order: number[]) => void
  order?: Iterable<number> | ((series: Series<Datum, Key>) => Iterable<number>)
  value?: number | ((d: Datum, key: Key, i: number, data: Datum[]) => number)

  // These properties are used for typing manners
  Datum?: Datum
  Key?: Key
}

interface Slot<Datum, Key> {
  default: {
    stack?: (data: Iterable<Datum>, ...args: any[]) => Array<Series<Datum, Key>>
    data?: Array<Series<Datum, Key>>
  }
}

/**
 * Grafico Stack Component
 */
declare class Stack<Datum, Key> extends SvelteComponentTyped<
  Props<Datum, Key>,
  never,
  Slot<Datum, Key>
> {}
export default Stack
