import { SvelteComponentTyped } from 'svelte'
import { Arc as D3Arc, DefaultArcObject } from 'd3-shape'

interface Props<T, R> {
  innerRadius: number
  outerRadius: number
  cornerRadius?: number
  context?: CanvasRenderingContext2D | null
  startAngle?: number | ((this: T, d: R, ...args: any[]) => number)
  endAngle?: number | ((this: T, d: R, ...args: any[]) => number)
  padAngle?: number | undefined
  padRadius?: number | null
}

interface Slots<T, R> {
  default: {
    arc: D3Arc<T, DefaultArcObject>
  }
}

export default class Arc<T, R> extends SvelteComponentTyped<
  Props<T, R>,
  never,
  Slots<T, R>
> {}
