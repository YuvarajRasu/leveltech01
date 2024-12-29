import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CustomSearchInput from "../../components/CustomSearchInput";
import CustomTable from "../../components/CustomTable";
import { useGetVendorListQuery } from "../../features/VendorService/vendorApi";
import AddVendor from "./AddVendor";
import EditVendor from "./EditVendor";

const VendorList = () => {
    const [pageNo, setPageNo] = useState<number>(1);
     const [perPageValue] = useState<number>(10)
     const [searchInput, setSearchInput] = useState("")
    const [openAddVendorModal, setOpenAddVendorModal] = useState<boolean>(false)
    const[openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
    const [vendorId, setVendorId] = useState<string | number>("")
    // Fetch the product data from the backend
    const { data: vendorList,isLoading, refetch } = useGetVendorListQuery({pageNo, perPageValue, searchInput}, { refetchOnMountOrArgChange: true });

    const handleClose = () => {
        setOpenAddVendorModal(false)
    }

    const handleAddVendorClick = () => {
        setOpenAddVendorModal(true)
    }

    console.log(vendorList);


    // Map the data to extract categoryName, productName, and modelName dynamically
    const productRows = vendorList?.data?.map((item: any) => ({
        id: item.id,
        name: item.name,
        phoneNo: item.phoneNo,
        city: item.city,
        bank: item.bank.name,
        bankBranch: item.bankBranch,
        createdAt: new Date(item.createdAt).toLocaleDateString('en-US'),
        action: <>
            <IconButton sx={{bgcolor:"#F0F8FF"}} size="small" onClick={() =>handleUpdateCustomerClick(item.id)}><EditIcon sx={{color:"#A9A9A9"}}/></IconButton>
        </>
    })) || [];

    // Define the columns dynamically
    const columns = [
        { id: 'name', label: 'Name' },
        { id: 'phoneNo', label: 'Phone' },
        { id: 'city', label: 'City' },
        { id: 'bank', label: 'Bank' },
        { id: 'bankBranch', label: 'Bank Branch' },
        { id: 'createdAt', label: 'Created Date' },
        { id: 'action', label: 'Action' },
    ];


    const handleSearchInput = (e: any) => {
        setSearchInput(e.target.value)
        console.log(e.target.value);

    }

    const handleCloseVendorModal = () => {
        setOpenAddVendorModal(false);
        refetch();
    }

    const handleCloseUpdateViewVendor = () => {
        setOpenUpdateModal(false)
    }

    const handleCloseUpdateVendorModal = () => {
        setOpenUpdateModal(false)
        refetch();
    }

    const handleUpdateCustomerClick = (id:string | number) => {
        setVendorId(id)
        setOpenUpdateModal(true)
    }

    useEffect(() => {
            refetch()
        }, [pageNo])

    return (
        <>
            <Box >
                {/* Pass the columns and rows dynamically to the CustomTable */}
                <Box display={"flex"} justifyContent={"space-between"}>
                            {vendorList?.data?.length ? <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Vendors ({vendorList?.data?.length})</Typography> : <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Vendors</Typography>}
                    
                    <Box display={"flex"} justifyContent={"end"}>

                        <CustomSearchInput value={searchInput} handleChange={handleSearchInput} />

                        <Button onClick={handleAddVendorClick} variant="contained" sx={{ bgcolor: "#014", height: 45 }}>
                            Add Vendor
                        </Button>
                    </Box>
                </Box>
                <CustomTable columns={columns} rows={productRows} />
                <Typography sx={{ color: "grey", mt: 2 }}>Total available items : {vendorList?.data?.length}</Typography>
                <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
                    <IconButton onClick={() => setPageNo(pageNo - 1)}
                        disabled={isLoading || pageNo === 1} sx={{
                            bgcolor: "#808080", mr: 1, height: 30, width: 30, "&:hover": {
                                bgcolor: "#36454F",
                                color: "#fff",
                            },
                        }}><ArrowBackIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
                    <IconButton onClick={() => setPageNo(pageNo + 1)}
                        disabled={isLoading || vendorList?.data?.length < perPageValue} sx={{
                            bgcolor: "#808080", height: 30, width: 30, "&:hover": {
                                bgcolor: "#36454F",
                                color: "#fff",
                            },
                        }}><ArrowForwardIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
                </Box>
            </Box>
            <Modal open={openAddVendorModal} onClose={handleClose}>
                <AddVendor handleClose={handleClose} handleCloseVendorModal={handleCloseVendorModal} />
            </Modal>
            <Modal open={openUpdateModal} onClose={handleCloseUpdateViewVendor}>
                <EditVendor handleClose={handleCloseUpdateViewVendor} handleCloseCustomerModal={handleCloseUpdateVendorModal} id={vendorId}/>
            </Modal>
        </>
    );
};

export default VendorList;
