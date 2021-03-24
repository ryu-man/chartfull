# Graficos

Declarative, reactive and customizable redefined [D3.js](https://www.d3.org) for [Svelte](https://www.svelte.dev).

## Get started

## Install

Coming soon !

<!-- ```bash -->
<!-- # using npm -->
<!-- npm install graficos -->
<!--  -->
<!-- # using yarn -->
<!-- yarn install graficos -->
<!-- ``` -->

## Usage

```html
<script>
    import {Linechart, XAxis, YAxis, Line} from "graficos"
    let data = []
</script>

<!--> When using groupBy prop multi line will be generated <-->
<Linechart {data} groupby="{(o)=>o.prop}" let:key let:data>
    <Line class="{key}" {data} />
    <XAxis slot="xaxis" accessor="{(o)=> o.xprop}" />
    <YAxis slot="yaxis" accessor="{(o)=> o.xprop}" />
</Linechart>

{#await csv('./data_doubleHist.csv') then data}
  <Histogram
    height={700}
    {data}
  >
    <XAxis
      slot="xaxis"
      nice
      tickValues={(scale) => scale.ticks()}
      accessor={(d) => +d.value}
    />
    <YAxis slot="yaxis" tickValues={(scale) => scale.ticks()} />
    <Rect
      x={xScale(bin.x0)}
      y={0}
      width={Math.abs(xScale(bin.x1) - xScale(bin.x0))}
      height={innerHeight - yScale(bin.length)}
      optionsHeight={{ duration: 600, delay: j * 200, easing: backOut }}
      let:x
      let:y
      let:width
      let:height
    >
      <rect
        class={key}
        {x}
        {y}
        {width}
        {height}
        fill={color}
        transform="translate(0, {0})"
      />
    </Rect>
    <figcaption slot="title">Histogram values...</figcaption>
  </Histogram>
{/await}
```

## Components

### Axis

#### XAxis / YAxis

- scale
- accessor
- domain
- range
- tickValues

#### Continous Axis

- Linear
- Log
- Pow
- SQRT
- Symlog
- Time
- UTC
  
#### Ordinal

- Band
- Ponit

### Line
### Area
### Rect
### Circle

## Charts

- Line
- Area
- Scatter
- Pie
- Heat map
- Histogram

## Licence

Graficos is [MIT Licence](./LICENSE)

## Inspiration

- [Pancake](https://github.com/Rich-Harris/pancake)
