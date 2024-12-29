import { Close } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik';
import { useGetStateListQuery } from '../../features/State/StateApi';
import { usePostCustomerMutation } from '../../features/CustomerService.ts/customerApi';
import { toast } from 'react-toastify';
import * as Yup from "yup"


const style = {
  position: 'absolute',
  top: '55%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height: "100%",
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
};

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required("Company name required"),
  name: Yup.string().required("Contact name required"),
  email: Yup.string().email().required("Email required"),
  city: Yup.string().required("City required")
})


const AddCustomer = ({ handleClose, handleCloseCustomerModal }: any) => {
  const {
    data: states,
    error: statesError,
    isLoading: statesIsLoading,
  } = useGetStateListQuery({});


  console.log(states);

  const [postCustomer, { data: postCustomerData, isLoading: postCustomerIsLoading, isError: postCustomerIsError }] = usePostCustomerMutation()


  const initialValues = {
    title: { label: "", value: "" },
    name: "",
    email: "",
    phoneNo: [],
    fullAddress: "",
    city: "",
    postCode: "",
    stateId: { label: "", value: "" },
    terms: "",
    contactName: "",
    companyName: "",
  }
  const handleSubmit = (values: any) => {
    console.log(values);
    const data = {
      title: values.title.value,
      name: values.name,
      email: values.email,
      phoneNo: values.phoneNo,
      fullAddress: values.fullAddress,
      city: values.city,
      postCode: values.postCode,
      state: values.stateId.value
    }
    postCustomer(data).then((res) => {
      if(res?.error?.status === 500){
        console.log(res)
        toast.error("Customer already exists");
      } else if(res?.data){
        toast.success("Customer added successfully");
        handleCloseCustomerModal()
      } 
      else {
        toast.error("Error on adding Customer")
        
      }
    })
  }

  console.log(postCustomerData)

  const stateOptions = states?.map((state: any) => {
    return { label: state.name, value: state.id }
  })
  const martialStatusTitleList = [
    { label: "Mr.", value: "MR" },
    { label: "Ms.", value: "MS" },
    { label: "Mrs.", value: "MRS" }
  ]
  return (
    <Box sx={style}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, bgcolor: "#f44336", color: "#fff", borderRadius: "2px 0px 0px 0px" }}>
        <Typography>Save Customer</Typography>
        <IconButton>
          <Close sx={{ color: "#fff" }} onClick={handleClose} />
        </IconButton>
      </Box>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values, setFieldValue, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <Grid2 container px={3} pb={2} columnSpacing={3}>
              <Grid2 size={6}>
                <Box mt={2}>
                  <Typography my={1}>Company Name</Typography>
                  <TextField
                    name="companyName"
                    type={"text"}
                    value={values.companyName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="Company name"
                    fullWidth
                  />
                  {errors.companyName && touched.companyName &&
                    <Typography sx={{color:"red"}}>{errors.companyName}</Typography>
                    }
                </Box>
                <Box mt={2}>
                  <Typography my={1}>Customer Name</Typography>
                  <Box display={'flex'}>
                    <Autocomplete
                      disablePortal
                      options={martialStatusTitleList}
                      value={values.title}
                      onChange={(event, newValue) => setFieldValue("title", newValue)}
                      sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" }, width: "38%" }}
                      renderInput={(params: any) => <TextField {...params} placeholder="M/S" sx={{ "& .MuiAutocomplete-endAdornment": { padding: 0 } }} />}
                    />
                    <TextField
                      name="name"
                      type={"text"}
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      size="small"
                      placeholder="Name"
                      fullWidth
                      sx={{ ml: 1 }}
                    />
                      
                  </Box>
                </Box>
                {errors.name && touched.name &&
                    <Typography sx={{color:"red"}}>{errors.name}</Typography>
                    }
                {/* <Box mt={2}>
                  <Typography my={1}>Contact Name</Typography>
                  <TextField
                    name="contactName"
                    type={"text"}
                    value={values.contactName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="Contact name"
                    fullWidth
                  />
                </Box> */}

                <Box mt={2}>
                  <Typography my={1}>Company Phone</Typography>
                  <TextField
                    name="phoneNo"
                    type={"text"}
                    value={values.phoneNo.join(', ')} 
                    onBlur={handleBlur}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue('phoneNo', value.split(',').map((num) => num.trim())); 
                    }}
                    size="small"
                    placeholder="Enter phone numbers, separated by commas"
                    fullWidth
                  />
                </Box>
                <Box mt={2}>
                  <Typography my={1}>Contact Email</Typography>
                  <TextField
                    name="email"
                    type={"text"}
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="Email"
                    fullWidth
                  />
                    {errors.email && touched.email &&
                    <Typography sx={{color:"red"}}>{errors.email}</Typography>
                    }
                </Box>
                <Box  mt={Object.keys(errors).length > 0 ? 1 : 5}>
                  <Button variant='contained' sx={{ mr: 2, py: 1.5 }} type='submit' disableElevation>SAVE CUSTOMER</Button>
                </Box>

              </Grid2>

              <Grid2 size={6}>
                <Box mt={2}>
                  <Typography my={1}>Full Address</Typography>
                  <TextField
                    name="fullAddress"
                    id="fullAddress"
                    value={values.fullAddress}
                    multiline
                    rows={4.2}
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    placeholder='Address...'
                  />
                </Box>
                <Box mt={2}>
                  <Typography my={1}>City</Typography>
                  <TextField
                    name="city"
                    type={"text"}
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="City"
                    fullWidth
                  />
                    {errors.city && touched.city &&
                    <Typography sx={{color:"red"}}>{errors.city}</Typography>
                    }
                </Box>
                <Box mt={1}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography my={1}>State</Typography>
                  </Box>
                  <Autocomplete
                    disablePortal
                    options={stateOptions}
                    value={values.stateId}
                    onChange={(event, newValue) => setFieldValue("stateId", newValue)}
                    sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                    renderInput={(params: any) => <TextField {...params} placeholder="State" />}
                  />
                </Box>
                <Box mt={2}>
                  <Box>
                    <Typography my={1}>Zip</Typography>
                  </Box>
                  <TextField
                    name="postCode"
                    type={"text"}
                    value={values.postCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    placeholder="Zip"
                  />
                </Box>
              </Grid2>
            </Grid2>

          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default AddCustomer