"use client"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { IconButton } from "@mui/material"
import Link from "next/link"
import useSWRMutation from "swr/mutation"
import { useRouter } from "next/navigation"

const fetcher = async (url: string, { arg }: { arg: undefined }) => {
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

export default function Navbar() {
    const { trigger, isMutating } = useSWRMutation("/api/logout", fetcher)
    const router = useRouter()

    const handleSubmit = async () => {
        const response = await trigger()

        if (response.message.success) {
            router.push("/login")
        }
    }

    return (
        <div className="flex bg-bar">
            <div className="items-start mr-auto ml-2 my-1">
                <Link href="/settings">
                    <IconButton aria-label="settings" color="secondary" size="large">
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
                </Link>
            </div>
            <div className="items-end mr-2 my-1">
                <IconButton aria-label="logout" color="secondary" size="large" disabled={isMutating} onClick={handleSubmit}>
                    <LogoutIcon fontSize="inherit" />
                </IconButton>
            </div>
        </div>
    )
}