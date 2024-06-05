import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { IconButton } from "@mui/material"
import Link from "next/link"

export default function Navbar() {

    return (
        <div className="flex">
            <div className="items-start mr-auto ml-2 my-1">
                <Link href="/">
                    <IconButton aria-label="settings" color="secondary" size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}