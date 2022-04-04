import { SvelteComponentTyped } from 'svelte'
import { Spring } from 'svelte/motion'

type Props<T extends number[]> = {
  from?: T
  to?: T
  damping?: number
  precision?: number
  stiffness?: number
}

interface SLots<T> {
  default: {
    value: number
  }
}

export default class Springs<T> extends SvelteComponentTyped<
  Props<T>,
  never,
  Slots<T>
> {}
