import type { Writable } from 'svelte/store'

export function scaleStore<T>(
  scale: T
): Writable<T> & {
  domain: T['domain']
  range: T['range']
  unknown: T['unknown']
  copy: T['copy']
  toString: T['toString']
  get: T
}
