import type { Placement } from '@floating-ui/dom';
import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

const CONTEXT_KEY = 'chartfull::ui::context::popover';

export type ChartfullPopoverContext = {
	open: Writable<boolean>;
	offset: Writable<number>;
	placements: Writable<Placement[]>;
};

export function getDefaultChartfullPopoverContext(): ChartfullPopoverContext {
	return {
		open: writable(false),
		offset: writable(8),
		placements: writable([])
	};
}

export function getChartfullPopoverContext(): ChartfullPopoverContext {
	return getContext(CONTEXT_KEY) ?? setChartfullPopoverContext(getDefaultChartfullPopoverContext());
}

export function setChartfullPopoverContext(
	context: ChartfullPopoverContext
): ChartfullPopoverContext {
	return setContext(CONTEXT_KEY, context);
}
