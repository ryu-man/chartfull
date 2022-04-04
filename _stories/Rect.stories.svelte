<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Rect from 'graficos/components/Rect.svelte';
</script>

<Meta title="Components/Rect" />

<Story id="rect" name="Rect">
	<svg width="800" height="600">
		<Rect width="400" height="200" r="50" />
	</svg>
</Story>
