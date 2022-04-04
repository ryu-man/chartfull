import { path } from "../path";
import array from "./array.js";
import constant from "./constant.js";
import curveLinear from "./curve/linear.js";
import { x as pointX, y as pointY } from "./point.js";

export default function (x, y) {
    let defined = constant(true)
    let context = null
    let curve = curveLinear
    let output = null;

    x = typeof x === "function" ? x : (x === undefined) ? pointX : constant(x);
    y = typeof y === "function" ? y : (y === undefined) ? pointY : constant(y);

    function line(data) {
        let i
        let n = (data = array(data)).length
        let d
        let defined0 = false
        let buffer;

        if (context == null) output = curve(buffer = path());

        for (i = 0; i <= n; ++i) {
            if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                if (defined0 = !defined0) output.lineStart();
                else output.lineEnd();
            }
            if (defined0) output.point(+x(d, i, data), +y(d, i, data));
        }

        if (buffer) {
            return output = null, buffer() || [];
        }
    }

    line.x = function (_) {
        return arguments.length ? (x = typeof _ === "function" ? _ : constant(+_), line) : x;
    };

    line.y = function (_) {
        return arguments.length ? (y = typeof _ === "function" ? _ : constant(+_), line) : y;
    };

    line.defined = function (_) {
        return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
    };

    line.curve = function (_) {
        return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
    };

    line.context = function (_) {
        return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
    };

    return line;
}
