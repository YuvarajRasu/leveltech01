import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomSearchInput from '../../components/CustomSearchInput';
import CustomTable from '../../components/CustomTable';
import { useGetPurchaseListQuery } from '../../features/PruchaseApi/PurchaseApi';

const PurchaseList = () => {
  const navigate = useNavigate();
  const [pageNo, setPageNo] = useState<number>(1);
  const [perPageValue] = useState<number>(10)
  const [searchInput, setSearchInput] = useState("")

  const { data, isLoading, refetch } = useGetPurchaseListQuery({pageNo, perPageValue, searchInput}, { refetchOnMountOrArgChange: true })

  const columns = [
    { id: 'number', label: '#' },
    { id: 'starred', label: 'Star' },
    { id: 'vendorName', label: 'Vendor' },
    { id: 'invoiceNo', label: 'Invoice Number' },
    { id: 'invoiceDate', label: 'Invoice Date' },
    { id: 'totalAmount', label: 'Total Amount' },
    { id: 'taxAmountGst', label: 'GST Amount' },
    { id: 'totalAmount', label: 'Grand Total' },
    { id: 'packing', label: 'Packing Charges' },
    { id: 'paidAmount', label: 'Paid' },
    { id: 'due', label: 'Due' },
    // { id: 'invoiceUploaded', label: 'Invoice(Uploaded)' },
    { id: 'modeOfDispatch', label: 'Mode of despatch' },
    { id: 'transporter', label: 'Transporter' },
    { id: 'createdAt', label: 'Created Date' },
    // { id: 'action', label: 'Action' },
    
  ];

  const purchaseRows = data?.data?.map((item:any, index:number) => ({
    number: index + 1,
    starred: item.starred,
    vendorName: item.vendorName,
    invoiceNo: item.invoiceNo,
    invoiceDate: item.invoiceDate,
    totalAmount: item.totalAmount,
    taxAmountGst: item.taxAmountGst,
    // subtotal: item.subtotal !== null ? item.subtotal : "N/A",
    packing: item.packing,
    paidAmount: item.paidAmount,
    due: item.due,
    modeOfDispatch: item.modeOfDispatch,
    transporter: item.transporter,
    createdAt: item.createdAt,
    // action: <Box><IconButton sx={{bgcolor:"#F0F8FF", mr:{lg:2}}} size="small" onClick={() => handleEdit(item.id)}><EditIcon sx={{color:"#A9A9A9"}}/></IconButton></Box>

  })) || []

  const renderCell = (column:any, row:any) => {
    switch(column.id){
      case 'starred':
        return row.starred ? '⭐' : '☆';
      case 'invoiceDate':
      case 'createdAt':
        return dayjs(row[column.id]).format('DD-MM-YYYY');
      case 'totalAmount':
      case 'taxAmountGst':
      case 'subtotal':
      case 'packing':
      case 'paidAmount':
      case 'due':
        return row[column.id]?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
      default:
        return row[column.id];
    }
  }


  const handleSearchInput = (e: any) => {
    setSearchInput(e.target.value)
  }

 useEffect(() => {
        refetch()
    }, [pageNo, refetch])


  return (
    <Box>
      {/* <Box display={'flex'} justifyContent={"space-between"} pb={2}> */}
        {/* <Box>
          <Button onClick={handleLastMonth} sx={{bgcolor:"red", color: "#fff"}} size='small'>LAST MONTH</Button>
          <Button onClick={handleCurrentMonth} sx={{bgcolor:"blue",color:"#fff",ml:2}} size='small'>CURRENT MONTH</Button>
        </Box> */}
        {/* <Box display={'flex'}>
          <Autocomplete options={filterOptions} getOptionLabel={(option) => option.label || ""} renderInput={(params) => <TextField {...params} placeholder='Filter By' />} sx={{ width: 120, pr: 2 }} size='small' onChange={(e, value) => handleFilterByTypeChange(e, value)} value={filterBy} />
          <Box pr={2}>
            <DatePicker handleOnChange={(date) => handleFilterFromDateChange(date)} label='' name='Date' value={filterFromDate} placeholder='From' />
          </Box>
          <Box pr={2}>
            <DatePicker handleOnChange={(date) => handleFilterTomDateChange(date)} label='' name='Date' value={filterToDate} placeholder='To' />
          </Box>
          <Button variant='contained' onClick={handleFilter}>Filter</Button>
        </Box> */}
      {/* </Box> */}

      <Box display={"flex"} justifyContent={"space-between"}>
        {data?.length ? <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Purchases ({data?.length})</Typography> : <Typography sx={{ fontWeight: 600, fontSize: 20 }}>Purchases</Typography>}
        <Box display={'flex'} >
          <CustomSearchInput value={searchInput} handleChange={handleSearchInput} />

          <Button onClick={() => navigate("new-purchase")} variant="contained" sx={{ bgcolor: "#014",height: 45 }}>
            New Purchase
          </Button>
        </Box>
      </Box>
      {data ? <CustomTable columns={columns} rows={purchaseRows} renderCell={renderCell}/>: 
      <Box sx={{height:300, display:"flex", alignItems:"center", justifyContent:"center"}}>
        <Typography sx={{color:"grey", fontSize:20}}>No data available</Typography>
      </Box>}
      <Box mt={2} display={'flex'} justifyContent={'flex-end'}>
        <IconButton onClick={() => setPageNo(pageNo - 1)}
          disabled={isLoading || pageNo === 1} sx={{
            bgcolor: "#808080", mr: 1, height: 30, width: 30, "&:hover": {
              bgcolor: "#36454F",
              color: "#fff",
            },
          }}><ArrowBackIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
        <IconButton onClick={() => setPageNo(pageNo + 1)}
          disabled={isLoading || data?.data?.length < perPageValue} sx={{
            bgcolor: "#808080", height: 30, width: 30, "&:hover": {
              bgcolor: "#36454F",
              color: "#fff",
            },
          }}><ArrowForwardIosIcon sx={{ fontSize: 15, color: "#fff" }} /></IconButton>
      </Box>
    </Box>
  )
}

export default PurchaseList