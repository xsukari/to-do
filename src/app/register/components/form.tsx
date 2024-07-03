"use client"
import React from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Typography } from "@mui/material"
import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { RegistrationCredentials } from "../../utils/definitions/types"
import Alert from "@mui/material/Alert"
import { useRouter } from "next/navigation"

const fetcher = async (url: string, { arg }: { arg: RegistrationCredentials }) => {
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
    const [email, setEmail] = React.useState<string>("")
    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>("")

    const { trigger, isMutating } = useSWRMutation("/api/register", fetcher)

    const router = useRouter()
    const [message, setMessage] = React.useState<string>("")
    const [success, setSuccess] = React.useState<boolean>(false)

    const handleSubmit = async () => {
        const response = await trigger({ 
            email: email,
            username: username,
            password: password,
            passwordConfirmation: passwordConfirmation 
        } as RegistrationCredentials)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        if (response.message.success) {
            setTimeout(() => {
                router.push("/login")
            }, 5000)
        }

        setTimeout(() => {
            setMessage("")
        }, 10000)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="h-12">
                {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
            </div>
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
        </div>
    )
}