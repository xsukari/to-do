import Navbar from "./components/navbar"
import UserSettings from "./components/user_settings"
import AdminSettings from "./components/admin_settings"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../settings_theme"

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-screen m-auto">
            <div className="w-full bg-main">
                <div className="bg-bar">
                    <Navbar />
                </div>

                <ThemeProvider theme={theme}>
                    <div className="w-3/4 m-auto mt-12">
                        <div className="mb-12">
                            <UserSettings />
                        </div>
                        <div className="mt-12">
                            <AdminSettings />
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        </main>
    )
}
