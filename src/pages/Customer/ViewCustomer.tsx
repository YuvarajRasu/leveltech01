import { Close } from '@mui/icons-material';
import { Autocomplete, Box, Button, Grid2, IconButton, TextField, Typography } from '@mui/material'
import { Formik, Form } from 'formik';
import { useGetStateListQuery } from '../../features/State/StateApi';
import { useGetCustomerByIdQuery, usePostCustomerMutation } from '../../features/CustomerService.ts/customerApi';
import { toast } from 'react-toastify';
import * as Yup from "yup"


const style = {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "100%",
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

const ViewCustomer = ({ handleClose, handleCloseCustomerModal, id }: any) => {
    const {
        data: customer,
        error: customerError,
        isLoading: customerIsLoading,
    } = useGetCustomerByIdQuery({ id });
    console.log(customer)

    return (
        <Box sx={style}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2,py:1, bgcolor: "#f44336", color: "#fff", borderRadius: "2px 0px 0px 0px" }}>
                <Typography>Customer Details</Typography>
                <IconButton>
                    <Close sx={{ color: "#fff" }} onClick={handleClose} />
                </IconButton>
            </Box>
            <Box sx={{pl:3, py:2}}>
                <Typography sx={{ fontSize: 18, fontWeight: 600 }}>{customer?.title}. {customer?.name[0].toUpperCase() + customer?.name.slice(1).toLowerCase()}</Typography>
                <Typography mt={.5}><Box display="inline" component="span" color="#818589">Email :</Box> {customer?.email}</Typography>
                <Box mt={.5}>
                <Box display="inline" component="span" color="#818589">Contact Numbers : </Box> 
                {
                    customer?.phoneNo?.map((phoneNumber: any, index: number) => (
                        <Box display="inline" key={phoneNumber.phoneNo}>{phoneNumber.phoneNo}{index === customer?.phoneNo?.length - 1 ? '' : ', '}</Box> 
                    ))
                }
                </Box>
                <Typography mt={.5}><Box display="inline" component="span" color="#818589">Address : </Box>{customer?.fullAddress}, {customer?.city}, {customer?.state?.name}</Typography>
                <Typography mt={.5}><Box display="inline" component="span" color="#818589">Pincode : </Box>{customer?.postCode}</Typography>
            </Box>

        </Box>
    )
}

export default ViewCustomer