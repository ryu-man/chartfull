type Scale<Domain, Range, Unknown> = <
  Domain,
  Range = number,
  Unknown = undefined
>(
  x: Domain
) => Range | Unknown

type ScaleReturnType<T> = T extends Scale<any, infer X, infer Y>
  ? X | Y
  : number | undefined

const get: <T, S>(
  scale: S,
  accessor: (d: T) => ScaleReturnType<S>
) => {
  (value: T): ScaleReturnType<S>

  scale: S
  accessor: (d: T) => ScaleReturnType<S>
}
export default get
