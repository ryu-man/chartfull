<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { Grafico, Pie, Arc, Declare, ScaleOrdinal } from 'graficos'
  import { csv } from 'd3'
  import { extent } from 'd3-array'
  import { schemeCategory10 } from 'd3-scale-chromatic'
  import { scaleRadial } from 'd3-scale'
  let data = []
</script>

<Meta
  title="Charts/Radar chart"
  argTypes={{
    width: { control: { type: 'number' } },
    height: { control: { type: 'number' } }
  }}
/>

<Story
  name="Labeled"
  args={{
    height: 600,
    radius: 256
  }}
  let:args
>
  <Grafico height={args.height} let:innerWidth let:innerHeight />
</Story>
