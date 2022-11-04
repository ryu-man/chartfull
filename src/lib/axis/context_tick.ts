import { getContext, setContext } from "svelte"

export const TICK_CONTEXT_KEY = 'graficos_tick_context_key'

export function getTickContext(){
    return getContext(TICK_CONTEXT_KEY)
}

export function setTickContext(value: any){
    setContext(TICK_CONTEXT_KEY, value)
}
