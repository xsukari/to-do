import Notes from "./components/notes"

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-screen m-auto">
            <div className="w-full bg-main">
                <div className="w-3/4 m-auto">
                    <Notes />
                </div>
            </div>
        </main>
    )
}
