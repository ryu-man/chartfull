export function css(node, style) {
    const stylesheet = node.style;
    Object.entries(style || {}).forEach(elem => {
        if (elem[1]) stylesheet[elem[0]] = elem[1]
    });
}export function register(node, events) {
    Object.keys(events).forEach(key => node.addEventListener(key, events[key]));
    return () => {
        Object.keys(events).forEach(key => node.addEventListener(key, events[key]));
    };
}

// export {EventMap} from './events'
