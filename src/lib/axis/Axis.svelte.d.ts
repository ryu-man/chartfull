import { SvelteComponentTyped } from 'svelte'

type GlobalValues = 'inherit' | 'initial' | 'revert' | 'unset'
type FontWeight =
  | 'normal'
  | 'bold'
  | 'lighter'
  | 'bolder'
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900

type AbsoluteSize =
  | 'xx-small'
  | 'x-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'x-large'
  | 'xx-large'
  | 'xxx-large'

type RelativeSize = 'smaller' | 'larger'

type FontSize =
  | GlobalValues
  | AbsoluteSize
  | RelativeSize
  | `${number}${'px' | 'pt' | 'em' | 'rem' | '%'}`

type FontFamilyNameOnly =
  | 'serif'
  | 'sans-serif'
  | 'monospace'
  | 'cursive'
  | 'fantasy'
  | 'system-ui'
  | 'ui-serif'
  | 'ui-sans-serif'
  | 'ui-monospace'
  | 'ui-rounded'
  | 'emoji'
  | 'math'
  | 'fangson'

export interface SharedProps {
  fontFamily?: GlobalValues | FontFamilyNameOnly | (string & {})
  fontSize?: FontSize
  fontSizeAdjust?: number
  fontStretch?:
    | 'ultra-condensed'
    | 'extra-condensed'
    | 'condensed'
    | 'semi-condensed'
    | 'normal'
    | 'semi-expanded'
    | 'expanded'
    | 'extra-expanded'
    | 'ultra-expanded'
    | GlobalValues
    | (string & {})
  fontStyle?: 'normal' | 'italic' | 'oblique'
  fontVariant?: string
  fontWeight?: FontWeight
}
interface Props<NumberValue, Output, Unknown> {
  position?: string
  scale?: (value: NumberValue) => Output | Unknown
  tickArguments?: any[]
  tickValues?: any[]
  tickFormat?: any
}

interface Slots<NumberValue> {
  default: {
    values: ArrayLike<NumberValue>
    format: (d: NumberValue) => string
  }
}

export default class Axis<
  NumberValue,
  Output,
  Unknown
> extends SvelteComponentTyped<
  Props<NumberValue, Output, Unknown>,
  never,
  Slots<NumberValue>
> {}
