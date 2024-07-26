import dayjs, { ManipulateType } from "dayjs"
import utc from "dayjs/plugin/utc"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"

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
    dayjs.extend(utc)

    let result = dayjs().set("s", 0).set("m", 0).set("h", 0).set("ms", 0).utc()

    if (rangeValue?.length !== 2) {
        return result.toISOString()
    }

    const unit = rangeValue[1]
    const value = parseInt(rangeValue[0])

    if (dateInPast) {
        result = result.subtract(value, timeUnit(unit))
    } else {
        result = result.add(value, timeUnit(unit))
    }

    return result.toISOString()
}

export function indexOfClosestDate(dates: string[]) {
    dayjs.extend(isSameOrAfter)

    const today = dayjs().set("h", 0).set("m", 0).set("s", 0).set("ms", 0)

    let indexOfSmallestDifference = 1
    let smallestDifference: number | null = null
    
    dates.forEach((value, index) => {
        const date = dayjs(value)

        if (date.isSameOrAfter(today)) {
            const difference = date.diff(today)

            if (smallestDifference === null || difference < smallestDifference) {
                smallestDifference = difference
                indexOfSmallestDifference = index
            }
        }
    })

    return indexOfSmallestDifference + 1
}

export function utcString(date: dayjs.Dayjs) {
    dayjs.extend(utc)

    return date.utc().toISOString()
}