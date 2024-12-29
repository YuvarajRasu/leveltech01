import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    SxProps,
    Theme,
} from "@mui/material";

interface CustomSelectProps {
    variant?: "standard" | "filled";
    sx?: SxProps<Theme>;
    inputLabel: string;
    id: any;
    labelId?: string;
    value?: any;
    label: string;
    onChange: (event: SelectChangeEvent) => void;
    selectOptions: Array<{ label: string, value: any }> | any;
    size?: "small",
    name: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    variant,
    sx,
    inputLabel,
    id,
    labelId,
    value,
    onChange,
    label,
    selectOptions,
    size,
    name
}) => {
    return (
        <Box>
            <FormControl variant={variant} sx={sx} size={size} fullWidth>
                <InputLabel id={id}>{inputLabel}</InputLabel>
                <Select
                    labelId={labelId}
                    id="selet"
                    value={value}
                    label={label}
                    onChange={onChange}
                    name={name}
                    sx={{py:0}}
                    
                >
                    <MenuItem disabled value="">
                        <em>Placeholder</em>
                    </MenuItem>
                    {selectOptions?.map((item: any, index: number) => (
                        <MenuItem value={item.value} key={index}>
                            {item.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default CustomSelect;
