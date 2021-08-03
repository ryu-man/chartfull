import { SvelteComponentTyped } from 'svelte'

type Props = {
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
    props?: any
  }
}

export default class Tick extends SvelteComponentTyped<Props, never, Slots> {}
