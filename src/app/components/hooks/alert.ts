"use client"
import { useState } from "react"

const AlertState = () => {
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    return {
        message,
        success,
        setMessage,
        setSuccess,
    }
}

export default AlertState