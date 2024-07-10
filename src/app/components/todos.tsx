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
const todos = data.toDos.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))

const iconStyle = {
    fontSize: "0.9rem",
    color: "white",
}

function addTodos(todos: data.Todo[], indexDay: number) {
    const elements: JSX.Element[] = []
    
    todos.forEach((todo, index) => {
        elements.push(
            <div className="w-full" key={"todo" + (index + 1)}>
                <FormControlLabel
                    data-day={indexDay}
                    data-todo={index}
                    control={
                        <Checkbox />
                    } 
                    label={todo.due + " - " + todo.name}
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
        const todoIndex = event.target["parentNode" as keyof object]["dataset"]["todo"]
        if (dayIndex && todoIndex) {
            console.log(todos[dayIndex].todos[todoIndex])
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
    
    todos.forEach((day, index) => {
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
                            {addTodos(day.todos, index)}

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