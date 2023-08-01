<script lang="ts">
	import { tweened } from 'svelte/motion';

	type ArrayElem<T> = T extends (infer G)[] ? G : any;
	type Field<T = any> = string | ((d: ArrayElem<typeof data>) => T);
	type KeyAccessor<T = any> = (d: ArrayElem<typeof data>) => T;

	export let data = [];
	export let key: KeyAccessor = (d) => d;
	export let value = d => d
	export let fields: Field[] = [];
	export let enter = (d, i) => ({});
	export let exit = (d, i) => d;

	export let duration: number | string = 0;
	export let delay: number | string = 0;
	export let easing;

	const tweened$ = tweened(data.map(value), {
		duration: parseInt(duration as string),
		delay: parseInt(delay as string),
		easing,
		interpolate: (a, b) => {
			let _a = [];
			let _b = [];

			if (!a.length) {
				_a = b.map(enter);
				_b = b;
			} else if (!b.length) {
				_a = a;
				_b = a.map(exit);
			} else if (_a.length < _b.length) {
				// entering
				_b = [...b];
				const map = new Map();
				for (const obj of a) {
					map.set(key(obj), obj);
				}

				for (let i = 0; i < b.length; i++) {
					if (map.has(key(b[i]))) {
						_a.push(a[i]);
						continue;
					}

					_a.push(enter(b[i], i));
				}
			} else if (_a.length > _b.length) {
				// exiting
				_a = [...a];
				const map = new Map();
				for (const obj of b) {
					map.set(key(obj), obj);
				}

				for (let i = 0; i < a.length; i++) {
					if (map.has(key(a[i]))) {
						_b.push(b[i]);
						continue;
					}

					_b.push(exit(a[i], i));
				}
			} else {
				_a = a;
				_b = b;
			}

			return (t) => _b.map((d, i) => interpolate(_a[i], d, t));
		}
	});

	$: tweened$.set(data.map(value));

	function interpolate(oldVal, newVal, t) {
		const interpolated = {};
		for (const key in oldVal) {
			if (typeof oldVal[key] === 'number') {
				interpolated[key] = oldVal[key] + (newVal[key] - oldVal[key]) * t;
				continue;
			}
			interpolated[key] = oldVal[key];
		}

		return interpolated;
	}

	function getValue(object, accessor: Field | string) {
		if (object.constructor === Object) {
			if (typeof accessor === 'string') {
				return object[accessor];
			}

			return accessor(object);
		}
	}
</script>

<slot data={$tweened$} />
