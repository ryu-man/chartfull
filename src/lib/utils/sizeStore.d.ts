import { Writable, Readable } from 'svelte/store'

type SizeStore = {
  widthStore: Writable<number>
  heightStore: Writable<number>
  paddingStore: PaddingStore
  innerWidthStore: InnerWidthStore
  innerHeightStore: InnerHeightStore
}
export function sizeStore(
  width: number,
  height: number,
  padding: Padding
): SizeStore

type Padding = { top?: number; right?: number; bottom?: number; left?: number }
type PaddingStore = Writable<Padding> & {
  top(value: number): PaddingStore
  right(value: number): PaddingStore
  bottom(value: number): PaddingStore
  left(value: number): PaddingStore
}
export function paddingStore(padding: Padding): PaddingStore

type InnerWidthStore = Readable<number> & {
  left: number
  right: number
}
export function innerWidthStore(
  value: Writable<number>,
  padding: PaddingStore
): InnerWidthStore

type InnerHeightStore = Readable<number> & {
  top: number
  bottom: number
}
export function innerHeightStore(
  value: Writable<number>,
  padding: PaddingStore
): InnerHeightStore
