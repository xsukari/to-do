"use client"
import React from "react"
import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import { IconButton, Typography } from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
}

export default function Navbar() {
    const [date, setDate] = React.useState<Dayjs | null>(dayjs().add(1, "days").set("seconds", 0))
    const [task, setTask] = React.useState<string | null>(null)
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <div className="flex">
                <div className="items-start mr-auto ml-2 my-1">
                    <IconButton aria-label="add" color="secondary" size="large" onClick={handleOpen}>
                        <AddIcon fontSize="inherit" />
                    </IconButton>
                </div>
                <div className="items-end mr-2 my-1">
                    <IconButton aria-label="settings" color="secondary" size="large">
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
                </div>
            </div>

            <Modal
                component="form"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                noValidate
                autoComplete="off"
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <TextField
                            required
                            label="To do"
                            value={task}
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    setTask(event.target.value)
                                }
                            }
                            className="w-full"
                            sx={{
                                input: {
                                    color: "text.secondary",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "primary.main",
                                },
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Due date"
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                format="YYYY-MM-DD HH:mm:ss"
                                className="w-full"
                                sx={{
                                    input: {
                                        color: "text.secondary",
                                    },
                                    "&:hover .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "primary.main",
                                    },
                                    mt: 2,
                                }}
                                ampm={false}
                            />
                        </LocalizationProvider>
                        <FormControlLabel
                            control={
                                <Checkbox defaultChecked />
                            } 
                            label="Additional reminder?"
                            className="w-full my-2"
                        />
                        <Typography variant="caption">
                            You will always get the initial reminder when the task is due
                        </Typography>
                        <div className="w-full items-end flex mt-auto">
                            <div className="ml-auto"></div>
                            <div className="w-1/4 min-w-1/4">
                                <Button
                                    variant="outlined"
                                    className="w-full"
                                >
                                    Ok
                                </Button>
                            </div>
                            <div className="w-1/4 min-w-1/4 ml-3">
                                <Button
                                    variant="outlined" 
                                    className="w-full"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}