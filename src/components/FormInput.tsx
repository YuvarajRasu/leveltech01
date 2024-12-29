import { Box, InputAdornment, TextField } from '@mui/material'

type IFormInput = {
    type: string, id: string, value: any, onBlur: any, handleChange: any, name: string, placeholder: string, variant: "outlined" | "filled" | "standard", label: string, startInputIcon:any,endInputIcon:any,handleIconClick?:any
}

const FormInput = ({ name, type, id, value, onBlur, handleChange, placeholder, label, variant,startInputIcon,endInputIcon,handleIconClick }: IFormInput) => {
    return (
        <Box>
            <TextField
                slotProps={{
                    input: {
                        startAdornment:(
                            <InputAdornment position='start' onClick = {handleIconClick}>
                                {startInputIcon}
                            </InputAdornment>
                        ),
                        endAdornment:(
                            <InputAdornment position='end' onClick = {handleIconClick}>
                                {endInputIcon}
                            </InputAdornment>
                        )
                    }
                }}
                name={name}
                type={type}
                id={id}
                value={value}
                onBlur={onBlur}
                onChange={handleChange}
                placeholder={placeholder}
                // label={label}
                variant={variant}
                fullWidth
            />
        </Box>
    )
}

export default FormInput