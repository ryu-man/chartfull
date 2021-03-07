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

export function getInnerSize(
  { width = 0, height = 0 },
  { top = 0, right = 0, bottom = 0, left = 0 }
) {
  return {
    innerWidth: width - left - right,
    innerHeight: height - top - bottom
  }
}

export function classNames(...args) {
  return args
    .filter(Boolean)
    .map((o) => o.trim())
    .join(' ')
}

// export {EventMap} from './events'
