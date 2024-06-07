"use client"
import React from "react"
import Typography from "@mui/material/Typography"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import * as data from "../data/example" // For testing
const toDos = data.toDos.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

const iconStyle = {
    fontSize: "0.9rem",
    color: "white",
}

function addTodos(tasks: data.Task[], indexDay: number) {
    const elements: JSX.Element[] = []
    
    let i = 1
    tasks.forEach(task => {
        elements.push(
            <div className="w-full" key={"task" + i}>
                <FormControlLabel
                    data-day={indexDay}
                    data-task={i - 1}
                    control={
                        <Checkbox variant="white"/>
                    } 
                    label={task.due + " - " + task.name}
                />
            </div>
        )

        i++
    })

    return elements
}

export default function Todos() {
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

        const dayIndex = event.target["parentNode" as keyof object]["dataset"]["day"]
        const taskIndex = event.target["parentNode" as keyof object]["dataset"]["task"]
        if (dayIndex && taskIndex) {
            console.log(toDos[dayIndex].tasks[taskIndex])
        }
        //console.log(event)
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
    toDos.forEach(day => {
        elements.push(
            <Accordion
                key={"day" + i}
                expanded={expanded === "panel" + i}
                onChange={handleChange("panel" + i)}
                slotProps={{ transition: { unmountOnExit: true } }}
                disableGutters
                elevation={0}
                square
            >
                <AccordionSummary
                    aria-controls={"panel" + i + "d-content"} id={"panel" + i + "d-header"}
                    expandIcon={<ArrowForwardIosSharpIcon sx={iconStyle}/>}
                >
                    <Typography>{day.date}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
                        {addTodos(day.tasks, i - 1)}

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
                            <MenuItem onClick={handleClose}>Edit</MenuItem>
                        </Menu>
                    </div>
                </AccordionDetails>
            </Accordion>
        )

        i++
    })

    return elements
}