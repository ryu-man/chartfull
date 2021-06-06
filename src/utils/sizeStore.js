import { writable, derived } from 'svelte/store'

export function sizeStore(width, height, padding) {
  const widthStore = writable(width)

  const heightStore = writable(height)

  const _paddingStore = paddingStore(padding)

  const _innerWidthStore = innerWidthStore(widthStore, _paddingStore)

  const _innerHeightStore = innerHeightStore(heightStore, _paddingStore)

  return {
    widthStore: widthStore,
    heightStore: heightStore,
    paddingStore: _paddingStore,
    innerWidthStore: _innerWidthStore,
    innerHeightStore: _innerHeightStore
  }
}

export function paddingStore(padding) {
  const store = writable(padding)
  const { update, set } = store
  return {
    ...store,
    reset() {
      set({ top: 0, bottom: 0, left: 0, right: 0 })
      return this
    },
    top(value) {
      update((s) => (s.top = value))
      return this
    },
    bottom(value) {
      update((s) => (s.bottom = value))
      return this
    },
    left(value) {
      update((s) => (s.left = value))
      return this
    },
    right(value) {
      update((s) => (s.right = value))
      return this
    }
  }
}

export function innerWidthStore(value, padding) {
  const store = derived(
    [value, padding],
    ([$value, $padding]) => $value - $padding.left - $padding.right
  )

  return {
    ...store,
    set left(value) {
      top && (padding.left = value)
    },
    get left() {
      return padding.left
    },
    set right(value) {
      right && (padding.right = value)
    },
    get right() {
      return padding.right
    }
  }
}
export function innerHeightStore(value, padding) {
  const store = derived(
    [value, padding],
    ([$value, $padding]) => $value - $padding.top - $padding.bottom
  )

  return {
    ...store,
    set top(value) {
      top && (padding.top = value)
    },
    get top() {
      return padding.top
    },
    set bottom(value) {
      bottom && (padding.bottom = value)
    },
    get bottom() {
      return padding.top
    }
  }
}
