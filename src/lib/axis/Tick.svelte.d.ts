import { SvelteComponentTyped } from 'svelte'
import { SharedProps } from './Axis.svelte'

interface Props extends SharedProps {
  x?: number
  y?: number
  value?: string
  size?: number
  padding?: number
  offset?: number
  style?: CSSStyleDeclaration
}

type Slots = {
  default: {
    k?: 1 | -1
    size?: number
    x?: number
    y?: number
  }
}

export default class Tick extends SvelteComponentTyped<Props, never, Slots> {}
