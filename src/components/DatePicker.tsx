import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Typography } from "@mui/material";
import EmergencyIcon from "@mui/icons-material/Emergency";

interface IDatePicker {
    label: string;
    name: string;
    value?: Dayjs | null;
    error?: string | false | undefined;
    placeholder?: string;
    required?: boolean;
    maxDate?: Dayjs;
    handleOnChange: (date: Dayjs | string | null) => void;
}



const DatePicker: React.FC<IDatePicker> = ({
    label,
    error,
    name,
    placeholder,
    required,
    maxDate,
    value,
    handleOnChange,
}) => {
    const sx = {
        // '& .MuiInputBase-root': {
        //     padding: 0, 
        // },
        '& .MuiOutlinedInput-root': {
            // padding: 0, 
            '&.Mui-focused': {
                borderColor: 'blue', 
            },
            '&:not(.Mui-focused)': {
                borderColor: value ? 'blue' : 'gray', 
            },
            '&:hover': {
                borderColor: 'blue', 
            },
        },
        '& .MuiInputBase-input': {
            padding: '9px 10px', 
        },
        // '& .MuiInputAdornment-root': {
        //     marginLeft: 0,
        // },
        // '& .MuiInputBase-button': {
        //     padding: '0px',
        // },
    }
    return (
        <Box width="100%">
            {label && (
                <Box display="flex" alignItems="flex-start">
                    <Typography
                        className="custom-sub-heading"
                        variant="body1"
                        marginBottom={1}
                        color="textPrimary"
                        fontWeight="400"
                    >
                        {label}
                        {required && <EmergencyIcon color="error" className="emergency-icon" />}
                    </Typography>
                </Box>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePicker
                    sx={sx}
                    value={value ? dayjs(value) : null}
                    className="w-full"
                    name={name}
                    maxDate={maxDate}
                    slotProps={{
                        textField: {
                            placeholder: placeholder,
                            fullWidth: true,
                            variant: "outlined",
                            error: !!error,
                            helperText: error,
                        },
                    }}
                    onChange={(date) => handleOnChange(date ? date.format("YYYY-MM-DD") : null)}
                />
            </LocalizationProvider>
        </Box>
    );
};

export default DatePicker;
