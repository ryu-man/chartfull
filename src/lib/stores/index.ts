import { derived, writable, type Readable, type Updater, type Writable } from 'svelte/store'

export const momento = (value, memory = 1) => {

    const { update, subscribe, set } = writable([value])

    return {
        set(value) {
            update(old => [value, ...old].slice(0, memory))
        },
        subscribe(run, invalidate) {
            return subscribe(run, invalidate)
        }
    }
}


export { sizeStore, innerWidthStore, innerHeightStore, paddingStore } from './size'



export type Memorable<T> = [current: Writable<T>, ...memories: Readable<T>[]]

export function memorable<T>(value: T, capacity = 1): Memorable<T> {

    const store = writable([value, ...Array(capacity).fill(value)])

    const memorize = (oldMemories, newMemory, max = capacity) => [newMemory, ...oldMemories].slice(0, max + 1)

    let _value = value
    const current = {
        set(val: T) {
            return store.update((values) => memorize(values, _value = val))
        },
        update(fn: Updater<T>) {

            return store.update(values => memorize(values, _value = fn(values[0])))
        },
        subscribe: derived(store, values => values[0]).subscribe,
        get value() {
            return _value
        }
    }

    return [
        current,
        ...Array.from(new Array(capacity)).map((_, i) => derived(store, values => values[i + 1]))
    ]
}
