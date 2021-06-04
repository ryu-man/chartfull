import { NumberValue } from 'd3-scale'
import { ScaleTime } from 'd3-scale'
import { ScaleBand } from 'd3-scale'
import { ScaleContinuousNumeric } from 'd3-scale'
import type { Writable } from 'svelte/store'

type Domain<T> = T extends ScaleBand<infer G>
  ? G
  : T extends ScaleTime<any, any>
  ? Date | NumberValue
  : NumberValue

interface Scale<Domain, Range> {
  domain(): Domain[]
  domain(domain: Iterable<Date | NumberValue>): this

  range(): Range[]
  range(range: Iterable<Range>): this
}
export function scaleStore<T>(
  scale: T
): Writable<T> &
  Scale<Domain<T>, number> & {
    unknown: T extends ScaleContinuousNumeric<any, any, infer G>
      ? G[]
      : unknown[]
    copy: T
    get: T
  }
