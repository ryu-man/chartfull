import { SvelteComponentTyped } from 'svelte'

type Params<T> = {
  [K in keyof T]: T[K]
}

type Props<T, R> = Params<T> & {
  call?: <U extends Omit<T, 'call'>>(params?: U) => R
}

interface Slots< R> {
  default: {
    value: R
  }
}

export default class Call<T, R> extends SvelteComponentTyped<
  Props<T, R>,
  never,
  Slots<R>
> {}
