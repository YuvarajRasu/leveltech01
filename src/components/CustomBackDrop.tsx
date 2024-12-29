import Backdrop from '@mui/material/Backdrop';
import { useState } from "react";
import level_tech_gif from "../assets/level_tech_gif.gif"
import { CircularProgress, Typography } from '@mui/material';

const CustomBackDrop = () => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={true}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default CustomBackDrop