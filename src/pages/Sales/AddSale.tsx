import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid2,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomReactSelect from "../../components/CustomReactSelect";
import DatePicker from "../../components/DatePicker";
import { useGetCategoryQuery } from "../../features/CategoryService/CategoryApi";
import { useGetCustomerListQuery } from "../../features/CustomerService.ts/customerApi";
import { useGetModelsByProductIdQuery, useGetModelsQuery } from "../../features/ModelApi/ModelApi";
import {
    useGetProductsByCategoryIdQuery,
    useGetProductsQuery
} from "../../features/ProductService/ProductApi";
import { usePostSaleMutation } from "../../features/salesService/SalesApi";
import AddCustomer from "../Customer/AddCustomer";





const vendorOptions: Array<{ label: string, value: any }> = [
    { label: "one", value: "One" },
    { label: "two", value: "Two" },
    { label: "three", value: "Three" }
]

const consignedOptions: Array<{ label: string, value: any }> = [
    { label: "CHENNAI", value: "CHENNAI" },
    { label: "HYDERABAD", value: "HYDERABAD" },
    { label: "BANGALORE", value: "BANGALORE" }
]
const yearList: Array<{ label: string, value: any }> = [
    { label: "2014-2015", value: "2014" },
    { label: "2015-2016", value: "2015" },
    { label: "2016-2017", value: "2016" },
    { label: "2017-2018", value: "2017" },
    { label: "2018-2019", value: "2018" },
    { label: "2019-2020", value: "2019" },
    { label: "2020-2021", value: "2020" },
    { label: "2021-2022", value: "2021" },
    { label: "2022-2023", value: "2022" },
    { label: "2023-2024", value: "2023" },
    { label: "2024-2025", value: "2024" },
    { label: "2025-2026", value: "2025" },
    { label: "2026-2027", value: "2026" },
]


