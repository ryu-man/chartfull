<script>
  // Command, x, y
  let data = [['M', 0, 0]]

  $: d = data.map(([c, x, y]) => c + x + ',' + y).join(' ')
</script>

<path {d} />
