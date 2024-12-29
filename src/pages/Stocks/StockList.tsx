import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../components/CustomTable';
import { useGetStockListQuery } from '../../features/StockService/StockApi';

const StockList = () => {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPageValue] = useState<number>(10)
  const [searchInput] = useState("")
  const { data, isLoading, refetch } = useGetStockListQuery({ pageNo, perPageValue, searchInput }, { refetchOnMountOrArgChange: true })



  const columns = [
    { id: "number", label: "ID" },
    { id: 'category', label: 'Category' },
    { id: 'name', label: 'Name' },
    { id: 'model', label: 'Model' },
    { id: 'totalProducts', label: 'Total Products' },
    { id: 'sold', label: 'Sold' },
    { id: 'inStock', label: 'In Stock' },
  ];

  const salesRows = data?.data?.map((item: any, index: number) => ({
    number: index + 1,
    name: item.purchaseInfoDTO[0]?.vendor || "N/A",
    category: item.masterProductDTO.category.name,
    model: item.masterProductDTO.model.name,
    totalProducts: item.totalProducts,  // Ensure the correct date field is used
    sold: item.sold,  // Total amount is mapped from grandTotal in the response
    inStock: item.inStock,
  })) || [];


  const renderCell = (column: any, row: any) => {
    return row[column.id];
  }

  useEffect(() => {
    refetch()
  }, [pageNo])


  return (
    <Box>
      {/* <Box display={'flex'} justifyContent={"space-between"} pb={2}>
        <Box>
          <Button onClick={handleLastMonth}>LAST MONTH</Button>
          <Button onClick={handleCurrentMonth}>CURRENT MONTH</Button>
        </Box>
        <Box display={'flex'}>
          <Autocomplete options={filterOptions} getOptionLabel={(option) => option.label || ""} renderInput={(params) => <TextField {...params} placeholder='Filter By' />} sx={{ width: 120, pr: 2 }} size='small' onChange={(e, value) => handleFilterByTypeChange(e, value)} value={filterBy} />
          <Box pr={2}>
            <DatePicker handleOnChange={(date) => handleFilterFromDateChange(date)} label='' name='Date' value={filterFromDate} placeholder='From' />
          </Box>
          <Box pr={2}>
            <DatePicker handleOnChange={(date) => handleFilterTomDateChange(date)} label='' name='Date' value={filterToDate} placeholder='To' />
          </Box>
          <Button variant='contained' onClick={handleFilter}>Filter</Button>
        </Box>
      </Box> */}

      <Box display={"flex"} justifyContent={"space-between"}>
        {data?.data?.length ? <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Product Stock ({data?.data?.length})</Typography> : <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Product Stock</Typography>}
        <Box display={'flex'} >

          {/* <CustomSearchInput value={searchInput} handleChange={handleSearchInput} /> */}

          <Button onClick={() => navigate("/products/new-product")} variant="contained" sx={{ bgcolor: "#014", height: 45, mb:2 }}>
            New Product
          </Button>
        </Box>
      </Box>
      {data ? <CustomTable columns={columns} rows={salesRows} renderCell={renderCell} /> :
        <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ color: "grey", fontSize: 20 }}>No data available</Typography>
        </Box>
      }
      <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
        {/* <button onClick={() => setPageNo(0)}
          disabled={isLoading || pageNo === 0}>first</button> */}
        <IconButton onClick={() => setPageNo(pageNo - 1)}
          disabled={isLoading || pageNo === 1} sx={{bgcolor:"#808080", mr:1, height:30, width:30, "&:hover": {
            bgcolor: "#36454F", 
            color: "#fff",    
          },}}><ArrowBackIosIcon sx={{fontSize:15, color:"#fff"}}/></IconButton>
        <IconButton onClick={() => setPageNo(pageNo + 1)}
          disabled={isLoading || data?.data?.length < perPageValue} sx={{bgcolor:"#808080",height:30, width:30,  "&:hover": {
            bgcolor: "#36454F", 
            color: "#fff",     
          },}}><ArrowForwardIosIcon sx={{fontSize:15, color:"#fff"}}/></IconButton>
        {/* <button onClick={() => setPageNo(Math.round(count / perPageValue) - 1)}
          disabled={isLoading || data?.data?.length < perPageValue}>last</button> */}
      </Box>

    </Box>
  )
}

export default StockList