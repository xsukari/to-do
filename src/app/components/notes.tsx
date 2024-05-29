"use client"
import React from "react"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion"
import MuiAccordionSummary, { AccordionSummaryProps } from "@mui/material/AccordionSummary"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import * as data from "./data" // For testing

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

    const [contextMenu, setContextMenu] = React.useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null)
    
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault()
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : null,
        )
    }
    
    const handleClose = () => {
        setContextMenu(null)
    }

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
                    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
                        {addNotes(day.tasks)}

                        <Menu
                            open={contextMenu !== null}
                            onClose={handleClose}
                            anchorReference="anchorPosition"
                            anchorPosition={
                                contextMenu !== null
                                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                    : undefined
                            }
                        >
                            <MenuItem onClick={handleClose} sx={{ color: "text.secondary" }}>Edit</MenuItem>
                        </Menu>
                    </div>
                </AccordionDetails>
            </Accordion>
        )

        i++
    })

    return elements
}