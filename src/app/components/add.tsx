import AddIcon from "@mui/icons-material/Add"
import { IconButton } from "@mui/material"
import PropTypes from "prop-types"

interface Props {
    handleOpen: () => void,
}

export const Add = ({ handleOpen }: Props) => {
    return (
        <div className="bg-bar h-13 w-13 mr-8 mb-8 scale-125 rounded-full">
            <IconButton aria-label="add" color="secondary" size="large" onClick={handleOpen}>
                <AddIcon fontSize="inherit" />
            </IconButton>
        </div>
    )
}

Add.propTypes = {
    handleOpen: PropTypes.func.isRequired,
}

export default Add