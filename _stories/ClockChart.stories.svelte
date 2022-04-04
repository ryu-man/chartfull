<script>
    import { Meta, Story } from '@storybook/addon-svelte-csf'
    import { Grafico, Pie, Arc, Declare, ScaleOrdinal } from 'graficos'

    let data = []
  </script>
  
  <Meta
    title="Charts/Depth chart"
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
    <Grafico height={args.height} let:innerWidth let:innerHeight >
    
    </Grafico>
  </Story>
  