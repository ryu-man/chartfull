import { default as XAxis } from './x_axis.svelte';
import { default as XTick } from './x_tick.svelte';
import { default as YAxis } from './y_axis.svelte';
import { default as YTick } from './y_tick.svelte';

XAxis.tick = XTick
YAxis.tick = YTick

export { XAxis, XTick, YAxis, YTick }