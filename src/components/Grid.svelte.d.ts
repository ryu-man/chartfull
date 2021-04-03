import { SvelteComponentTyped } from 'svelte'

interface Props {
  xAxisId?: 'default' | (string & {})
  yAxisId?: 'default' | (string & {})
}

interface Slot {
  vertical: {
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    index?: number
  }
  horizontal: {
    x1?: number
    y1?: number
    x2?: number
    y2?: number
    index?: number
  }
}

/**
 * Grafico Grid Component
 */
declare class Grid extends SvelteComponentTyped<Props, never, Slot> {}
export default Grid
