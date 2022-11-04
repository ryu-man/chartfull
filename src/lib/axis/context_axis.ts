import { getContext, setContext } from "svelte"

export const AXIS_CONTEXT_KEY = 'graficos_axis_context_key'

export function getAxisContext(){
    return getContext(AXIS_CONTEXT_KEY)
}

export function setAxisContext(value: any){
    setContext(AXIS_CONTEXT_KEY, value)
}
