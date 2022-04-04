export function css(node, style) {
  const stylesheet = node.style
  Object.entries(style || {}).forEach((elem) => {
    if (elem[1]) stylesheet[elem[0]] = elem[1]
  })
}
export function register(node, events) {
  Object.keys(events).forEach((key) => node.addEventListener(key, events[key]))
  return () => {
    Object.keys(events).forEach((key) =>
      node.addEventListener(key, events[key])
    )
  }
}

export function classNames(...args) {
  return args
    .filter(Boolean)
    .map((o) => o.trim())
    .join(' ')
}

export function access(scale, key) {
  const get = function (value) { return scale(key(value)) }

  get.scale = scale
  get.accessor = key

  return get
}
