import { Close } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik';
import { useGetStateListQuery } from '../../features/State/StateApi';
import { useGetCustomerByIdQuery, usePostCustomerMutation, useUpdateCustomerMutation } from '../../features/CustomerService.ts/customerApi';
import { toast } from 'react-toastify';
import * as Yup from "yup"
import { useParams } from 'react-router-dom';


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
  // companyName: Yup.string().required("Company name required"),
  name: Yup.string().required("Contact name required"),
  email: Yup.string().email().required("Email required"),
  city: Yup.string().required("City required")
})


const UpdateCustomer = ({ handleClose, handleCloseCustomerModal, id }: any) => {
  const {
    data: customer,
    error: customerError,
    isLoading: customerIsLoading,
  } = useGetCustomerByIdQuery({ id });

  const {
    data: states,
    error: statesError,
    isLoading: statesIsLoading,
  } = useGetStateListQuery({});


  console.log(customer);

  const [updateCustomer, { data: updateCustomerData, isLoading: updateCustomerIsLoading, isError: updateCustomerIsError }] = useUpdateCustomerMutation()


  const initialValues = {
    title: { label: customer?.title || "", value: customer?.title || "" },
    name: customer?.name || "",
    email: customer?.email || "",
    phoneNo: customer?.phoneNo?.map((item: any) => item.phoneNo) || [],
    fullAddress: customer?.fullAddress || "",
    city: customer?.city || "",
    postCode: customer?.postCode || "", 
    stateId: { label: customer?.state?.name || "", value: customer?.state?.id || "" },
    terms: "",
    contactName: "",
    companyName: "",
  }
  const handleSubmit = (values: any) => {
    // console.log(values);
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
    console.log(data);
    
    updateCustomer({id,data}).then((res:any) => {
      if(res?.error?.status === 500){
        console.log(res)
        toast.error("Unable to update customer");
      } else if(res?.data){
        toast.success("Customer updated successfully");
        handleCloseCustomerModal()
      } 
      else {
        toast.error("Error on updating Customer")

      }
    })
  }

  // console.log(postCustomerData)

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
        <Typography>Update Customer Details</Typography>
        <IconButton>
          <Close sx={{ color: "#fff" }} onClick={handleClose} />
        </IconButton>
      </Box>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
        {({ values, setFieldValue, handleChange, handleBlur, touched, errors }) => (
          <Form>
            <Grid2 container px={3} pb={2} columnSpacing={3}>
              <Grid2 size={6}>
                {/* <Box mt={2}>
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
                    <Typography sx={{ color: "red" }}>{errors.companyName}</Typography>
                  }
                </Box> */}
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
                  <Typography sx={{ color: "red" }}>{errors.name}</Typography>
                }
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
                    <Typography sx={{ color: "red" }}>{errors.email}</Typography>
                  }
                </Box>
                <Box mt={Object.keys(errors).length > 0 ? 1 : 5}>
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
                    <Typography sx={{ color: "red" }}>{errors.city}</Typography>
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

export default UpdateCustomer