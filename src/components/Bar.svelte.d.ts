import { SvelteComponentTyped } from 'svelte'

interface Props<T, XArgs extends any[], YArgs extends any[]> {
  T?: T[]

  xAxisId?: 'default' | (string & {})
  yAxisId?: 'default' | (string & {})

  x?: (d: T, ...args: XArgs) => number | Date | string
  y?: (d: T, ...args: YArgs) => number | Date | string
}
interface Slot<Datum, XArgs extends any[], YArgs extends any[]> {
  default: {
    xGet?: (d: Datum, ...args: XArgs) => number
    yGet?: (d: Datum, ...args: YArgs) => number
    bandwidth?: number
  }
}

/**
 * Grafico Bar Component
 */
declare class Bar<
  Datum,
  XArgs extends any[],
  YArgs extends any[]
> extends SvelteComponentTyped<
  Props<Datum, XArgs, YArgs>,
  never,
  Slot<Datum, XArgs, YArgs>
> {}
export default Bar
