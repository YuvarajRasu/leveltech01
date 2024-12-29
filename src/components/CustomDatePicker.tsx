import * as React from 'react';
import  { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Typography } from '@mui/material';

interface CustomDatePickerProps {
    title?: string;
    placeholder?: string;
    value?: Dayjs;
    handleOnChange?: (date: Dayjs | null) => void;
}
const CustomDatePicker:React.FC<CustomDatePickerProps> = ({ title, placeholder, value, handleOnChange}) => {
    const sx = {
        '& .MuiInputBase-root': {
            padding: 0, // Adjust the padding for the root input field
        },
        '& .MuiOutlinedInput-root': {
            padding: 0, // Adjust the padding for the outlined input variant
            // Set the border color based on the value
            '&.Mui-focused': {
                borderColor: 'blue', // Border color when focused
            },
            '&:not(.Mui-focused)': {
                borderColor: value ? 'blue' : 'gray', // Default border color
            },
            '&:hover': {
                borderColor: 'blue', // Set border color to blue when hovered
            },
        },
        '& .MuiInputBase-input': {
            padding: '9px 10px', // Adjust the padding for the text input
            width: '100%', // Adjust width of the input
        },
        '& .MuiInputAdornment-root': {
            marginLeft: 0, // Reduce the space between the icon and the date
        },
        '& .MuiInputBase-button': {
            padding: '0px', // Adjust the padding for the button icon
        },
    }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
            {title && (
                <Box display="flex" alignItems="flex-start">
                    <Typography
                        className="custom-sub-heading"
                        variant="body1"
                        marginBottom={1}
                        color="textPrimary"
                        fontWeight="400"
                    >
                        {title}
                    </Typography>
                </Box>
            )}
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                    sx={sx}
                    value={value}
                    onChange={handleOnChange}
                    slotProps={{
                        textField: {
                            placeholder: placeholder,
                            fullWidth: true,
                            variant: "outlined",
                        },
                    }}
                />
            </DemoContainer>
        </LocalizationProvider>
  )
}

export default CustomDatePicker;

