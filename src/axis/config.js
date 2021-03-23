import XAxis from './x_axis.svelte'
import YAxis from './y_axis.svelte'
import Label from './label.svelte'
import {
  LinearXAxis,
  LinearYAxis,
  TimeXAxis,
  TimeYAxis,
  UTCXAxis,
  UTCYAxis,
  LogXAxis,
  LogYAxis,
  PowXAxis,
  PowYAxis,
  SqrtXAxis,
  SqrtYAxis,
  SymlogXAxis,
  SymlogYAxis
} from './continious'
import { BandXAxis, BandYAxis } from './ordinal'

XAxis.linear = LinearXAxis
YAxis.linear = LinearYAxis

XAxis.time = TimeXAxis
YAxis.time = TimeYAxis

XAxis.utc = UTCXAxis
YAxis.utc = UTCYAxis

XAxis.utc = UTCXAxis
YAxis.utc = UTCYAxis

XAxis.log = LogXAxis
YAxis.log = LogYAxis

XAxis.pow = PowXAxis
YAxis.pow = PowYAxis

XAxis.sqrt = SqrtXAxis
YAxis.sqrt = SqrtYAxis

XAxis.symlog = SymlogXAxis
YAxis.symlog = SymlogYAxis

XAxis.band = BandXAxis
YAxis.band = BandYAxis

XAxis.label = Label
YAxis.label = Label
