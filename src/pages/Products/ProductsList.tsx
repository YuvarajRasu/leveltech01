import { Delete } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomSearchInput from "../../components/CustomSearchInput";
import CustomTable from "../../components/CustomTable";
import { useDeleteMasterProductMutation, useGetMasterProductListQuery } from "../../features/MasterProductService/MasterProductApi";

const ProductsList = () => {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPageValue, setPerPageValue] = useState<number>(10)
  const [searchInput, setSearchInput] = useState("")
  // Fetch the product data from the backend
  const { data: masterProductList,isLoading, refetch } = useGetMasterProductListQuery({ pageNo, perPageValue, searchInput }, { refetchOnMountOrArgChange: true });
  const [deleteMasterProduct] = useDeleteMasterProductMutation()

  const handleEdit = (id: number) => {
    navigate(`edit/${id}`)
  }
  const handleDelete = (id: number) => {
    console.log(id);
    deleteMasterProduct([id]).then(res => {
      if (res?.error) {
        toast.error("Product associated with purchase");
      }
      if (res?.data) {
        toast.success("Product deleted successfully");
        refetch();
      }
    })

  }

  console.log(masterProductList?.length);


  // Map the data to extract categoryName, productName, and modelName dynamically
  const productRows = masterProductList?.data?.map((item: any) => ({
    id: item.id,
    categoryName: item.category.name,
    productName: item.product.name,
    modelName: item.model.name,
    hsnCode: item.hsnAcs,
    tax: item.tax,
    update: item.lastModifiedAt,
    action: <Box><IconButton sx={{bgcolor:"#F0F8FF", mr:{lg:2}}} size="small" onClick={() => handleEdit(item.id)}><EditIcon sx={{color:"#A9A9A9"}}/></IconButton><IconButton sx={{bgcolor:"#F0F8FF", mt: {xs:1, lg:0}}} size="small" onClick={() => handleDelete(item.id)}><Delete sx={{color:"#EE4B2B"}}/></IconButton></Box>
  })) || [];
  // Define the columns dynamically
  const columns = [
    { id: 'categoryName', label: 'Category Name' },
    { id: 'productName', label: 'Product Name' },
    { id: 'modelName', label: 'Model Name' },
    { id: 'hsnCode', label: 'HSN' },
    { id: 'tax', label: 'Tax' },
    { id: 'update', label: 'Updated' },
    { id: 'action', label: 'Action' },
  ];



  const filterOptions = [
    { label: 'Created', value: "created" },
    { label: 'Date', value: "date" },
    { label: 'Bill Date', value: "bill date" },
    { label: 'Purchase Date', value: "purchase date" },
  ]



  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value)
    console.log(e.target.value);

  }
   useEffect(() => {
              refetch()
          }, [pageNo])

  return (
    <Box>
      {/* Pass the columns and rows dynamically to the CustomTable */}
      <Box display={"flex"} justifyContent={"space-between"}>
        {masterProductList?.data?.length ? <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Products ({masterProductList?.data?.length})</Typography> : <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Products</Typography>}

        <Box display={"flex"} justifyContent={"end"}>

          <CustomSearchInput value={searchInput} handleChange={handleSearchInput} />

          <Button onClick={() => navigate("new-product")} variant="contained" sx={{ bgcolor: "#014", height: 45 }}>
            Add Product
          </Button>
        </Box>
      </Box>
      <CustomTable columns={columns} rows={productRows} />
      <Typography sx={{ color: "grey", mt: 2 }}>Total available items : {masterProductList?.data?.length}</Typography>
      <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
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
          disabled={isLoading || masterProductList?.data?.length < perPageValue} sx={{
            bgcolor: "#808080", height: 30, width: 30, "&:hover": {
              bgcolor: "#36454F",
              color: "#fff",
            },
          }}><ArrowForwardIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
        {/* <button onClick={() => setPageNo(Math.round(count / perPageValue) - 1)}
          disabled={isLoading || data?.data?.length < perPageValue}>last</button> */}
      </Box>
    </Box>
  );
};

export default ProductsList;
