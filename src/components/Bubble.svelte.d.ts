import { NumberValue } from 'd3-scale'
import { SvelteComponentTyped } from 'svelte'

interface Props<Datum, XValue, YValue, Range> {
  xAxisId?: 'default' | { valueOf: string }
  yAxisId?: 'default' | { valueOf: string }
  x?: (datum: Datum) => XValue
  y?: (datum: Datum) => YValue
  domain?: Iterable<NumberValue>
  range?: Iterable<Range>

  //These properties are used for typing manners
  Datum?: Datum
  XValue?: XValue
  YValue?: YValue
  Range?: Range[]
}

interface Slot<Datum, Range> {
  default: {
    domain?: Datum[]
    range?: Range[]
    xGet?: (d: Datum) => NumberValue
    yGet?: (d: Datum) => NumberValue
    zGet?: (d: Datum) => Range
  }
}

/**
 * Grafico Bubble Component
 */
declare class Bubble<
  Datum,
  XValue extends number | Date | undefined,
  YValue extends number | Date | undefined,
  Range
> extends SvelteComponentTyped<
  Props<Datum, XValue, YValue, Range>,
  never,
  Slot<Datum, Range>
> {}
export default Bubble
