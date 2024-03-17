<script lang="ts">
	import { differenceInMilliseconds, getMilliseconds } from 'date-fns';
	import { interpolateArray } from 'd3';
	import { memorable } from 'svelte-tools';

	import { tweened } from 'svelte/motion';
	import { derived } from 'svelte/store';

	type ArrayElem<T> = T extends (infer G)[] ? G : any;
	type Field<T = any> = string | ((d: ArrayElem<typeof data>) => T);
	type KeyAccessor<T = any> = (d: ArrayElem<typeof data>) => T;

	export let data = [];
	export let from = [];
	export let to = [];

	export let key: KeyAccessor = (d) => d;
	export let value = (d, i) => d;
	export let fields: Field[] = [];
	export let enter = (d, i) => d;
	export let exit = (d, i) => d;

	export let duration: number | string = 0;
	export let delay: number | string = 0;
	export let easing;

	const tweened$ = tweened(from, {
		duration: parseInt(duration as string),
		delay: parseInt(delay as string),
		easing,
		interpolate: (from, to) => {
			const { from: _a, to: _b } = fit(from, to, key);

			return (t) => {
				return _b
					.filter((d) => !isExited(d))
					.map((d, i) => ({
						...d,
						data: tween(_a[i].data, d.data, (d.t || 0) + t),
						t: (d.t || 0) + t
					}));
			};
		}
	});

	const data$ = derived(tweened$, (d) => d.map((d) => d.data));

	$: if (JSON.stringify(to) !== JSON.stringify(from)) {
		tweened$.set(to.map((d) => ({ data: d, t: 1 })));
		from = to;
	}

	// $: console.log($data$);

	function tween(oldVal, newVal, t) {
		if (typeof oldVal === 'number') {
			return oldVal + (newVal - oldVal) * t;
		}

		const interpolated = {};
		for (const key in newVal) {
			if (typeof newVal[key] === 'number') {
				interpolated[key] = tween(oldVal[key] || 0, newVal[key], t);
				continue;
			}
			interpolated[key] = newVal[key];
		}

		return interpolated;
	}

	function enteringKeys(left: Set<string>, right: Set<string>) {
		const entering = new Set(right);

		for (const key of left) {
			entering.delete(key);
		}

		return entering;
	}

	function exitingKeys(left: Set<string>, right: Set<string>) {
		const exiting = new Set(left);

		for (const key of right) {
			exiting.delete(key);
		}

		return exiting;
	}

	function hasExitings(list: any[]) {
		return list.some(isExiting);
	}

	function withoutExiteds(list: any[]) {
		return list.filter((d) => !isExited(d));
	}

	function isExiting(d) {
		return d.exit && d.t < 1;
	}
	function isExited(d) {
		return d.exit && d.t >= 1;
	}

	function fit(from: any[], to: any[], key = (d) => d) {
		const fromKeys = new Set(from.map((d) => key(d.data)));
		const toKeys = new Set(to.map((d) => key(d.data)));

		const enters = enteringKeys(fromKeys, toKeys);
		const exiters = exitingKeys(fromKeys, toKeys);

		const set = new Set();
		const all = [...from, ...to];
		const map = new Map();

		const finalFrom = [];
		const finalTo = [];

		for (const elem of all) {
			const k = key(elem.data);
			let elemTo;
			let elemFrom;

			// the item has an old value
			if (set.has(k)) {
				// item is exiting the list
				const e = finalTo.find((d) => k === key(d.data));
				if (exiters.has(k)) {
					e.exit = true;
					e.t = map.get(k).t;
				} else {
					e.t = 0;
				}
				e.data = elem.data;
				continue;
				// item doesn't exist yet in the list
			} else {
				// item is entering the list
				if (enters.has(k)) {
					elemFrom = {
						data: enter(elem.data),
						enter: true,
						t: 0
					};
					elemTo = {
						data: elem.data,
						enter: true,
						t: 0
					};

					// item is exiting the list
				} else if (exiters.has(k)) {
					elemFrom = {
						data: elem.data,
						exit: true,
						t: 0
					};
					elemTo = {
						data: exit(elem.data),
						exit: true,
						t: 0
					};
				} else {
					elemFrom = {
						data: elem.data,
						t: elem.t || 0
					};
					elemTo = {
						data: elem.data,
						t: elem.t || 0
					};
				}
			}

			set.add(k);
			finalFrom.push(elemFrom);
			finalTo.push(elemTo);

			map.set(k, elem);
		}

		set.clear();
		map.clear();
		fromKeys.clear();
		toKeys.clear();
		enters.clear();
		exiters.clear();

		return { from: finalFrom, to: finalTo };
	}
</script>

<slot data={$data$} previous={[]} />
