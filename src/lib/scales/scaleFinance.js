import { scaleUtc } from 'd3-scale'
import { range as sequence } from 'd3-array'

const getFinanceRange = (range = [0, 1], domainLength = 0) => {
    const length = Math.abs(length(range))
    const step = length / Math.max(1, domainLength)

    return sequence(range[0], range[1], step).map((d, i, data) => d + i * (step / data.length))
}

const length = (r0 = 0, r1 = 1) => Math.abs((r0 || 0) - (r1 || 1))

export const scaleFinance = (domain = [0, 1], range = [0, 1]) => {
    let r0 = range[0]
    let r1 = range[1]
    let paddingInner = 0
    let paddingOuter = 0
    let step = 0

    const scale = scaleUtc()
    const financeDomain = scale.domain
    const financeRange = scale.range


    scale.step = function () {
        return length(r0, r1) / Math.max(1, this.domain().length - paddingInner + paddingOuter * 2)
    }

    scale.band = function () {
        return this.step() * (1 - paddingInner)
    }

    scale.padding = function (...args) {
        if (args.length) {
            const padding = args[0] * this.step()
            paddingInner = padding
            paddingOuter = padding
            return this
        }

        return paddingInner + paddingOuter
    }

    scale.paddingInner = function (...args) {
        if (args.length) {
            paddingInner = args[0] * this.step()
            return this
        }
        return paddingInner
    }

    scale.paddingOuter = function (...args) {
        if (args.length) {
            paddingOuter = args[0] * this.step()
            return this
        }
        return paddingOuter
    }

    scale.range = function (...args) {
        if (args.length) {
            r0 = args[0] + scale.band()/2
            r1 = args[1] - scale.band()/2

            return financeRange(sequence(this.domain().length).map((i) => r0 + this.step() * i))
        }
        return financeRange()
    }

    return scale.domain(domain).range(r0, r1)
}
