import { SvelteComponentTyped } from 'svelte'

interface Props<Datum> {
  value?: Datum

  //These properties are used for typing manners
  Datum?: Datum
}

interface Slot<Datum> {
  default: {
    value?: Props<Datum>['value']
  }
}

/**
 * Grafico Circle Component
 */
declare class Declare<Datum> extends SvelteComponentTyped<
  Props<Datum>,
  never,
  Slot<Datum>
> {}
export default Declare
