import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./main_theme"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "To-do",
    description: "To-do",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body className={inter.className}>
                <AppRouterCacheProvider /*options={{ enableCssLayer: true }}*/>
                    <ThemeProvider theme={theme}>
                        {children}
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
