"use client"
import React from "react"
import { Typography } from "@mui/material"
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
import PropTypes from "prop-types"

const modalStyle = {
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

interface Props {
    isOpen: boolean,
    handleClose: () => void,
}

export const TodoModal = ({ isOpen, handleClose}: Props) => {
    const [date, setDate] = React.useState<Dayjs | null>(dayjs().add(2, "hours").set("seconds", 0))
    const [task, setTask] = React.useState<string>("")

    return (
        <Modal
            component="form"
            open={isOpen}
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
            <Fade in={isOpen}>
                <Box sx={modalStyle}>
                    <TextField
                        label="To do"
                        value={task}
                        onChange={
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                setTask(event.target.value)
                            }
                        }
                        className="w-full"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Due date"
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            format="YYYY-MM-DD HH:mm:ss"
                            className="w-full"
                            sx={{ mt: 2 }}
                            ampm={false}
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        control={
                            <Checkbox variant="teal" defaultChecked />
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
    )
}

TodoModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}

export default TodoModal