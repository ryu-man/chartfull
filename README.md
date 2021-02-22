# Graficos

A chating library based [D3.js](https://www.d3.org) for [Svelte](https://www.svelte.dev)

## Get started

```bash
# using npm
npm install charter

# using yarn
yarn install charter
```

## Usage

```html
<script>
    import {Linechart, XAxis, YAxis, Line} from "grafico"
    let data = []
</script>

<Linechart {data} groupby="{(o)=>o.prop}" >
    <Line />
    <div slot="content">
        <XAxis accessor="{(o)=> o.xprop}" />
        <YAxis accessor="{(o)=> o.xprop}" />
    </div>
</Linechart>
```

## Charts

- Line
- Area
- Scatter
- Pie
- Heat map
- Histogram

## Licence

Graficos is [MIT Licence](./LICENSE)
