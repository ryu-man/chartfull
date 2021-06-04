import { SvelteComponentTyped } from 'svelte'

interface Props<NumberValue, Output, Unknown> {
  position?: string
  scale?: (value: NumberValue) => Output | Unknown
  tickArguments?: any[]
  tickValues?: any[]
  tickFormat?: any
}

interface Slots<NumberValue> {
  default: {
    values: ArrayLike<NumberValue>
    format: (d: NumberValue) => string
  }
}

export default class Axis<
  NumberValue,
  Output,
  Unknown
> extends SvelteComponentTyped<
  Props<NumberValue, Output, Unknown>,
  never,
  Slots<NumberValue>
> {}
