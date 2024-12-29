import { Box } from "@mui/material";
import { Field } from "formik";
import CreatableSelect from "react-select/creatable";

interface CustomReactSelectProps {
    setFieldValue: any;
    setFieldValueLabel: string;
    sendToBackEnd?: any;
    options: Array<any> | [];
    placeholder: string;
    id?:any;
    isDisabled?:boolean;
    isClearable?:boolean;
}

const CustomReactSelect: React.FC<CustomReactSelectProps> = ({
    setFieldValue,
    setFieldValueLabel,
    sendToBackEnd,
    options,
    placeholder,
    id,
    isDisabled,
    isClearable
}) => {
    const colourStyles = {
        menuList: (baseStyles:any) => ({
            ...baseStyles,
            background: 'white',
            cursor: 'pointer',
        }),
        option: (baseStyles:any, {isFocused, isSelected}:any) => ({
            ...baseStyles,
            background: isFocused
                ? '#007FFF'
                : isSelected
                    ? '#fff'
                    : undefined,
                    color: isFocused
                ? '#fff'
                : isSelected
                    ? '#000'
                    : undefined,
            zIndex: 1,
            cursor: 'pointer',
        }),
        menu: (baseStyles:any)=> ({
            ...baseStyles,
            zIndex: 100,
            cursor: 'pointer',
        }),
        control: (baseStyles: any) => ({
            ...baseStyles,
            cursor:  'pointer'
        })
        }
    return (
        <Box mb={2}>
            <Field name={setFieldValueLabel}>
                {({ field, form }: any) => (
                    <>
                    <CreatableSelect
                        isClearable={isClearable}
                        value={field.value}
                        onChange={(newValue) => {
                            if (sendToBackEnd) {
                                sendToBackEnd(newValue); // Call only if sendToBackEnd is defined
                            }
                            setFieldValue(setFieldValueLabel, newValue);
                        }}
                        options={options} 
                        onCreateOption={(inputValue) => {
                            const newOption = { label: inputValue, value: inputValue };
                            // Add the new option to the options array in the parent state
                            const updatedOptions = [...options, newOption];
                            setFieldValue(setFieldValueLabel, newOption); // Update Formik field
                            form.setFieldValue(setFieldValueLabel, newOption); // Store new value
                        }}
                        styles={
                            colourStyles
                        } 
                        placeholder={placeholder || 'Select...'}

                        isDisabled={isDisabled}
                        
                    />
                      {form.errors[field.name] && form.touched[field.name] && (
                <span style={{ color: "red" }}>{form.errors[field.name]}</span>
            )}
                    </>
                )}
            </Field>
        </Box>
    );
};

export default CustomReactSelect;
