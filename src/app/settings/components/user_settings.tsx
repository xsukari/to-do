"use client"
import React from "react"
import { Typography, InputAdornment } from "@mui/material"
import TextField from "@mui/material/TextField"

export default function UserSettings() {
    const [remindAfter, setRemindAfter] = React.useState<string | null>("0")

    return (
        <div>
            <div className="w-full flex bg-panel">
                <div className="w-1/3">
                    <Typography color="text.primary">TEST</Typography>
                </div>
                <div className="w-2/3">
                    <TextField
                        required
                        value={remindAfter}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setRemindAfter(event.target.value)
                            }
                        }
                        className="w-full"
                        InputProps={{
                            endAdornment: <InputAdornment
                                position="end"
                                sx={{
                                    "& .MuiTypography-root": {
                                        color: "text.primary",
                                    },
                                }}
                            >
                                    minutes
                            </InputAdornment>,
                        }}
                        sx={{
                            input: {
                                color: "text.primary",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "primary.main",
                            },
                        }}
                    />
                </div>
            </div>

        </div>
    )
}