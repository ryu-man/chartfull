import XAxis from './XAxis.svelte'
import YAxis from './YAxis.svelte'
import AxisLabel from './AxisLabel.svelte'
import {
  LinearXAxis,
  LinearYAxis,
  TimeXAxis,
  TimeYAxis,
  UtcXAxis,
  UtcYAxis,
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

XAxis.utc = UtcXAxis
YAxis.utc = UtcYAxis

XAxis.utc = UtcXAxis
YAxis.utc = UtcYAxis

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

XAxis.label = AxisLabel
YAxis.label = AxisLabel
