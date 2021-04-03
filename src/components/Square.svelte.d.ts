import { SvelteComponentTyped } from 'svelte'

interface Props<
  Datum,
  XValue extends number | Date | undefined,
  YValue extends number | Date | undefined
> {
  xAxisId?: 'default' | string
  yAxisId?: 'default' | string
  x?: (d: Datum, ...args: any) => Datum[keyof Datum]
  y?: (d: Datum, ...args: any) => Datum[keyof Datum]

  Datum?: Datum
  XValue?: XValue
  YValue?: YValue
}
interface Slot<
  Datum,
  XValue extends number | Date | undefined,
  YValue extends number | Date | undefined
> {
  default: {
    xGet?: (d: Datum, ...args: any) => XValue
    yGet?: (d: Datum, ...args: any) => YValue
    xBandwidth?: number
    yBandwidth?: number
  }
}

/**
 * Grafico Sqauare Component
 */
declare class Square<
  Datum,
  XValue extends number | Date | undefined,
  YValue extends number | Date | undefined
> extends SvelteComponentTyped<
  Props<Datum, XValue, YValue>,
  never,
  Slot<Datum, XValue, YValue>
> {}
export default Square
