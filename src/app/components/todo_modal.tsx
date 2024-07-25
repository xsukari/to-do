"use client"
import { useState, ChangeEvent as ReactChangeEvent } from "react"
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
import useSWRMutation from "swr/mutation"
import { Todo } from "../utils/definitions/types"
import Alert from "@mui/material/Alert"

const fetcher = async (url: string, { arg }: { arg: Todo }) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
    })
  
    if (!response.ok) {
        throw new Error("An error occurred while fetching the data.")
    }
  
    return response.json()
}

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

export const TodoModal = ({ isOpen, handleClose }: Props) => {
    const defaultDate = dayjs().add(2, "h").set("s", 0).set("ms", 0)
    const [todo, setTodo] = useState<string>("")
    const [date, setDate] = useState<Dayjs>(defaultDate)
    const [reminder, setReminder] = useState<boolean>(true)

    const { trigger, isMutating } = useSWRMutation("/api/new-todo", fetcher)

    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false)

    const handleSubmit = async () => {
        const response = await trigger({
            name: todo,
            date: date.toDate(),
            reminder: reminder,
        } as Todo)

        setSuccess(response.message.success)
        setMessage(response.message.text)

        if (response.message.success) {
            handleClose()
        } else {
            setTimeout(() => {
                setMessage("")
            }, 10000)
        }
    }

    return (
        <Modal
            component="form"
            open={isOpen}
            onClose={handleClose}
            onSubmit={() => {handleSubmit()}}
            closeAfterTransition
            //disableScrollLock // pondering about the use of this
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
                        value={todo}
                        onChange={
                            (event: ReactChangeEvent<HTMLInputElement>) => {
                                setTodo(event.target.value)
                            }
                        }
                        className="w-full"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Due date"
                            value={date}
                            onChange={(newValue) => setDate(newValue ? newValue : defaultDate)}
                            format="YYYY-MM-DD HH:mm:ss"
                            className="w-full"
                            sx={{ mt: 2 }}
                            ampm={false}
                        />
                    </LocalizationProvider>
                    <FormControlLabel
                        control={
                            <Checkbox
                                variant="teal"
                                checked={reminder}
                                onChange={
                                    (event: ReactChangeEvent<HTMLInputElement>) => {
                                        setReminder(event.target.checked)
                                    }
                                }
                            />
                        } 
                        label="Additional reminder?"
                        className="w-full my-2"
                    />
                    <Typography variant="caption">
                        You will always get the initial reminder when the todo is due
                    </Typography>
                    <div className="h-12 my-2">
                        {message && <Alert severity={success ? "success" : "error"}>{message}</Alert>}
                    </div>
                    <div className="w-full items-end flex mt-auto">
                        <div className="ml-auto"></div>
                        <div className="w-1/4 min-w-1/4">
                            <Button
                                type="submit"
                                variant="outlined"
                                className="w-full"
                                disabled={isMutating}
                                onClick={() => {
                                    handleSubmit()
                                }}
                            >
                                Ok
                            </Button>
                        </div>
                        <div className="w-1/4 min-w-1/4 ml-3">
                            <Button
                                variant="outlined" 
                                className="w-full"
                                disabled={isMutating}
                                onClick={() => {
                                    handleClose()
                                }}
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