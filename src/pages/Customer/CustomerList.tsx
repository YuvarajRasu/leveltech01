import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomSearchInput from "../../components/CustomSearchInput";
import CustomTable from "../../components/CustomTable";
import { useGetCustomerListQuery } from "../../features/CustomerService.ts/customerApi";
import AddCustomer from "./AddCustomer";
import UpdateCustomer from "./UpdateCustomer";
import ViewCustomer from "./ViewCustomer";

const CustomerList = () => {
    const [pageNo, setPageNo] = useState<number>(1);
    const [perPageValue, setPerPageValue] = useState<number>(10)
    const [searchInput, setSearchInput] = useState("")
    const [openAddCustomerModal, setOpenAddCustomerModal] = useState<boolean>(false)
    const [openViewCustomerModal, setOpenViewCustomerModal] = useState<boolean>(false)
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
    const [customerId, setCustomerId] = useState<string | number>("")
    const { data: customerList, isLoading, refetch } = useGetCustomerListQuery({ pageNo, perPageValue, searchInput }, { refetchOnMountOrArgChange: true });

    const handleClose = () => {
        setOpenAddCustomerModal(false)
    }

    const handleAddCustomerClick = () => {
        setOpenAddCustomerModal(true)
    }

    const handleCloseViewCustomer = () => {
        setOpenViewCustomerModal(false)
    }

    const handleViewCustomerClick = (id: string | number) => {
        setCustomerId(id)
        setOpenViewCustomerModal(true)
    }
    const handleCloseUpdateViewCustomer = () => {
        setOpenUpdateModal(false)
    }

    const handleUpdateCustomerClick = (id: string | number) => {
        setCustomerId(id)
        setOpenUpdateModal(true)
    }

    const productRows = customerList?.data?.map((item: any, index:number) => ({

        id: index + 1,
        name: item.name,
        email: item.email,
        phoneNo: item.phoneNo[0].phoneNo,
        city: item.city,
        action: <>
            <IconButton sx={{ bgcolor: "#F0F8FF", mr: 1 }} size="small" onClick={() => handleViewCustomerClick(item.id)}><VisibilityIcon sx={{ color: "#808080" }} /></IconButton>
            <IconButton sx={{ bgcolor: "#F0F8FF" }} size="small" onClick={() => handleUpdateCustomerClick(item.id)}><EditIcon sx={{ color: "#A9A9A9" }} /></IconButton>
            {/* <IconButton sx={{bgcolor:"#F0F8FF"}} size="small"><DeleteIcon sx={{color:"#EE4B2B"}}/></IconButton> */}
        </>
    })) || [];

    const columns = [
        { id: 'id', label: '#' },
        { id: 'name', label: 'Name' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNo', label: 'Phone' },
        { id: 'city', label: 'City' },
        { id: 'action', label: 'Action' },
    ];


    const handleSearchInput = (e: any) => {
        setSearchInput(e.target.value)
        console.log(e.target.value);

    }

    const handleCloseCustomerModal = () => {
        setOpenAddCustomerModal(false)
        refetch();
    }

    const handleCloseViewCustomerModal = () => {
        setOpenViewCustomerModal(false)
        // refetch();
    }

    const handleCloseUpdateCustomerModal = () => {
        setOpenUpdateModal(false)
        refetch();
    }

    useEffect(() => {
        refetch()
    }, [pageNo])

    return (
        <>
            <Box>
                {/* Pass the columns and rows dynamically to the CustomTable */}
                <Box display={"flex"} justifyContent={"space-between"}>
                    {customerList?.length ? <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Customers ({customerList?.length})</Typography> : <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Customers</Typography>}
                    <Box display={"flex"} justifyContent={"end"}>

                        <CustomSearchInput value={searchInput} handleChange={handleSearchInput} />

                        <Button onClick={handleAddCustomerClick} variant="contained" sx={{ bgcolor: "#014", height: 45 }}>
                            Add Customer
                        </Button>
                    </Box>
                </Box>
                <CustomTable columns={columns} rows={productRows} />
               

                <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                {/* <Typography sx={{ color: "grey"}}>Total available items : {customerList?.length}</Typography> */}
                    {/* <button onClick={() => setPageNo(0)}
          disabled={isLoading || pageNo === 0}>first</button> */}
                    <IconButton onClick={() => setPageNo(pageNo - 1)}
                        disabled={isLoading || pageNo === 1} sx={{
                            bgcolor: "#808080", mr: 1, height: 30, width: 30, "&:hover": {
                                bgcolor: "#36454F",
                                color: "#fff",
                            },
                        }}><ArrowBackIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
                    <IconButton onClick={() => setPageNo(pageNo + 1)}
                        disabled={isLoading || customerList?.data?.length < perPageValue} sx={{
                            bgcolor: "#808080", height: 30, width: 30, "&:hover": {
                                bgcolor: "#36454F",
                                color: "#fff",
                            },
                        }}><ArrowForwardIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
                    {/* <button onClick={() => setPageNo(Math.round(count / perPageValue) - 1)}
          disabled={isLoading || data?.data?.length < perPageValue}>last</button> */}
                </Box>
            </Box>

            <Modal open={openAddCustomerModal} onClose={handleClose} sx={{ height: 540 }}>
                <AddCustomer handleClose={handleClose} handleCloseCustomerModal={handleCloseCustomerModal} />
            </Modal>
            <Modal open={openViewCustomerModal} onClose={handleCloseViewCustomer} sx={{ height: 250 }}>
                <ViewCustomer handleClose={handleCloseViewCustomer} handleCloseCustomerModal={handleCloseViewCustomerModal} id={customerId} />
            </Modal>
            <Modal open={openUpdateModal} onClose={handleCloseUpdateViewCustomer} sx={{ height: 540 }}>
                <UpdateCustomer handleClose={handleCloseUpdateViewCustomer} handleCloseCustomerModal={handleCloseUpdateCustomerModal} id={customerId} />
            </Modal>
        </>
    );
};

export default CustomerList;