const AddSale = () => {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
        customerId: null,
        gstNo: "",
        billDate: "",
        invoiceNo: "",
        year: null,
        deliveryDate: "",
        deliveryNo: "",
        purchaseOrderNo: "",
        reverseCharge: null,
        dispatchCity: null,
        transporter: "",
        paymentMode: null,
        paymentStatus: null,
        sameShipping: null,

        category: null,
        product: null,
        model: null,
        hsnCode: "",
        quantity: "",
        MRPrate: "",
        tax: "",
        taxAmount: "",
        amount: "",
        serviceRemarks: "",

        transportCharge: "",
        packingCharge: "",
        paidDate: "",
        paidAmount: "",

        Subtotal: "",
        Cgst: "",
        Sgst: "",
        Igst: "",
        TaxAmountGst: "",
        GrandTotal: "",
    })

    const [openAddCustomerModal, setOpenAddCustomerModal] = useState<boolean>(false)
    const [categoryId, setCategoryId] = useState(null);
    const [productId, setProductId] = useState(null);
     const [category, setCategory] = useState<string | null>(null)
        const [product, setProduct] = useState<string | null>(null)
    const { data: cusomerList, refetch } = useGetCustomerListQuery({pageNo:1, perPageValue:10, searchInput:""}, { refetchOnMountOrArgChange: true });
    const [postSale, { data: postSaleData, isLoading: postSaleIsLoading, isError: postSaleIsError }] = usePostSaleMutation()


    console.log(cusomerList,postSaleData)

    const customerOptions = cusomerList?.map((customer: any) => ({
        value: customer.id || 1,
        label: `${customer.name[0].toUpperCase() + customer.name.slice(1).toLowerCase()}`,
        // label: `${customer.title} ${customer.name[0].toUpperCase() + customer.name.slice(1).toLowerCase()}`,
    }));



    // const {
    //     data: vendorList,
    //     error: vendorListError,
    //     isLoading: vendorListIsLoading,
    // } = useGetVendorListQuery({});

    const {
        data: categories,
        error: categoriesError,
        isLoading: categoriesIsLoading,
    } = useGetCategoryQuery({});
     const {
            data: products,
            error: productsError,
            isLoading: productsIsLoading,
        } = useGetProductsQuery({});
        const {
            data: models,
            error: modelsError,
            isLoading: modelsIsLoading,
        } = useGetModelsQuery({});
    const {
        data: prductsByCategory,
        error: prductsByCategoryError,
        isLoading: prductsByCategoryIsLoading,
    } = useGetProductsByCategoryIdQuery(categoryId ?? skipToken);

    const {
        data: modelByProducts,
        error: modelByProductsError,
        isLoading: modelByProductsIsLoading,
    } = useGetModelsByProductIdQuery(productId ?? skipToken);

    const productOptions = categoryId !== null && prductsByCategory ? prductsByCategory : products
    const modelOptions = productId !== null && modelByProducts ? modelByProducts : models



    // console.log(vendorList);

    const colourStyles = {
        menuList: (baseStyles: any) => ({
            ...baseStyles,
            background: 'white'
        }),
        option: (baseStyles: any, { isFocused, isSelected }: any) => ({
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
            zIndex: 1
        }),
        menu: (baseStyles: any) => ({
            ...baseStyles,
            zIndex: 100
        }),
    }

    const handleClose = () => {
        setOpenAddCustomerModal(false)
    }

    const handleAddCustomerClick = () => {
        setOpenAddCustomerModal(true)
    }

    const handleCloseCustomerModal = () => {
        setOpenAddCustomerModal(false)
        refetch();
    }

    const handleClick = (values: any) => {
        console.log("purchase", values);

    }


    const handleSubmit = async (values: any) => {
        const data = {
            customerId: values.customerId.value,
            gstNo: values.gstNo,
            dispatchCity: values.dispatchCity.value,
            transporter: values.transporter,
            paymentMode: values.paymentMode.value,
            paymentStatus: values.paymentStatus.value,
            sameShipping: values.sameShipping.value,
            invoiceNo: values.invoiceNo,
            year: Number(values.year.value),
            billDate: values.billDate,
            deliveryDate: values.deliveryDate,
            deliveryNo: values.deliveryNo,
            purchaseOrderNo: values.purchaseOrderNo,
            reverseCharge: values.reverseCharge.value,
            packingCharge: values.packingCharge,
            transportCharge: values.transportCharge,
            cgst: Number(values.tax) / 2,
            sgst: Number(values.tax) / 2,
            igst: Number(values.tax),
            taxAmountGst: Number(values.tax),
            paidDate: values.paidDate,
            paidAmount: values.paidAmount,
            subTotal: Number(values.quantity) * Number(values.MRPrate),
            grandTotal: Number(values.quantity) * Number(values.MRPrate) + Number(values.tax) + Number(values.packingCharge) + Number(values.transportCharge),
            saleItemRequest: [
                {
                    categoryName: category !== null && category || values.category.value,
                    productName: product !== null && product || values.product.value,
                    modelName: values.model.label,
                    hsnNo: values.hsnCode,
                    quantity: values.quantity,
                    mrpRate: values.MRPrate,
                    tax: values.tax,
                    taxAmount: Number(values.tax),
                    amount: Number(values.quantity) * Number(values.MRPrate),
                    serviceRemarks: values.serviceRemarks,
                    // "saleId": 0
                }
            ]
        }

        await postSale(data).then((res: any) => {
            if (res?.error) {
                toast.error("Unable to add Sale");
            }
            if (res?.data) {
                toast.success("Sale added successfully");
                navigate("/sales")
            }
        });

        console.log("Form sale submit", data);

    }

    const Calculations = ({ values }: any) => {
        return (
            <Table sx={{
                [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none"
                }
            }}>
                <TableBody >
                    <TableRow sx={{ border: "none" }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>Subtotal</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.quantity && values.MRPrate !== "" ? Number(values.quantity) * Number(values.MRPrate) : 0}</TableCell>
                    </TableRow>
                    <TableRow sx={{ border: "none" }}>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>CGST(+)</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.tax !== "" ? Number(values.tax) / 2 : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>SGST(+)</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.tax !== "" ? Number(values.tax) / 2 : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>IGST(+)</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.tax !== "" ? Number(values.tax) / 2 + Number(values.tax) / 2 : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>Tax Amount GST(+)</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.tax !== "" ? Number(values.tax) : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>Packing(+)</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.packingCharge !== "" ? values.packingCharge : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>Transport(+)</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.transportCharge !== "" ? values.transportCharge : 0}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 18 }}>Grand Total</TableCell>
                        <TableCell sx={{ display: "flex", justifyContent: "end", fontWeight: 600, fontSize: 18 }}>{values.quantity && values.MRPrate !== "" ? Number(values.quantity) * Number(values.MRPrate) + Number(values.tax) + Number(values.packingCharge) + Number(values.transportCharge) : 0}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }


    const isConsignedCitySelected = initialValues?.dispatchCity?.length > 0;
    console.log(isConsignedCitySelected);

    const YES_OR_NO_OPTIONS = [{ label: "Yes", value: true }, { label: "No", value: false }]
    const paymentOptions = [{ label: "Cash", value: "CASH" }, { label: "Cheque", value: "CHEQUE" }, { label: "NEFT", value: "NEFT" }]
    const paymentStatusOptions = [{ label: "Received", value: "RECEIVED" }, { label: "Part Payment", value: "PART_PAYMENT" }, { label: "Not Yet", value: "NOT_RECEIVED" }]


    const handleChangeCategory = (category: any, setFieldValue: Function) => {
        setCategoryId(category.value);
        setCategory(category.label);
    
        // Reset the product and model fields
        setProductId(null);
        setProduct(null);
        setFieldValue("product", null);
        setFieldValue("model", null);
    
        console.log(category, "From change category");
    };

    const handleChangeProduct = (product: any, setFieldValue: Function) => {
        setProductId(product.value)
        setProduct(product.label)
        setFieldValue("model", null);
        console.log(product, "From change category")
        // setSkipGetskipGetModelByProducts(false)
    }
    return (
        <Box my={2}>
            <Paper elevation={2} sx={{ borderRadius: 3 }}>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography sx={{ fontWeight: 700, p: 2 }}>
                        New Sale:
                    </Typography>
                    <Button variant="contained" type="button" sx={{ mr: 2, bgcolor: "grey", height: 30 }} onClick={() => navigate(-1)}>Back</Button>

                </Box>

                <Divider />

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, handleChange, handleBlur }) => (
                        <Form>
                            <Grid2 container px={3} pb={4} columnSpacing={3}>
                                <Grid2 size={6}>
                                    <Box mt={3}>
                                        <Box display={"flex"} justifyContent={"space-between"}>
                                            <Typography my={1}>Choose Customer</Typography>
                                            <Typography my={1} sx={{ color: "red", cursor: "pointer" }} onClick={handleAddCustomerClick}>+ New</Typography>
                                        </Box>
                                        {/* <Box mt={3}>

                                                <Typography my={1}>Year</Typography> */}
                                        <Autocomplete
                                            disablePortal
                                            options={customerOptions}
                                            value={values.customerId}
                                            onChange={(event, newValue) => setFieldValue("customerId", newValue)}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                                            // sx={{ width: 300 }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="Choose customer" name="customerId" />}
                                        />
                                        {/* </Box> */}
                                        {/* <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={true}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="customerId"
                                            options={customerOptions}
                                            styles={colourStyles}
                                        /> */}
                                    </Box>
                                    <Box mt={3}>
                                        <Box my={1}>
                                            <Typography>GST No</Typography>
                                        </Box>
                                        <TextField
                                            name="gstNo"
                                            type={"text"}
                                            value={values.gstNo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            placeholder="GST Number"
                                            fullWidth
                                        />
                                    </Box>

                                    <Box mt={3}>
                                        <DatePicker
                                            placeholder={"Bill Date"}
                                            label={"Bill Date"}
                                            name="billDate"
                                            handleOnChange={(date) => setFieldValue("billDate", date)}
                                        />
                                    </Box>
                                    <Grid2 container columnSpacing={2}>
                                        <Grid2 size={6} >
                                            <Box mt={3}>
                                                <Typography my={1}>Invoice No</Typography>
                                                <TextField
                                                    name="invoiceNo"
                                                    type={"text"}
                                                    value={values.invoiceNo}
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    size="small"
                                                    placeholder="Invoice No"
                                                    fullWidth
                                                />
                                            </Box>
                                        </Grid2>
                                        <Grid2 size={6}>
                                            <Box mt={3}>

                                                <Typography my={1}>Year</Typography>
                                                <Autocomplete
                                                    disablePortal
                                                    options={yearList}
                                                    value={values?.year}
                                                    onChange={(event, newValue) => setFieldValue("year", newValue)}
                                                    sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                                                    // sx={{ width: 300 }}
                                                    renderInput={(params: any) => <TextField {...params} placeholder="Choose year" name="year" />}
                                                />
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                    <Box mt={3}>
                                        <DatePicker
                                            placeholder={"Delivery Date"}
                                            label={"Delivery Date"}
                                            name="deliveryDate"
                                            handleOnChange={(date) => setFieldValue("deliveryDate", date)}
                                        />
                                    </Box>
                                    <Box mt={3}>
                                        <Box>
                                            <Typography my={1}>Delivery No</Typography>
                                        </Box>
                                        <TextField
                                            name="deliveryNo"
                                            type={"text"}
                                            value={values.deliveryNo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Delivery No"
                                        />
                                    </Box>
                                    <Box mt={3}>
                                        <Box>
                                            <Typography my={1}>Purchase Order No</Typography>
                                        </Box>
                                        <TextField
                                            name="purchaseOrderNo"
                                            type={"text"}
                                            value={values.purchaseOrderNo}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Purchase Order No"
                                        />
                                    </Box>
                                </Grid2>

                                <Grid2 size={6}>
                                    <Box mt={4}>
                                        <Typography my={1}>Reverse Charge (Y/N)</Typography>
                                        <Autocomplete
                                            disablePortal
                                            options={YES_OR_NO_OPTIONS}
                                            value={values.reverseCharge}
                                            onChange={(event: any, newValue: any) => setFieldValue("reverseCharge", newValue)}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "0px 2px 0px 2px" } }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="YES / NO" name="reverseCharge" />}
                                        />
                                    </Box>
                                    <Box mt={3}>
                                        <Typography my={1}>Dispatch City</Typography>
                                        <Autocomplete
                                            disablePortal
                                            options={consignedOptions}
                                            value={values?.dispatchCity}
                                            onChange={(event, newValue) => { setFieldValue("dispatchCity", newValue); console.log("value consigned", newValue) }}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                                            // sx={{ width: 300 }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="Choose city" name="dispatchCity" />}
                                        />
                                        {/* <Autocomplete
                                            disablePortal
                                            options={consignedOptions}
                                            value={values?.dispatchCity}
                                            onChange={(event, newValue) => { setFieldValue("consignedTo", newValue); console.log("value consigned", newValue) }}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 1px 2px" } }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="Choose city" name="consignedTo" />}
                                        /> */}
                                    </Box>
                                    <Box mt={3}>
                                        <Box >
                                            <Typography my={1}>Transporter</Typography>
                                        </Box>
                                        <TextField
                                            name="transporter"
                                            type={"text"}
                                            value={values.transporter}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Transporter"
                                        />
                                    </Box>
                                    <Box mt={3}>
                                        <Typography my={1}>Payment Mode</Typography>
                                        <Autocomplete
                                            disablePortal
                                            options={paymentOptions}
                                            value={values.paymentMode}
                                            onChange={(event: any, newValue: any) => setFieldValue("paymentMode", newValue)}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 2px 2px" } }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="Choose payment mode" name="paymentMode" />}
                                        />
                                    </Box>
                                    <Box mt={3}>

                                        <Typography my={1}>Payment</Typography>
                                        <Autocomplete
                                            disablePortal
                                            options={paymentStatusOptions}
                                            value={values.paymentStatus}
                                            onChange={(event: any, newValue: any) => setFieldValue("paymentStatus", newValue)}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "0px 2px 2px 2px" } }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="Choose payment status" name="paymentStatus" />}
                                        />
                                    </Box>
                                    <Box mt={3}>
                                        <Typography my={1}>Same Shipping</Typography>
                                        <Autocomplete
                                            disablePortal
                                            options={YES_OR_NO_OPTIONS}
                                            value={values.sameShipping}
                                            onChange={(event: any, newValue: any) => setFieldValue("sameShipping", newValue)}
                                            sx={{ "& .MuiOutlinedInput-root": { padding: "1px 2px 2px 2px" } }}
                                            renderInput={(params: any) => <TextField {...params} placeholder="YES / NO" name="sameShipping" />}
                                        />
                                    </Box>
                                    {/* <Box mt={2}>
                                        <Button variant="contained" fullWidth startIcon={<FileUploadIcon />}>PURCHASES ORDER</Button>
                                    </Box> */}

                                </Grid2>
                            </Grid2>

                            <Typography p={1} color="grey">Select dispatch city to enable these fields:</Typography>

                            <Grid2 container columnSpacing={4} px={4} pb={4} pt={1} sx={{ border: "2px dashed rgba(255, 102, 0, .5)", backgroundColor: "rgba(255, 102, 0, .1)" }}>
                                <Grid2 size={4}>
                                    <Box>+Add More</Box>
                                    <Box >
                                        <Typography my={1}>Category</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"category"}
                                            options={
                                                categories
                                                    ? categories.map((category: any) => ({
                                                        label: category.name,
                                                        value: category.id,
                                                    }))
                                                    : []
                                            }
                                            placeholder={
                                                categoriesIsLoading ? "Loading Categories..." : "Select Category"
                                            }
                                            isDisabled={values.dispatchCity !== null ? false : true}
                                            isClearable={values.dispatchCity !== null ? false : true}
                                            sendToBackEnd={(selectedCategory: any) =>
                                                handleChangeCategory(selectedCategory, setFieldValue)
                                            }
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Box >
                                        <Typography my={1}>Product</Typography>

                                        <CustomReactSelect
                                             setFieldValue={setFieldValue}
                                             setFieldValueLabel={"product"}
                                             options={
                                                 products
                                                     ? productOptions.map((product: any) => ({
                                                         label: product.name,
                                                         value: product.id,
                                                     }))
                                                     : []
                                             }
                                            placeholder={
                                                productsIsLoading ? "Loading Products..." : "Select Product"
                                            }
                                            isDisabled={values.dispatchCity !== null ? false : true}
                                            isClearable={values.dispatchCity !== null ? false : true}
                                            sendToBackEnd={(selectedProduct: any) =>
                                                handleChangeProduct(selectedProduct, setFieldValue)
                                            }
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Box >
                                        <Typography my={1}>Model</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"model"}
                                            options={
                                                models
                                                    ? modelOptions.map((model: any) => ({
                                                        label: model.name,
                                                        value: model.name,
                                                    }))
                                                    : []
                                            }
                                            placeholder={
                                                modelsIsLoading ? "Loading Models..." : "Select Model"
                                            }
                                            isDisabled={values.dispatchCity !== null ? false : true}
                                            isClearable={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={4}>
                                    <Box>
                                        <Typography my={1}>HSN Code</Typography>
                                        <TextField
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            name="hsnCode"
                                            type={"text"}
                                            value={values.hsnCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="HSN Code"
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>

                                <Grid2 size={4}>
                                    <Box>
                                        <Typography my={1}>Quantity</Typography>
                                        <TextField
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            name="quantity"
                                            type={"text"}
                                            value={values.quantity}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Quantity"
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                        {/* <Box display={"flex"} alignItems={"center"}>

                                            <Add sx={{ fontSize: 17, cursor: "pointer" }} />
                                            <Box sx={{ cursor: "pointer" }}>
                                                serials
                                            </Box>
                                        </Box> */}

                                    </Box>
                                </Grid2>
                                <Grid2 size={2}>
                                    <Box>
                                        <Typography my={1}>MRP Rate</Typography>
                                        <TextField
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            name="MRPrate"
                                            type={"text"}
                                            value={values.MRPrate}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="MRP Rate"
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={2}>
                                    <Box>
                                        <Typography my={1}>Tax</Typography>
                                        <TextField
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            name="tax"
                                            type={"text"}
                                            value={values.tax}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Tax"
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={3} mt={1}>
                                    <Box>
                                        <Typography my={1}>Tax Amount</Typography>
                                        <TextField
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            name="taxAmount"
                                            type={"text"}
                                            value={Number(values.tax)}
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Tax Amount"
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={3} mt={1}>
                                    <Box>
                                        <Typography my={1}>Amount</Typography>
                                        <TextField
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            name="amount"
                                            type={"text"}
                                            value={Number(values.quantity) * Number(values.MRPrate)}
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Amount"
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={6} mt={1}>
                                    <Box>
                                        <Typography my={1}>Service remarks</Typography>
                                        <TextField
                                            name="serviceRemarks"
                                            id="serviceRemarks"
                                            value={values.serviceRemarks}
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            sx={{ bgcolor: values.dispatchCity !== null ? "#fff" : "#F2F2F2" }}
                                            fullWidth
                                            disabled={values.dispatchCity !== null ? false : true}
                                        />
                                    </Box>
                                </Grid2>
                            </Grid2>

                            <Grid2 container spacing={3} px={4} pb={3}>
                                <Grid2 size={3}>
                                    <Box mt={3}>
                                        <Typography my={1}>Packing</Typography>

                                        <TextField
                                            name="packingCharge"
                                            type={"text"}
                                            value={values.packingCharge}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Packing charge"
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={3}>
                                    <Box mt={3}>
                                        <Typography my={1}>Transport Charge</Typography>

                                        <TextField
                                            name="transportCharge"
                                            type={"text"}
                                            value={values.transportCharge}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Transport charge"
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={3}>
                                    <Box mt={3}>
                                        <Typography my={1}>Tax Total</Typography>
                                        <TextField
                                            // name="taxTotal"
                                            type={"text"}
                                            value={Number(values.tax)}
                                            onBlur={handleBlur}
                                            // onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Tax Total"
                                        />
                                    </Box>
                                </Grid2>
                            </Grid2>
                            <Divider variant="middle" component="li" sx={{ listStyle: "none" }} />
                            <Box>
                                <Grid2 container spacing={3} px={4} pb={2}>
                                    <Grid2 size={4} display={"flex"} alignItems={"end"}>
                                        <Button variant="contained" type="submit" onClick={handleClick}>SAVE INVOICE</Button>
                                        {/* <Button variant="outlined" type="button" sx={{ ml: 2 }} onClick={handleClick}>PRINT</Button> */}
                                    </Grid2>
                                    <Grid2 size={4}>
                                        <Box mt={3}>
                                            <DatePicker
                                                placeholder={"Paid Date"}   
                                                label={"Paid Date"}
                                                name="paidDate"
                                                handleOnChange={(date) => setFieldValue("paidDate", date)}
                                            />
                                        </Box>
                                        <Box>
                                            <Typography my={1}>Paid Amount</Typography>
                                            <TextField
                                                name="paidAmount"
                                                type={"text"}
                                                value={values.paidAmount}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                size="small"
                                                fullWidth
                                                placeholder="Paid Amount"
                                            />
                                        </Box>
                                        <Box>
                                            <FormControlLabel control={<Checkbox size="small" />} label="Include Challan" />
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={4} >
                                        <Calculations values={values} />
                                    </Grid2>

                                </Grid2>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Paper>
            <Modal open={openAddCustomerModal} onClose={handleClose} sx={{ height: "70%" }}>
                <AddCustomer handleClose={handleClose} handleCloseCustomerModal={handleCloseCustomerModal} />
            </Modal>
        </Box>
    )
}

export default AddSale
