import { Close } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useGetStateListQuery } from '../../features/State/StateApi';
import { useGetAccountTypesQuery, useGetBankListQuery, useGetVendorByIdQuery, useUpdateVendorMutation } from '../../features/VendorService/vendorApi';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  height: "92%",
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
};
const EditVendor = ({ handleClose, handleCloseVendorModal,id }: any) => {
 const {
    data: vendor,
  } = useGetVendorByIdQuery(id);

  const {
    data: states,
  } = useGetStateListQuery({});
  const {
    data: bankListdata,
} = useGetBankListQuery({});
const {
    data: accountTypesData,
} = useGetAccountTypesQuery({});

    const [updateVendor] = useUpdateVendorMutation()
  


  const initialValues = {
    title: { label: vendor?.title || "", value: vendor?.title || "" },
    name: vendor?.name || "",
    phoneNo: vendor?.phoneNo || "",
    address1: vendor?.address1 || "",
    address2: vendor?.address2 || "",
    city: vendor?.city || "",
    stateId: { label: vendor?.state?.name || "", value: vendor?.state?.id || "" },
    postCode: vendor?.postCode || "",
    bankId: { label: vendor?.bank?.name || "", value: vendor?.bank?.id || "" },
    accountName: vendor?.accountName || "",
    accountNo: vendor?.accountNo || "",
    accountType: { label: vendor?.accountType || "", value: vendor?.accountType || "" },
    ifscCode: vendor?.ifscCode || "",
    bankBranch: vendor?.bankBranch || "",
    bankAddress: vendor?.bankAddress || "",
    terms: vendor?.terms || "",
  }
  const handleSubmit = (values: any) => {
    const data = {
      ...values,
      title: values.title.value,
      stateId: values.stateId.value,
      bankId: values.bankId.value,
      accountType: values.accountType.value,
    }

    updateVendor({id, data}).then((res) => {
      if(res?.error?.status === 500){
        toast.error("Vendor already exists");
      } else if(res?.data){
        toast.success("Vendor added successfully");
        handleCloseVendorModal()
      } 
      else {
        toast.error("Error on adding vendor")
        
      }
    })
  }


  const stateOptions = states?.map((state: any) => {
    return { label: state.name, value: state.id }
  })
  const bankOptions = bankListdata?.map((state: any) => {
    return { label: state.name, value: state.id }
  })
  const accountTypeOptions = accountTypesData?.map((state: any) => {
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
        <Typography>Update Vendor Details</Typography>
        <IconButton>
          <Close sx={{ color: "#fff" }} onClick={handleClose} />
        </IconButton>
      </Box>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {({ values, setFieldValue, handleChange, handleBlur }) => (
          <Form>
            <Grid2 container px={3} pb={2} columnSpacing={3}>
              <Grid2 size={4}>
                <Box mt={2}>
                  <Typography my={1}>Name</Typography>
                  <Box display={'flex'}>
                    <Autocomplete
                      disablePortal
                      options={martialStatusTitleList}
                      value={values.title}
                      onChange={(newValue) => setFieldValue("title", newValue)}
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
                <Box mt={2}>
                  <Typography my={1}>Phone</Typography>
                  <TextField
                    name="phoneNo"
                    type={"text"}
                    value={values.phoneNo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="Phone"
                    fullWidth
                  />
                </Box>
                <Box mt={2}>
                  <Typography my={1}>Address line 1</Typography>
                  <TextField
                    name="address1"
                    type={"text"}
                    value={values.address1}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="Address line 1"
                    fullWidth
                  />
                </Box>
                <Box mt={2}>
                  <Typography my={1}>Address line 2</Typography>
                  <TextField
                    name="address2"
                    type={"text"}
                    value={values.address2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    placeholder="Address line 2"
                    fullWidth
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
                </Box>
              </Grid2>

              <Grid2 size={4}>
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
                <Box mt={2}>
                  <Box>
                    <Typography my={1}>Bank Name</Typography>
                  </Box>
                  <Autocomplete
                    disablePortal
                    options={bankOptions}
                    value={values.bankId}
                    onChange={(event, newValue) => setFieldValue("bankId", newValue)}
                    sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                    renderInput={(params: any) => <TextField {...params} placeholder="Bank Name" />}
                  />
                </Box>
                <Box mt={2}>
                  <Box>
                    <Typography my={1}>Account Name</Typography>
                  </Box>
                  <TextField
                    name="accountName"
                    type={"text"}
                    value={values.accountName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    placeholder="Account name"
                  />
                </Box>
                <Box mt={2}>
                  <Box>
                    <Typography my={1}>Account No</Typography>
                  </Box>
                  <TextField
                    name="accountNo"
                    type={"text"}
                    value={values.accountNo}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    placeholder="Account number"
                  />
                </Box>
              </Grid2>

              <Grid2 size={4}>

                <Box mt={2}>
                  <Box>
                    <Box>
                      <Typography my={1}>Account Type</Typography>
                    </Box>
                    <Autocomplete
                      disablePortal
                      options={accountTypeOptions}
                      value={values.accountType}
                      onChange={( newValue) => setFieldValue("accountType", newValue)}
                      sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                      renderInput={(params: any) => <TextField {...params} placeholder="Account Type" />}
                    />
                  </Box>
                  <Box mt={2}>
                    <Typography my={1}>IFSC Code</Typography>
                  </Box>
                  <TextField
                    name="ifscCode"
                    type={"text"}
                    value={values.ifscCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    placeholder="IFSC code"
                  />
                </Box>
                <Box mt={2}>
                  <Box >
                    <Typography my={1}>Bank Branch</Typography>
                  </Box>
                  <TextField
                    name="bankBranch"
                    type={"text"}
                    value={values.bankBranch}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    placeholder="Bank branch"
                  />
                </Box>
                <Box mt={2}>
                  <Typography my={1}>Bank Address</Typography>
                  <TextField
                    name="bankAddress"
                    id="bank_address"
                    value={values.bankAddress}
                    multiline
                    rows={4.2}
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    placeholder='Bank address...'
                  />
                </Box>

              </Grid2>
              <Grid2 size={12}>
                <Box mt={2}>
                  <Typography my={1}>Terms</Typography>
                  <TextField
                    name="terms"
                    id="Terms"
                    value={values.terms}
                    multiline
                    rows={2}
                    variant="outlined"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    fullWidth
                    placeholder='Terms...'
                  />
                </Box>
              </Grid2>
            </Grid2>
            <Box display={"flex"} justifyContent={"end"}>
              <Button variant='contained' sx={{ mr: 2 }} type='submit' disableElevation>SAVE VENDOR</Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default EditVendor