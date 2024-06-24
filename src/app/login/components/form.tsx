"use client"
import React from "react"
import { Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import useSWRMutation from "swr/mutation"
import { Auth } from "../../data/types"

// const fetcher = (url: URL | RequestInfo, init?: RequestInit | undefined) => fetch(url, init).then((res) => res.json())

const fetcher = async (url: string, { arg }: { arg: Auth }) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // or the appropriate content type for your API
        },
        body: JSON.stringify(arg),
    })
  
    if (!response.ok) {
        throw new Error("An error occurred while fetching the data.")
    }
  
    return response.json()
}

export default function Form() {
    const [username, setUsername] = React.useState<string | null>("")
    const [password, setPassword] = React.useState<string | null>("")

    const { trigger, isMutating, data, error } = useSWRMutation("/api/login", fetcher)

    return (
        <div className="w-full bg-panel">
            <div className="py-2">
                <div className="flex flex-col md:flex-row pb-2">
                    <div className="md:w-1/3 px-2 py-2 md:py-0">
                        <Typography>
                            Username
                        </Typography>
                    </div>
                    <div className="flex-grow px-2">
                        <TextField
                            required
                            value={username}
                            size="small"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setUsername(event.target.value)
                                }
                            }
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row pb-2">
                    <div className="md:w-1/3 px-2 py-2 md:py-0">
                        <Typography>
                            Password
                        </Typography>
                    </div>
                    <div className="flex-grow px-2">
                        <TextField
                            required
                            value={password}
                            size="small"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setPassword(event.target.value)
                                }
                            }
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="w-1/4 px-2 m-auto">
                    <Button
                        variant="outlined" 
                        className="w-full"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}