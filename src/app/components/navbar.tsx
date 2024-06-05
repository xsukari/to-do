"use client"
import React from "react"
import Bar from "./bar"
import Addmodal from "./addmodal"
import ModalState from "./hooks/modal"

export default function Navbar() {
    const { isOpen, handleOpen, handleClose } = ModalState()

    return (
        <div>
            <Bar handleOpen={handleOpen} />
            <Addmodal isOpen={isOpen} handleClose={handleClose} />
        </div>
    )
}