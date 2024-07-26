"use client"
import { useState, MouseEvent as ReactMouseEvent, SyntheticEvent as ReactSyntheticEvent, useEffect } from "react"
import Typography from "@mui/material/Typography"
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import useSWR from "swr"
import { Todo, TodoGroup } from "../utils/definitions/types"
import dayjs from "dayjs"
import { indexOfClosestDate } from "../utils/tools/date"

const fetcher = (url: URL | RequestInfo, init?: RequestInit | undefined) => fetch(url, init).then((res) => res.json())

function addTodos(todos: Todo[], indexDay: number) {
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
                    label={dayjs(todo.due).format("HH:mm") + " - " + todo.name}
                />
            </div>
        )
    })

    return elements
}

export default function Todos() {
    const elements: JSX.Element[] = []

    const iconStyle = {
        fontSize: "0.9rem",
        color: "white",
    }

    const uniqueDates = (todos: Todo[]) => {
        return Array.from(new Set(todos.map((item: Todo) => 
            dayjs(item.due).format("YYYY-MM-DD")
        )))
    }

    const { data } = useSWR("/api/todos", fetcher)
    const [contextMenu, setContextMenu] = useState<{
        mouseX: number;
        mouseY: number;
    } | null>(null)
    const [expanded, setExpanded] = useState<string | false>(false)

    useEffect(() => {
        if (data?.message) {
            const todos = data.message as Todo[]

            const dates = uniqueDates(todos)
    
            setExpanded("panel" + indexOfClosestDate(dates))
        }
    }, [data])

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
            //console.log(todos[dayIndex].todos[todoIndex])
        }
    }

    const handleChange =
    (panel: string) => (event: ReactSyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    if (data) {
        const todos = data.message as Todo[]

        const dates = uniqueDates(todos)

        const todoGroups: TodoGroup[] = []

        dates.forEach(date => {
            todoGroups.push({
                date: new Date(date),
                todos: todos.filter(todo => dayjs(todo.due).format("YYYY-MM-DD") === dayjs(date).format("YYYY-MM-DD")),
            })
        })

        todoGroups.forEach((todoGroup, index) => {
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
                            <Typography>{dayjs(todoGroup.date).format("YYYY-MM-DD")}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div onContextMenu={handleContextMenu} style={{ cursor: "context-menu" }}>
                                {addTodos(todoGroup.todos, index)}
    
                                <Menu
                                    open={contextMenu !== null}
                                    onClose={() => {
                                        setContextMenu(null)
                                    }}
                                    anchorReference="anchorPosition"
                                    anchorPosition={
                                        contextMenu !== null
                                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                                            : undefined
                                    }
                                >
                                    <MenuItem variant="black"
                                        onClick={() => {
                                            setContextMenu(null)
                                        }}
                                    >
                                        Edit
                                    </MenuItem>
                                </Menu>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            )
        })
    }

    return elements
}