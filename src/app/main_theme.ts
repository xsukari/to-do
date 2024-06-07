"use client"
import { Roboto } from "next/font/google"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import type {} from "@mui/x-date-pickers/themeAugmentation"

const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
})

const teal = "#009688"

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
                secondary: "#000000",
            }
        },
        typography: {
            fontFamily: roboto.style.fontFamily,
        },
        components: {
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        backgroundColor: "rgba(0, 0, 0, .03)",
                        flexDirection: "row-reverse",
                        "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                            transform: "rotate(90deg)",
                        },
                        "& .MuiAccordionSummary-content": {
                            marginLeft: "8px",
                        },
                    },
                },
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        padding: "16px",
                        borderTop: "0px",
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        color: "white"
                    },
                },
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        backgroundColor: teal,
                        color: "white",
                        border: "0px",
                        "&:not(:last-child)": {
                            borderBottom: 0,
                        },
                        "&::before": {
                            display: "none",
                        },
                    },
                },
            },
            MuiCheckbox: {
                variants: [
                    {
                        props: { variant: "white" },
                        style: {
                            color: "white",
                            "&.Mui-checked": {
                                color: "white",
                            },
                        },
                    },
                    { 
                        props: { variant: "teal" }, 
                        style: {
                            color: teal,
                            "&.Mui-checked": {
                                color: teal,
                            },
                        },
                    },
                ],
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        color: teal,
                    },
                },
            },
            MuiMultiSectionDigitalClock: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        color: teal,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "& .MuiOutlinedInput-input": {
                            color: "black",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: teal,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: teal,
                            borderWidth: "2px",
                        },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: teal, // Default border color
                            },
                            "&:hover fieldset, &.Mui-focused fieldset": { // Target both hover and focused states
                                borderColor: teal,
                                borderWidth: "2px",
                            },
                        },
                    },
                },
            },
            MuiPickersInput: {
                styleOverrides: {
                    root: {
                        color: "black",
                    },
                },
            },
        },
    })
)

export default theme
