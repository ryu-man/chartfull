export default (scale, accessor) => {
    const get = (value) => scale(accessor(value))

    get.scale = scale
    get.accessor = accessor

    return get
}