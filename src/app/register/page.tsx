import Form from "./components/form"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../themes/secondary_theme"

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-screen m-auto">
            <div className="w-full bg-main">
                <ThemeProvider theme={theme}>
                    <div className="w-3/4 m-auto mt-12">
                        <Form />
                    </div>
                </ThemeProvider>
            </div>
        </main>
    )
}
