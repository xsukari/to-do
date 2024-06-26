"use client"
import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Typography } from "@mui/material"
import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { Auth } from "../../data/types"

const fetcher = async (url: string, { arg }: { arg: Auth }) => {
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

export default function Form() {
    const [email, setEmail] = React.useState<string | null>("")
    const [username, setUsername] = React.useState<string | null>("")
    const [password, setPassword] = React.useState<string | null>("")
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string | null>("")

    const { trigger, isMutating/*, data, error */} = useSWRMutation("/api/register", fetcher)

    const handleSubmit = async () => {
        const response = await trigger({ 
            email: email,
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation 
        } as Auth)
        
        console.log(response.message)
    }

    return (
        <div className="w-full bg-panel lg:w-1/2 2xl:w-1/3 m-auto">
            <div className="py-2">
                <div className="flex-grow px-2 pb-2">
                    <TextField
                        label="Email"
                        value={email}
                        size="small"
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setEmail(event.target.value)
                            }
                        }
                        className="w-full"
                    />
                </div>
                <div className="flex-grow px-2 pb-2">
                    <TextField
                        label="Username"
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
                <div className="flex-grow px-2 pb-2">
                    <TextField
                        label="Password"
                        value={password}
                        size="small"
                        type="password"
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setPassword(event.target.value)
                            }
                        }
                        className="w-full"
                    />
                </div>
                <div className="flex-grow px-2 pb-2">
                    <TextField
                        label="Repeat password"
                        value={passwordConfirmation}
                        size="small"
                        type="password"
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setPasswordConfirmation(event.target.value)
                            }
                        }
                        className="w-full"
                    />
                </div>
                <div className="px-2 pb-2">
                    <Link href="/login">
                        <Typography variant="caption">
                                Already have an account?
                        </Typography>
                    </Link>
                </div>
                <div className="w-1/4 px-2 m-auto">
                    <Button
                        variant="outlined" 
                        className="w-full"
                        disabled={isMutating}
                        onClick={() => {
                            handleSubmit()
                        }}
                    >
                        Register
                    </Button>
                </div>
            </div>
        </div>
    )
}