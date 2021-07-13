import { SvelteComponentTyped } from 'svelte'

type Props<T extends any> = {
  id?: string | string[]

  T?: T
}

type Slots<T extends any> = {
  default: {
    slot?: T
  }
}

export default class GetScale<T> extends SvelteComponentTyped<
  Props<T>,
  never,
  Slots<T>
> {}
