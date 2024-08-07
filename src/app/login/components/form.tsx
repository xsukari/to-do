"use client"
import { useState, ChangeEvent as ReactChangeEvent } from "react"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Typography } from "@mui/material"
import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { LoginCredentials } from "../../utils/definitions/types"
import Alert from "@mui/material/Alert"
import { useRouter } from "next/navigation"

const fetcher = async (url: string, { arg }: { arg: LoginCredentials }) => {
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
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const { trigger, isMutating } = useSWRMutation("/api/login", fetcher)
    const router = useRouter()
    
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    const handleSubmit = async () => {
        const response = await trigger({ 
            username: username,
            password: password,
        } as LoginCredentials)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        if (response.message.success) {
            setTimeout(() => {
                router.push("/")
            }, 4000)
        } else {
            setTimeout(() => {
                setMessage("")
            }, 10000)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed w-3/4">
                {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
            </div>
            <div className="w-full bg-panel lg:w-1/2 2xl:w-1/3 m-auto">
                <div className="py-2">
                    <form onSubmit={() => {handleSubmit()}}>
                        <div className="flex-grow px-2 pb-2">
                            <TextField
                                label="Username"
                                value={username}
                                size="small"
                                onChange={
                                    (event: ReactChangeEvent<HTMLInputElement>) => {
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
                                    (event: ReactChangeEvent<HTMLInputElement>) => {
                                        setPassword(event.target.value)
                                    }
                                }
                                className="w-full"
                            />
                        </div>
                        <div className="px-2 pb-2">
                            <Link href="/register">
                                <Typography variant="caption">
                                        Not registered yet?
                                </Typography>
                            </Link>
                        </div>
                        <div className="w-1/4 px-2 m-auto">
                            <Button
                                type="submit"
                                variant="outlined" 
                                className="w-full"
                                disabled={isMutating}
                                onClick={() => {
                                    handleSubmit()
                                }}
                            >
                                Login
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}