import AddIcon from "@mui/icons-material/Add"
import SettingsIcon from "@mui/icons-material/Settings"
import { IconButton } from "@mui/material"
import Link from "next/link"
import PropTypes from "prop-types"

interface Props {
    handleOpen: () => void,
}

export const Bar = ({ handleOpen }: Props) => {

    return (
        <div className="flex">
            <div className="items-start mr-auto ml-2 my-1">
                <IconButton aria-label="add" color="secondary" size="large" onClick={handleOpen}>
                    <AddIcon fontSize="inherit" />
                </IconButton>
            </div>
            <div className="items-end mr-2 my-1">
                <Link href="/settings">
                    <IconButton aria-label="settings" color="secondary" size="large">
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
                </Link>
            </div>
        </div>
    )
}

Bar.propTypes = {
    handleOpen: PropTypes.func.isRequired,
}

export default Bar