import { default as XAxis } from './x_axis.svelte'
import { default as YAxis } from './y_axis.svelte'
import AxisLabel from './label.svelte'
import {
  LinearXAxis,
  LinearYAxis,
  TimeXAxis,
  TimeYAxis,
  UTCXAxis,
  UTCYAxis
} from './continious'
import { BandXAxis, BandYAxis } from './ordinal'
import './config'

export {
  XAxis,
  YAxis,
  AxisLabel,
  LinearXAxis,
  LinearYAxis,
  TimeXAxis,
  TimeYAxis,
  UTCXAxis,
  UTCYAxis,
  BandXAxis,
  BandYAxis
}
