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
    const [inviteUser, setInviteUser] = React.useState<string | null>("")

    const { trigger, isMutating, data, error } = useSWRMutation("/api/register", fetcher)

    return (
        <div className="w-full bg-panel">
            <div className=" py-2">
                <div className="w-full flex pb-2">
                    <div className="w-1/3 px-2">
                        <Typography>
                            User name
                        </Typography>
                    </div>
                    <div className="w-2/3 flex px-2">
                        <TextField
                            required
                            value={inviteUser}
                            size="small"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setInviteUser(event.target.value)
                                }
                            }
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="w-full flex pb-2">
                    <div className="w-1/3 px-2">
                        <Typography>
                            Password
                        </Typography>
                    </div>
                    <div className="w-2/3 flex px-2">
                        <TextField
                            required
                            value={inviteUser}
                            size="small"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setInviteUser(event.target.value)
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