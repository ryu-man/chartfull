<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { Grafico } from 'graficos'

  import { OneLine, MultiLine } from '.'
</script>

<Meta
  title="Charts/Line chart"
  component={Grafico}
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Story
  name="Single line"
  args={{
    height: 0,
    padding: {
      top: 54,
      right: 0,
      bottom: 24,
      left: 72
    }
  }}
  let:args
>
  <OneLine {args} />
</Story>

<Story
  name="Multiple lines"
  args={{
    height: 0,
    padding: {
      left: 36,
      top: 36,
      right: 0,
      bottom: 36
    }
  }}
  let:args
>
  <MultiLine {args} />
</Story>
