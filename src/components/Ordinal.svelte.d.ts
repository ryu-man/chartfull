import { SvelteComponentTyped } from 'svelte'

interface Props<T, XScale, YScale, XArgs extends any[], YArgs extends any[]> {
  T?: T[]

  xId?: 'default' | (string & {})
  yId?: 'default' | (string & {})

  x?: (d: T, ...args: XArgs) => number | Date | string
  y?: (d: T, ...args: YArgs) => number | Date | string

  xScale?: XScale
  yScale?: YScale
}

interface Slot<
  Datum,
  XScale,
  YScale,
  XArgs extends any[],
  YArgs extends any[]
> {
  default: {
    xGet?: (d: Datum, ...args: XArgs) => number
    yGet?: (d: Datum, ...args: YArgs) => number
    bandwidth?: number
  }
}

/**
 * Grafico Bar Component
 */
declare class Ordinal<
  Datum,
  XScale,
  YScale,
  XArgs extends any[],
  YArgs extends any[]
> extends SvelteComponentTyped<
  Props<Datum, XScale, YScale, XArgs, YArgs>,
  never,
  Slot<Datum, XScale, YScale, XArgs, YArgs>
> {}
export default Ordinal
