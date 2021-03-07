import XAxis from './x_axis.svelte'
import YAxis from './y_axis.svelte'
import XTick from './x_tick.svelte'
import YTick from './y_tick.svelte'
import { LinearXAxis, LinearYAxis, TimeXAxis, TimeYAxis, UTCXAxis,UTCYAxis } from './continious'
import { BandXAxis,BandYAxis } from './ordinal'

XAxis.tick = XTick
YAxis.tick = YTick

XAxis.linear = LinearXAxis
YAxis.linear = LinearYAxis

XAxis.time = TimeXAxis
YAxis.time = TimeYAxis

XAxis.utc = UTCXAxis
YAxis.utc = UTCYAxis

XAxis.band = BandXAxis
YAxis.band = BandYAxis
