import { writable } from 'svelte/store'

const length = (domain) => {
    return Math.abs(domain[domain.length - 1] - domain[0])
}

export const growth = (scale) => {
    let oldLength = length(scale?.domain() ?? [0, 1])
    let newLength = oldLength

    let growth = newLength / oldLength

    const { set, subscribe } = writable(growth)

    return {
        set(value) {
            newLength = length(value.domain())

            growth = newLength / oldLength

            oldLength = newLength

            return set(growth)
        },
        subscribe(run, invalidate) {
            return subscribe(run, invalidate)
        }
    }
}
