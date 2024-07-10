"use client"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { IconButton } from "@mui/material"
import Link from "next/link"

export default function Navbar() {
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
                <IconButton aria-label="logout" color="secondary" size="large">
                    <LogoutIcon fontSize="inherit" />
                </IconButton>
            </div>
        </div>
    )
}