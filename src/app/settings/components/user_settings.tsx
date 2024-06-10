"use client"
import React from "react"
import { Typography, InputAdornment } from "@mui/material"
import TextField from "@mui/material/TextField"

export default function UserSettings() {
    const [remindAfter, setRemindAfter] = React.useState<string | null>("")

    return (
        <div className="w-full flex bg-panel items-center py-2">
            <div className="w-1/3 px-2">
                <Typography>
                    Additional reminder after
                </Typography>
                <Typography variant="caption">
                    0 or no value disables it
                </Typography>
            </div>
            <div className="w-2/3 px-2">
                <TextField
                    required
                    value={remindAfter}
                    size="small"
                    placeholder="15"
                    onChange={
                        (event: React.ChangeEvent<HTMLInputElement>) => {
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
    )
}