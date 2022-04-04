<script>
  import { Meta, Story } from '@storybook/addon-svelte-csf'
  import { Grafico, Pie, Arc, Declare, ScaleOrdinal } from 'graficos'
  import { csv } from 'd3'
  import { extent } from 'd3-array'
  import { schemeCategory10 } from 'd3-scale-chromatic'
  let data = []

  csv('./population-by-age.csv', ({ name, value }) => ({
    name,
    value: +value
  })).then((res) => (data = res))

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2
  }
</script>

<Meta
  title="Charts/Pie chart"
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
  <Grafico height={args.height} let:innerWidth let:innerHeight>
    <ScaleOrdinal
      domain={data.map((d) => d.name)}
      range={schemeCategory10}
      let:scale
    >
      <Pie {data} value={(d) => d.value} let:data>
        <g transform={`translate(${innerWidth / 2}, ${innerHeight / 2})`}>
          <Declare value={args.radius} let:value={radius}>
            <Arc
              innerRadius={radius * 0.9}
              outerRadius={radius * 0.9}
              let:arc={outerArc}
            >
              <Arc
                outerRadius={radius * 0.8}
                innerRadius={radius * 0.4}
                let:arc={innerArc}
              >
                {#each data as item}
                  <Declare
                    value={[
                      midAngle(item) < Math.PI ? 1 : -1,
                      outerArc.centroid(item),
                      innerArc.centroid(item)
                    ]}
                    let:value={[direction, outerCentroid, innerCentroid]}
                  >
                    <g>
                      <path d={innerArc(item)} fill={scale(item.data.name)} />
                      <polyline
                        points={[
                          innerCentroid,
                          outerCentroid,
                          [radius * direction, outerCentroid[1]]
                        ]}
                        fill="none"
                        stroke="black"
                      />
                      <text
                        text-anchor={direction > 0 ? 'start' : 'end'}
                        font-size="{scale(item.data.value)}pt"
                        dx={direction * 8}
                        transform="translate({[
                          radius * direction,
                          outerCentroid[1]
                        ]})">{item.data.name}</text
                      >
                    </g>
                  </Declare>
                {/each}
              </Arc>
            </Arc>
          </Declare>
        </g>
      </Pie>
    </ScaleOrdinal>
  </Grafico>
</Story>
