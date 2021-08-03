<script>
  import { Meta, Template, Story } from '@storybook/addon-svelte-csf'
  import { Grafico, Pie, Arc, Declare, ScaleOrdinal } from '../src'
  import { csv } from 'd3'

  let data = []

  csv('./population-by-age.csv', ({ name, value }) => ({
    name,
    value: +value
  })).then((res) => (data = res))

  $: console.log(data)
</script>

<Meta
  title="Elements/Pie chart"
  argTypes={{ height: { control: { type: 'number' } } }}
/>

<Story
  name="Normal"
  args={{
    height: 600,
    outerRadius: 144,
    innerRadius:0
  }}
  let:args
>
  <Grafico height={args.height}>
    <Pie {data}  value={(d) => d.value} let:data>
      <g transform="translate(300, 150)">
        {#each data as item}
          <Arc outerRadius={args.outerRadius} innerRadius={args.innerRadius} let:arc>
            <path d={arc(item)} fill="black" />
          </Arc>
        {/each}
      </g>
    </Pie>
  </Grafico>
</Story>
