import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box } from "@mui/material";
import { memo, useMemo } from "react";

interface AutoCompleteProps {
  label: string;
  options: Array<any> | null;
  optionLabelKey: string;
  optionLabelValue: string | number;
  getOptionKey: string | number | null;
  handleChange: (event: any, value: any) => void;
  value?: string | number | null;
  sx?: object;
}
const CustomAutocomplete: React.FC<AutoCompleteProps> = memo(
  ({
    options,
    handleChange,
    value,
    sx,
    label,
    optionLabelKey,
    optionLabelValue,
  }) => {
    const memoizedOptions = useMemo(() => options ?? [], [options]);
    return (
      <Box>
        <Autocomplete
          disablePortal
          autoHighlight
          options={memoizedOptions}
          getOptionLabel={(option) => option[optionLabelValue] || "label"}
          getOptionKey={(option) => option[optionLabelKey] || "key"}
          value={value}
          sx={{ ...sx}}
          onChange={(event, newValue) => handleChange(event, newValue)}
          renderInput={(params) => <TextField {...params} label={label} />}
          
        />
      </Box>
    );
  }
);

export default CustomAutocomplete;
