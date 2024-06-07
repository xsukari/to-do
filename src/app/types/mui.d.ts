import "@mui/material/Checkbox"
import "@mui/material/MenuItem"

declare module "@mui/material/Checkbox" {
    interface CheckboxProps {
      variant?: string
    }
}

declare module "@mui/material/MenuItem" {
  interface MenuItemOwnProps {
    variant?: string
  }
}