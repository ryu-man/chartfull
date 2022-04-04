export function css(node: HTMLElement, style): void

export function register(node: HTMLElement, events): any

export function classNames(...args: string[]): string

type AccessKey<T, R> = (d: T) => R
type Scale<T, R> = <T, R>(d: T) => R
type GetDomainType<S> = S extends Scale<infer T, any> ? T : any
type GetRangeType<S> = S extends Scale<any, infer R> ? R : any
type Access<S, D> = {
  (value: D): GetRangeType<S>
  scale: S
  accessor: AccessKey<D, GetRangeType<S>>
}
export function access<S, D>(
  scale: S,
  key: AccessKey<D, GetRangeType<S>>
): Access<S, D>
