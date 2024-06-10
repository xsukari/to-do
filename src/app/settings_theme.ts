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
                main: "#ffffff",
            },
            secondary: {
                main: "#ffffff",
            },
            text: {
                primary: "#ffffff",
                secondary: "#ffffff",
            }
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    outlined: {
                        borderColor: "white",
                        padding: "7px 17px",
                        "&:hover": {
                            borderColor: "white",
                            borderWidth: "2px",
                            padding: "6px 16px",
                        },
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: "white",
                    },
                    caption: {
                        fontSize: 10,
                    },
                },
            },
            MuiInputAdornment: {
                styleOverrides: {
                    root: {
                        "& .MuiTypography-root": {
                            color: "white",
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                            borderWidth: "2px",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "white",
                        },
                    },
                },
            },
        }
    })
)

export default theme
