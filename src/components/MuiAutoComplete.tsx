import React, { memo, useMemo } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface DynamicOptionType {
    inputValue?: string;
    label: string;  // Use 'label' as the key for display text
    [key: string]: any;  // Allow dynamic properties like 'id', 'year', etc.
}

interface CreateableAutoCompleteProps {
    value: DynamicOptionType | null;
    setValue: React.Dispatch<React.SetStateAction<DynamicOptionType | null>>;
    options: DynamicOptionType[] | null | [];
    label?: string;
    id: string;
    Placeholder?: string;
    // onInputChange:any
}

const MuiAutoComplete: React.FC<CreateableAutoCompleteProps> = memo(({ value, setValue, options, label, id,Placeholder }) => {
    const filter = createFilterOptions<DynamicOptionType>();
    const memoizedOptions = useMemo(() => options ?? [], [options]);

    const handleKeyDown = (e:React.KeyboardEvent) => {
        if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({ label: newValue }); // Handle new string entry
                } else if (newValue && newValue.inputValue) {
                    // If inputValue is present, handle new dynamic value
                    setValue({ label: newValue.inputValue });
                } else {
                    setValue(newValue); // Handle selection of existing option
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;

                // Suggest a new value if it doesn't exist
                const isExisting = options.some(option => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`, // Suggest to add the value
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id={id}
            options={memoizedOptions}
            getOptionLabel={(option) => {
                if (typeof option === 'string') return option;
                if (option.inputValue) return option.inputValue;
                return option.label;
            }}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        {option.label} {/* Render 'label' */}
                    </li>
                );
            }}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => <TextField {...params} label={label} placeholder={Placeholder}/>}
            onKeyDown={handleKeyDown}
            
            // onInputChange={onInputChange}
        />
    );
});

export default MuiAutoComplete;
