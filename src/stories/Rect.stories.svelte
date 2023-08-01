<script>
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import { Chartfull, Rect } from 'graficos';
	import MarginDecorator from './MarginDecorator.svelte';
</script>

<Meta title="Components/Rect" />

<MarginDecorator>
	<Story id="rect" name="Rect" args={{ width: 200, height: 500, r: '0' }} let:args>
		<Chartfull>
			<Rect {...args} />
		</Chartfull>
	</Story>
</MarginDecorator>
