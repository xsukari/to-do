"use client"
import {
    useState,
    useEffect,
    ChangeEvent as ReactChangeEvent,
} from "react"
import { Typography, InputAdornment } from "@mui/material"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import { timeRange } from "../../utils/definitions/values"
import Checkbox from "@mui/material/Checkbox"
import { Settings, SetSettings } from "../../utils/definitions/types"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import PropTypes from "prop-types"
import AlertState from "../../components/hooks/alert"
import Alert from "@mui/material/Alert"

const fetcherGet = (url: URL | RequestInfo, init?: RequestInit | undefined) => fetch(url, init).then((res) => res.json())
const fetcherPost = async (url: string, { arg }: { arg: SetSettings }) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
    })
  
    if (!response.ok) {
        throw new Error("An error occurred while fetching the data.")
    }
  
    return response.json()
}

function ChangeUsername() {
    return (
        <div>

        </div>
    )
}

function ChangePassword() {
    return (
        <div>
            
        </div>
    )
}

function ChangeEmail() {
    return (
        <div>
            
        </div>
    )
}

interface ReminderProps {
    remindAfter: string
    setMessage: (arg: string) => void
    setSuccess: (arg: boolean) => void
}
const AdditionalReminderAfter = ({ remindAfter, setMessage, setSuccess }: ReminderProps) => {
    const [additionalReminderAfter, setAdditionalReminderAfter] = useState<string>(remindAfter)

    useEffect(() => {
        setAdditionalReminderAfter(remindAfter)
    }, [remindAfter])

    const { trigger } = useSWRMutation("/api/update-setting", fetcherPost)

    const updateSetting = async () => {
        const response = await trigger({ 
            additionalReminderAfter: additionalReminderAfter,
        } as SetSettings)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        setTimeout(() => {
            setMessage("")
        }, 10000)
    }

    return (
        <div className="flex flex-col lg:flex-row py-2">
            <div className="lg:w-1/3 px-2 py-2 lg:py-0 items-center">
                <Typography>
                    Additional reminder after
                </Typography>
                <div className="flex">
                    <Typography variant="caption">
                        0 or no value disables it
                    </Typography>
                </div>
            </div>
            <div className="flex flex-grow px-2">
                <TextField
                    value={additionalReminderAfter}
                    size="small"
                    onChange={
                        (event: ReactChangeEvent<HTMLInputElement>) => {
                            setAdditionalReminderAfter(event.target.value)
                        }
                    }
                    onBlur={
                        () => {
                            updateSetting()
                        }
                    }
                    className="w-full"
                    inputProps={{
                        pattern: "[0-9]*",
                    }}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                    minutes
                            </InputAdornment>,
                    }}
                />
            </div>
        </div>
    )
}
AdditionalReminderAfter.propTypes = {
    remindAfter: PropTypes.string.isRequired,
    setMessage: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
}

interface ShowProps {
    showIncomplete: boolean
    setMessage: (arg: string) => void
    setSuccess: (arg: boolean) => void
}
const AlwaysShowIncomplete = ({ showIncomplete, setMessage, setSuccess }: ShowProps) => {
    const [alwaysShowIncomplete, setAlwaysShowIncomplete] = useState<boolean>(showIncomplete)

    useEffect(() => {
        setAlwaysShowIncomplete(showIncomplete)
    }, [showIncomplete])

    const { trigger } = useSWRMutation("/api/update-setting", fetcherPost)

    const updateSetting = async (alwaysShowIncomplete: boolean) => {
        const response = await trigger({ 
            alwaysShowIncomplete: alwaysShowIncomplete.toString(),
        } as SetSettings)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        setTimeout(() => {
            setMessage("")
        }, 10000)
    }

    return (
        <div className="flex flex-col lg:flex-row py-2">
            <div className="lg:w-1/3 px-2 py-2 lg:py-0">
                <Typography>
                    Always show past incomplete todos
                </Typography>
            </div>
            <div className="">
                <Checkbox
                    checked={alwaysShowIncomplete}
                    onChange={
                        (event: ReactChangeEvent<HTMLInputElement>) => {
                            setAlwaysShowIncomplete(event.target.checked)
                            updateSetting(event.target.checked)
                        }
                    }
                />
            </div>
        </div>
    )
}
AlwaysShowIncomplete.propTypes = {
    showIncomplete: PropTypes.bool.isRequired,
    setMessage: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
}

