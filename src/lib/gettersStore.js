import { writable } from 'svelte/store'

export default (value = {}) => {
    const { subscribe, set, update } = writable(value)

    return {
        subscribe,
        newGetter: (name, scale, accessor) => {
            const getter = (d, ...args) => scale(accessor(d, ...args))
            update(value => {
                value[name] = getter
            })

            return getter
        }
    }
}
