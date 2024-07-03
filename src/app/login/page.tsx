import Form from "./components/form"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../themes/secondary_theme"

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-screen">
            <div className="w-full bg-main">
                <ThemeProvider theme={theme}>
                    <div className="w-3/4 m-auto">
                        <Form />
                    </div>
                </ThemeProvider>
            </div>
        </main>
    )
}
