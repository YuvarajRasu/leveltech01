import { Search } from '@mui/icons-material'
import { createTheme, InputAdornment, OutlinedInput, ThemeProvider } from '@mui/material'


interface CustomSearchInputProps {
    value: any;
    handleChange: (e: any) => void;
}

const theme = createTheme({
    palette: {
        secondary: {
            main: "#9e9e9e"
        }
    }
})

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({ value, handleChange }) => {

    return (
        <ThemeProvider theme={theme}>
            <OutlinedInput
                name='searchInput'
                value={value}
                placeholder='Search ...'
                id="outlined-adornment-weight"
                color='secondary'
                startAdornment={<InputAdornment position="end" sx={{ pr: 1 }}><Search /></InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                    'aria-label': 'weight',
                }}
                onChange={handleChange}
                sx={{ mx: 1, mb: 2, width: '25ch',height: 45 }}
            />
        </ThemeProvider>

    )
}

export default CustomSearchInput