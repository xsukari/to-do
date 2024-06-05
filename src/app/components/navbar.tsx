"use client"
import React from "react"
import Bar from "./bar"
import Todo_modal from "./todo_modal"
import ModalState from "./hooks/modal"

export default function Navbar() {
    const { isOpen, handleOpen, handleClose } = ModalState()

    return (
        <div>
            <Bar handleOpen={handleOpen} />
            {isOpen && <Todo_modal isOpen={isOpen} handleClose={handleClose} />}
        </div>
    )
}