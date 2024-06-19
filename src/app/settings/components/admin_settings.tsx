"use client"
import React from "react"
import { Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import useSWR from "swr"

const fetcher = (url: URL | RequestInfo, init?: RequestInit | undefined) => fetch(url, init).then((res) => res.json())

import { users } from "../../data/example" // for testing

function addUsers() {
    const elements: JSX.Element[] = []

    users.forEach(user => {
        elements.push(
            <MenuItem value={user.name} key={user.name}>
                {user.name}
            </MenuItem>
        )
    })

    return elements
}

export default function AdminSettings() {
    const [inviteUser, setInviteUser] = React.useState<string | null>("")
    const [removeUser, setRemoveUser] = React.useState("")

    const handleChange = (event: SelectChangeEvent) => {
        setRemoveUser(event.target.value as string)
    }

    const { data, error } = useSWR("/api/test", fetcher)
    //const { data: dataUpdate, error: errorUpdate } = useSWR("/api/service-update", fetcher)

    if (error) return (<div>Failed to load</div>)
    if (!data) return (<div>Loading...</div>)

    //if (errorUpdate) return (<div>Failed to load</div>)
    //if (!dataUpdate) return (<div>Loading...</div>)

    return (
        <div className="w-full bg-panel">
            <div className="flex items-center py-2">
                <div className="w-1/3 px-2">
                    <Typography>
                        Invite user by email address
                    </Typography>
                </div>
                <div className="w-2/3 flex">
                    <div className="w-3/4 px-2">
                        <TextField
                            required
                            value={inviteUser}
                            size="small"
                            placeholder="user@example.com"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setInviteUser(event.target.value)
                                }
                            }
                            className="w-full"
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Button
                            variant="outlined" 
                            className="w-full"
                        >
                            Invite
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex items-center py-2">
                <div className="w-1/3 px-2">
                    <Typography>
                        Remove user + {data.message}
                    </Typography>
                </div>
                <div className="w-2/3 flex">
                    <div className="w-3/4 px-2">
                        <FormControl fullWidth>
                            <InputLabel id="users-select-label" size="small">User</InputLabel>
                            <Select
                                labelId="users-select-label"
                                id="users-select"
                                value={removeUser}
                                label="User"
                                size="small"
                                onChange={handleChange}
                            >
                                {addUsers()}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="w-1/4 px-2">
                        <Button
                            variant="outlined" 
                            className="w-full"
                        >
                            Remove
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}