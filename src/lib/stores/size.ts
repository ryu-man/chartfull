import { derived, type Readable } from 'svelte/store'
import { accessible, type Accessible } from 'svelte-tools'
import type { Padding } from '$lib/types'

export function sizeStore(width: number, height: number, padding: Padding) {

  const width$ = accessible(width)

  const height$ = accessible(height)

  const padding$ = paddingStore(padding)

  const innerWidth$ = innerWidthStore(width$, padding$)

  const innerHeight$ = innerHeightStore(height$, padding$)

  return {
    width$,
    height$,
    padding$,
    innerWidth$,
    innerHeight$
  }
}

type PaddingStore = {
  subscribe: Accessible<Padding>['subscribe']
  top(): number
  top(value: number): PaddingStore
  bottom(): number
  bottom(value: number): PaddingStore
  left(): number
  left(value: number): PaddingStore
  right(): number
  right(value: number): PaddingStore
  reset(): PaddingStore
  get value(): Accessible<Padding>['value']
}
export function paddingStore(padding: Padding): PaddingStore {
  const { subscribe, update, set, ...store } = accessible(padding)
  return {
    subscribe,
    get value() {
      return store.value
    },
    reset() {
      update((padding) => {
        padding.top = 0
        padding.bottom = 0
        padding.left = 0
        padding.right = 0
        return padding
      })
      return this
    },
    top(...args: number[]) {
      if (!args.length) return padding.top
      update((padding) => {
        padding.top = args[0]
        return padding
      })
      return this
    },
    bottom(...args: number[]) {
      if (!args.length) return padding.bottom
      update((padding) => {
        padding.bottom = args[0]
        return padding
      })
      return this
    },
    left(...args: number[]) {
      if (!args.length) return padding.left
      update((padding) => {
        padding.left = args[0]
        return padding
      })
      return this
    },
    right(...args: number[]) {
      if (!args.length) return padding.right
      update((padding) => {
        padding.right = args[0]
        return padding
      })
      return this
    }
  }
}

type InnerWidthStore = {
  subscribe: Readable<number>['subscribe'],
  get value(): number
  get width(): number

  left(value: number): InnerWidthStore
  left(): number
  right(value: number): InnerWidthStore
  right(): number
}
export function innerWidthStore(width$: Accessible<number>, padding$: PaddingStore): InnerWidthStore {
  let _value = width$.value || 0
  const { subscribe } = derived(
    [width$, padding$],
    ([value, padding]) => (_value = value - padding.left - padding.right)
  )

  return {
    subscribe,
    get value() {
      return _value
    },
    get width() {
      return width$.value
    },
    left(...args: number[]) {
      if (!args.length) return padding$.left()

      padding$.left(args[0])
      return this
    },
    right(...args: number[]) {
      if (!args.length) return padding$.right()

      padding$.right(args[0])
      return this
    },
  }
}

type InnerHeightStore = {
  subscribe: Readable<number>['subscribe'],
  get value(): number
  get height(): number

  top(value: number): InnerHeightStore
  top(): number
  bottom(value: number): InnerHeightStore
  bottom(): number
}
export function innerHeightStore(height$: Accessible<number>, padding$: PaddingStore): InnerHeightStore {
  let _value = height$.value

  const { subscribe } = derived([height$, padding$], ([height, padding]) => (_value = height - padding.top - padding.bottom))

  return {
    subscribe,
    get value() {
      return _value
    },
    get height() {
      return height$.value
    },
    top(...args: number[]) {
      if (!args.length) return padding$.top()
      padding$.top(args[0])
      return this
    },
    bottom(...args: number[]) {
      if (!args.length) return padding$.bottom()
      padding$.bottom(args[0])
      return this
    },

  }
}
