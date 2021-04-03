import { NumberValue } from 'd3-scale'
import { SvelteComponentTyped } from 'svelte'

interface Props<Datum, XValue, YValue> {
  xAxisId?: 'default' | { valueOf: string }
  yAxisId?: 'default' | { valueOf: string }
  x?: (d: Datum) => XValue
  y?: (d: Datum) => YValue

  //These properties are used for typing manners
  Datum?: Datum
  XValue?: XValue
  YValue?: YValue
}

interface Slot<Datum> {
  default: {
    xGet?: (d: Datum) => NumberValue
    yGet?: (d: Datum) => NumberValue
  }
}

/**
 * Grafico Scatter Component
 */
declare class Scatter<Datum, XValue, YValue> extends SvelteComponentTyped<
  Props<Datum, XValue, YValue>,
  never,
  Slot<Datum>
> {}
export default Scatter
