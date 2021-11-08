# Graficos

Declarative, reactive and customizable redefined [D3.js](https://d3js.org/) for [Svelte](https://www.svelte.dev).

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
    import {group} from 'd3-array'
    import {Grafico, XAxis, YAxis, Line, Declare} from "graficos"
    let data = []
</script>

<!--> Line chart<-->
<Grafico data={group(data, (d)=>d.group)} let:data let:innerWidth let:innerHeight>
    <Line class="{key}" {data} x="{(d)=> o.x}" y="{(o)=> o.xprop}"/>
    <XAxis slot="xaxis" domain={extent(data, d=> d.x)} range={[0, innerWidth]}/>
    <YAxis slot="yaxis" domain={extent(data, d=> d.y)} range={[innerHeight, 0]}/>
</Grafico>


<Declare value={d=> d.x} let:value={xAccessor}>
  <Declare value={d=> d.y} let:value={yAccessor}>

    <Grafico data={group(data, (d)=>d.group)} let:data let:innerWidth let:innerHeight>
      <Line class="{key}" {data} x="{xAccessor}" y="{yAccessor}"/>
      <XAxis slot="xaxis" domain={xAccessor} range={[0, innerWidth]}/>
      <YAxis slot="yaxis" domain={yAccessor} range={[innerHeight, 0]}/>
    </Grafico>

  </Declare>
</Declare>
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
