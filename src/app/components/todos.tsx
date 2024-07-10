"use client"
import { useState, MouseEvent as ReactMouseEvent, SyntheticEvent as ReactSyntheticEvent } from "react"
import Typography from "@mui/material/Typography"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import * as data from "../utils/example" // For testing
const toDos = data.toDos.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

const iconStyle = {
    fontSize: "0.9rem",
    color: "white",
}

function addTodos(tasks: data.Task[], indexDay: number) {
    const elements: JSX.Element[] = []
    
    tasks.forEach((task, index) => {
        elements.push(
            <div className="w-full" key={"task" + (index + 1)}>
                <FormControlLabel
                    data-day={indexDay}
                    data-task={index}
                    control={
                        <Checkbox />
                    } 
                    label={task.due + " - " + task.name}
                />
            </div>
        )
    })

    return elements
}

export default function Todos() {
    const elements: JSX.Element[] = []

    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null)
    
    const handleContextMenu = (event: ReactMouseEvent) => {
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

    const [expanded, setExpanded] = useState<string | false>("panel1")

    const handleChange =
        (panel: string) => (event: ReactSyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false)
        }
    
    toDos.forEach((day, index) => {
        elements.push(
            <div className="xl:w-3/4 3xl:w-2/3 4xl:w-1/2 m-auto" key={"day" + (index + 1)}>
                <Accordion
                    expanded={expanded === "panel" + (index + 1)}
                    onChange={handleChange("panel" + (index + 1))}
                    slotProps={{ transition: { unmountOnExit: true } }}
                    disableGutters
                    elevation={0}
                    square
                >
                    <AccordionSummary
                        aria-controls={"panel" + (index + 1) + "d-content"} id={"panel" + (index + 1) + "d-header"}
                        expandIcon={<ArrowForwardIosSharpIcon sx={iconStyle}/>}
                    >
                        <Typography>{day.date}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
                            {addTodos(day.tasks, index)}

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
                                <MenuItem variant="black" onClick={handleClose}>Edit</MenuItem>
                            </Menu>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    })

    return elements
}