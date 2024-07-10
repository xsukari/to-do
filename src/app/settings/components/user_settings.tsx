"use client"
import { useState, ChangeEvent as ReactChangeEvent} from "react"
import { Typography, InputAdornment } from "@mui/material"
import TextField from "@mui/material/TextField"

export default function UserSettings() {
    const [remindAfter, setRemindAfter] = useState<string>("")

    return (
        <div className="w-full bg-panel 2xl:w-3/4 3xl:w-2/3 4xl:w-1/2 m-auto">
            <div className="flex flex-col lg:flex-row py-2">
                <div className="lg:w-1/3 px-2 py-2 lg:py-0">
                    <div className="flex items-center">
                        <Typography>
                            Additional reminder after
                        </Typography>
                    </div>
                    <div className="flex items-center">
                        <Typography variant="caption">
                            0 or no value disables it
                        </Typography>
                    </div>

                </div>
                <div className="flex flex-grow px-2">
                    <TextField
                        value={remindAfter}
                        size="small"
                        placeholder="15"
                        onChange={
                            (event: ReactChangeEvent<HTMLInputElement>) => {
                                setRemindAfter(event.target.value)
                            }
                        }
                        className="w-full"
                        InputProps={{
                            endAdornment: 
                                <InputAdornment position="end">
                                        minutes
                                </InputAdornment>,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}