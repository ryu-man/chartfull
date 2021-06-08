import { SvelteComponentTyped } from 'svelte'

interface Props {
  x?: number
  y?: number
  value?: string
  tickSize?: number
  tickPadding?: number
  offset?: number
  style?: CSSStyleDeclaration
}

export default class Tick extends SvelteComponentTyped<Props> {}
