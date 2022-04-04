import { writable } from 'svelte/store'

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
