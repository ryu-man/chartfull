import { writable } from 'svelte/store'

export function scaleStore(scale) {
  const { subscribe, set, update } = writable(scale)

  return {
    subscribe,
    domain: function (domain) {
      scale.domain(domain)
      update((scale) => scale)
      return this
    },
    range: function (range) {
      scale.range(range)
      update((scale) => scale)
      return this
    },
    unknown: function (value) {
      scale.unknown(value)
      update((scale) => scale)
      return this
    },
    copy: scale.copy,
    toString: scale.toString,
    get: scale
  }
}