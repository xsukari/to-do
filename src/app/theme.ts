"use client"
import { Roboto } from "next/font/google"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import type {} from "@mui/x-date-pickers/themeAugmentation"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
})

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            primary: {
                main: "#009688",
            },
            secondary: {
                main: "#ffffff",
            },
            text: {
                primary: "#ffffff",
                secondary: "#000000"
            }
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
        components: {
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        color: "#009688"
                    },
                    /*today: {

                    }*/
                }
            },
            MuiMultiSectionDigitalClock: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        color: "#009688"
                    },
                }
            },
        }
    })
)

export default theme
