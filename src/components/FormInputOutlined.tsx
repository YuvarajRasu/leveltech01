import { Box, OutlinedInput } from '@mui/material'
import React from 'react'

type IFormInput = {
    type: string, id: string, value: any, onBlur: any, handleChange: any, name: string,placeholder:string
}

const FormInputOutlined = ({name, type, id, value, onBlur, handleChange,placeholder }: IFormInput) => {
    return (
        <Box>
            <OutlinedInput
                name={name}
                type={type}
                id={id}
                value={value}
                onBlur={onBlur}
                onChange={handleChange}
                placeholder={placeholder}
                fullWidth
            />
        </Box>
    )
}

export default FormInputOutlined