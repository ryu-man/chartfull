import { SvelteComponentTyped } from 'svelte'

type Props<T> = {
  T?: T
  value?: T
}
type Slots<T> = {
  default: {
    value?: T
  }
}

/**
 * Declare Component
 */
export default class Declare<T> extends SvelteComponentTyped<
  Props<T>,
  never,
  Slots<T>
> {}