interface TimeProps {
    rangePast: string
    rangeFuture: string
    setMessage: (arg: string) => void
    setSuccess: (arg: boolean) => void
}
const TimeRange = ({ rangePast, rangeFuture, setMessage, setSuccess }: TimeProps) => {
    const [timeRangePast, setTimeRangePast] = useState<string>(rangePast)
    const [timeRangeFuture, setTimeRangeFuture] = useState<string>(rangeFuture)

    useEffect(() => {
        setTimeRangePast(rangePast)
    }, [rangePast])

    useEffect(() => {
        setTimeRangeFuture(rangeFuture)
    }, [rangeFuture])

    const { trigger } = useSWRMutation("/api/update-setting", fetcherPost)

    const updateSettingPast = async (timeRangePast: string) => {
        const response = await trigger({ 
            timeRangePast: timeRangePast.toString(),
        } as SetSettings)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        setTimeout(() => {
            setMessage("")
        }, 10000)
    }

    const updateSettingFuture = async (timeRangeFuture: string) => {
        const response = await trigger({ 
            timeRangeFuture: timeRangeFuture.toString(),
        } as SetSettings)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        setTimeout(() => {
            setMessage("")
        }, 10000)
    }

    const timeOptionsPast = function() {
        const elements: JSX.Element[] = []

        timeRange.forEach(time => {
            elements.push(
                <MenuItem value={time.value} key={time.text.past}>
                    {time.text.past}
                </MenuItem>
            )
        })
    
        return elements
    }

    const timeOptionsFuture = function() {
        const elements: JSX.Element[] = []

        timeRange.forEach(time => {
            elements.push(
                <MenuItem value={time.value} key={time.text.future}>
                    {time.text.future}
                </MenuItem>
            )
        })
    
        return elements
    }

    return (
        <div className="flex flex-col lg:flex-row py-2">
            <div className="lg:w-1/3 px-2 py-2 lg:py-0">
                <Typography>
                    Show todos
                </Typography>
            </div>
            <div className="flex flex-grow px-2">
                <div className="w-[13%] flex items-center">
                    <Typography>
                        From
                    </Typography>
                </div>
                <div className="w-[37%]">
                    <FormControl fullWidth>
                        <Select
                            value={timeRangePast}
                            size="small"
                            onChange={
                                (event: SelectChangeEvent) => {
                                    setTimeRangePast(event.target.value as string)
                                    updateSettingPast(event.target.value as string)
                                }                            
                            }
                        >
                            {timeOptionsPast()}
                        </Select>
                    </FormControl>
                </div>
                <div className="w-[5%]">
                </div>
                <div className="w-[8%] flex items-center">
                    <Typography>
                        to
                    </Typography>
                </div>
                <div className="w-[37%]">
                    <FormControl fullWidth>
                        <Select
                            value={timeRangeFuture}
                            size="small"
                            onChange={
                                (event: SelectChangeEvent) => {
                                    setTimeRangeFuture(event.target.value as string)
                                    updateSettingFuture(event.target.value as string)
                                }                            
                            }
                        >
                            {timeOptionsFuture()}
                        </Select>
                    </FormControl>
                </div>
            </div>
        </div>
    )
}
TimeRange.propTypes = {
    rangePast: PropTypes.bool.isRequired,
    rangeFuture: PropTypes.bool.isRequired,
    setMessage: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
}

export default function UserSettings() {
    const { message, success, setMessage, setSuccess } = AlertState()

    const { data } = useSWR("/api/settings", fetcherGet)

    const settings = data?.message ? data.message as Settings : null

    const timeRangePast =
        settings?.timeRangePast
            ? settings.timeRangePast
            : ""

    const timeRangeFuture =
        settings?.timeRangeFuture
            ? settings.timeRangeFuture
            : ""

    const alwaysShowIncomplete =
        settings?.alwaysShowIncomplete
            ? settings.alwaysShowIncomplete as boolean
            : false
            
    const additionalReminderAfter =
        settings?.additionalReminderAfter
            ? settings.additionalReminderAfter.toString()
            : ""

    return (
        <div>
            <div className="fixed w-3/4">
                {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
            </div>
            <div className="w-full bg-panel 2xl:w-3/4 3xl:w-2/3 4xl:w-1/2 m-auto">
                <TimeRange rangePast={timeRangePast} rangeFuture={timeRangeFuture} setMessage={setMessage} setSuccess={setSuccess} />
                <AlwaysShowIncomplete showIncomplete={alwaysShowIncomplete} setMessage={setMessage} setSuccess={setSuccess} />
                <AdditionalReminderAfter remindAfter={additionalReminderAfter} setMessage={setMessage} setSuccess={setSuccess} />
                <ChangeEmail />
                <ChangePassword />
                <ChangeUsername />
            </div>
        </div>

    )
}