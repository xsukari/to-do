import Navbar from "./components/navbar"
import UserSettings from "./components/user_settings"
import AdminSettings from "./components/admin_settings"

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-screen m-auto">
            <div className="w-full bg-main">
                <div className="bg-bar">
                    <Navbar />
                </div>

                <div className="w-3/4 m-auto mt-12">
                    <UserSettings />
                    <AdminSettings />
                </div>
            </div>
        </main>
    )
}
