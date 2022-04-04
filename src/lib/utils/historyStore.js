import { writable } from 'svelte/store'

export default (initialValue, l = 1) => {
    const { set, subscribe, update } = writable(initialValue)
    const history = writable([])

    subscribe(v => {
        history.update(h => [v, ...h].slice(l))
    })

    return {
        set,
        subscribe,
        update,
        history: { subscribe: history.subscribe }
    }
}