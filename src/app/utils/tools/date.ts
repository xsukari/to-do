import dayjs, { ManipulateType } from "dayjs"

function timeUnit(unit: string): ManipulateType {
    let result: ManipulateType

    switch (unit) {
    case "d":
        result = "d"
        break
    case "w":
        result = "w"
        break
    case "M":
        result = "M"
        break
    default:
        result = "d"
        break
    }

    return result
}

export function dateFromRangeValue(rangeValue: string | undefined, dateInPast: boolean) {
    let result = dayjs().set("s", 0).set("m", 0).set("h", 0).set("ms", 0)

    if (rangeValue?.length !== 2) {
        return result.toDate()
    }

    const unit = rangeValue[1]
    const value = parseInt(rangeValue[0])

    if (dateInPast) {
        result = result.subtract(value, timeUnit(unit))
    } else {
        result = result.add(value, timeUnit(unit))
    }

    return result.toDate()
}