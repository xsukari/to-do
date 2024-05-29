"use client"
import React from "react"
import Typography from "@mui/material/Typography"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { styled } from "@mui/material/styles"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"

import * as data from "./data"

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "0px solid rgba(0, 0, 0, .125)",
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "secondary.main" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}))

function addNotes(tasks: data.Task[]) {
    const elements: JSX.Element[] = []
    
    let i = 1
    tasks.forEach(task => {
        elements.push(
            <div className="w-full" key={"task" + i}>
                <FormControlLabel
                    control={
                        <Checkbox 
                            sx={{
                                color: "secondary.main",
                                "&.Mui-checked": {
                                    color: "secondary.main",
                                },
                            }}
                        />
                    } 
                    label={task.name}
                />
            </div>
        )

        i++
    })

    return elements
}

export default function Notes() {
    const elements: JSX.Element[] = []

    const [expanded, setExpanded] = React.useState<string | false>("panel1")

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false)
        }
    
    let i = 1
    data.toDos.forEach(day => {
        elements.push(
            <Accordion key={"day" + i}
                expanded={expanded === "panel" + i} onChange={handleChange("panel" + i)}
                slotProps={{ transition: { unmountOnExit: true } }}
                sx={{ bgcolor: "primary.main", color: "text.primary" }}
            >
                <AccordionSummary aria-controls={"panel" + i + "d-content"} id={"panel" + i + "d-header"}>
                    <Typography>{day.date}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {addNotes(day.tasks)}
                </AccordionDetails>
            </Accordion>
        )

        i++
    })

    return elements
}