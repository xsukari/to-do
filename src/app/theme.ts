"use client"
import { Roboto } from "next/font/google"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
})

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: "#3f50b5",
            },
            secondary: {
                main: "#f44336",
            },
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
    })
)

export default theme
