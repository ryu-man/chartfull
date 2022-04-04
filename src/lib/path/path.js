const pi = Math.PI
const tau = 2 * pi
const epsilon = 1e-6
const tauEpsilon = tau - epsilon

function path() {
    let data = []
    const builder = () => data

    builder.moveTo = (x, y) => {
        return data = [...data, ['M', +x, +y]]
    }
    builder.closePath = () => {
        return data = [...data, ['Z']]
    }
    builder.lineTo = (x, y) => {
        return data = [...data, ['L', +x, +y]]
    }
    builder.quadraticCurveTo = (x1, y1, x, y) => {
        return data = [...data, ['Q', +x1, +y1, +x, +y]]
    }
    builder.bezierCurveTo = (x1, y1, x, y) => {
        return data = [...data, ['C', +x1, +y1, +x, +y]]
    }
    builder.arcTo = (x1, y1, x2, y2, r) => {
        const x0 = data[0][1],
            y0 = data[0][2],
            x21 = x2 - x1,
            y21 = y2 - y1,
            x01 = x0 - x1,
            y01 = y0 - y1,
            l01_2 = x01 * x01 + y01 * y01

        if (+r < 0) throw new Error('negative radius: ' + r)
        if (!data.length) {
            return data = [...data, ['M', +x1, +y1]]
        }

        if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
            // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
            // Equivalently, is (x1,y1) coincident with (x2,y2)?
            // Or, is the radius zero? Line to (x1,y1).
            return data = [...data, ['L', x1, y1]]
        } else {
            const x20 = x2 - x0,
                y20 = y2 - y0,
                l21_2 = x21 * x21 + y21 * y21,
                l20_2 = x20 * x20 + y20 * y20,
                l21 = Math.sqrt(l21_2),
                l01 = Math.sqrt(l01_2),
                l =
                    r *
                    Math.tan(
                        (pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2
                    ),
                t01 = l / l01,
                t21 = l / l21

            // If the start tangent is not coincident with (x0,y0), line to.
            if (Math.abs(t01 - 1) > epsilon) {
                return data = [...data, ['L', x1 + t01 * x01, y1 + t01 * y01]]
            }
            return data = [
                ...data,
                ['A', r, r, 0, 0, y01 * x20 > x01 * y20, x1 + t21 * x21, y1 + t21 * y21]
            ]
        }
    }
    builder.arc = (x, y, r, a0, a1, ccw) => {
        ; (x = +x), (y = +y), (r = +r), (ccw = !!ccw)
        const dx = r * Math.cos(a0),
            dy = r * Math.sin(a0),
            x0 = x + dx,
            y0 = y + dy,
            cw = 1 ^ ccw
        let da = ccw ? a0 - a1 : a1 - a0

        // Is the radius negative? Error.
        if (r < 0) throw new Error('negative radius: ' + r)

        // Is this path empty? Move to (x0,y0).
        if (!data.length) {
            return data = [...data, ['M', x0, y0]]
        }

        // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
        else if (
            Math.abs(this._x1 - x0) > epsilon ||
            Math.abs(this._y1 - y0) > epsilon
        ) {
            return data = [...data, ['L', x0, y0]]
        }

        // Is this arc empty? We’re done.
        if (!r) return

        // Does the angle go the wrong way? Flip the direction.
        if (da < 0) da = (da % tau) + tau

        // Is this a complete circle? Draw two arcs to complete the circle.
        if (da > tauEpsilon) {
            return data = [
                ...data,
                ['A', r, r, 0, 1, cw, x - dx, y - dy, 'A', r, r, 0, 1, cw, x0, y0]
            ]
        }

        // Is this arc non-empty? Draw an arc!
        else if (da > epsilon) {
            return data = [
                ...data,
                [
                    'A',
                    r,
                    r,
                    0,
                    +(da >= pi),
                    cw,
                    x + r * Math.cos(a1),
                    y + r * Math.sin(a1)
                ]
            ]
        }
    }
    builder.rect = (x, y, w, h) => {
        return data = [...data, ['M', +x, +y, 'h', +w, 'v', +h, 'h', -w, 'Z']]
    }
    builder.toString = () => data.map(([c, ...rest]) => c + rest.join(',')).join('')

    return builder
}



export default path
