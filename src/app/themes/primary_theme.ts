"use client"
import { createTheme, responsiveFontSizes } from "@mui/material/styles"
import type {} from "@mui/x-date-pickers/themeAugmentation"
import { inter } from "../utils/definitions/fonts"

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
            fontFamily: inter.style.fontFamily,
        },
        components: {
            MuiPickersCalendarHeader: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        color: teal,
                    },
                },
            },
            MuiPickersYear: {
                styleOverrides: {
                    root: {
                        backgroundColor: "white",
                        color: teal,
                    },
                },
            },
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
                        color: teal,
                    },
                },
                variants: [
                    { 
                        props: { variant: "black" },
                        style: {
                            color: "black",
                        },
                    },
                ],
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
                styleOverrides: {
                    root: {
                        color: "white",
                        "&.Mui-checked": {
                            color: "white",
                        },
                    },
                },
                variants: [
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
