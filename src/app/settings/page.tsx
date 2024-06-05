import Navbar from "./components/navbar"
export default function Home() {
    return (
        <main className="flex min-h-screen min-w-screen m-auto">
            <div className="w-full bg-main">
                <div className="bg-control">
                    <Navbar />
                </div>

                <div className="w-3/4 m-auto mt-12">

                </div>
            </div>
        </main>
    )
}
