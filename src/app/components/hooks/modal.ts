"use client"
import React from "react"

const ModalState = () => {
    const [isOpen, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return {
        isOpen,
        handleOpen,
        handleClose,
    }
}

export default ModalState