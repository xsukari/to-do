"use client"
import Todos from "./components/todos"
import Navbar from "./components/navbar"
import ModalState from "./components/hooks/modal"
import Todo_modal from "./components/todo_modal"
import Add from "./components/add"

export default function Home() {
    const { isOpen, handleOpen, handleClose } = ModalState()

    return (
        <main className="flex min-h-screen min-w-screen m-auto">
            <div className="w-full bg-main">
                {isOpen && <Todo_modal isOpen={isOpen} handleClose={handleClose } />}

                <Navbar />

                <div className="w-3/4 m-auto mt-12">
                    <Todos />
                </div>

                <div className="fixed bottom-0 right-0">
                    <Add handleOpen={handleOpen} />
                </div>
            </div>
        </main>
    )
}
