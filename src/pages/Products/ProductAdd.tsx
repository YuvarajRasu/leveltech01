import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import {
    Button,
    Box,
    TextField,
    Paper,
    Typography,
    Divider,
    Grid2,
} from "@mui/material";
import CreatableSelect from "react-select/creatable";
import { useFormik } from "formik";
import CustomReactSelect from "../../components/CustomReactSelect";
import { usePostMasterProductDataMutation } from "../../features/MasterProductService/MasterProductApi";
import { useGetCategoryQuery } from "../../features/CategoryService/CategoryApi";
import {
    useGetProductsQuery,
    usePostProductMutation,
} from "../../features/ProductService/ProductApi";
import { useGetModelsQuery } from "../../features/ModelApi/ModelApi";

const initialValues = {
    category: [],
    product: [],
    model: [],
    hsnCode: "",
    tax: "",
    description: "",
};

const ProductAdd = ({ setShowProductList }: any) => {
    const [loading, setLoading] = useState(false);

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

    const [
        postMasterProduct,
        {
            isLoading: postMasterProductLoading,
            isError: postMasterProductError,
            data: masterProduct,
        },
    ] = usePostMasterProductDataMutation();
    const [
        postProduct,
        {
            isLoading: postProductLoading,
            isError: postProductError,
            data: postProductData,
        },
    ] = usePostProductMutation();

    // Simulate API request
    console.log(categories);
    console.log(products);
    console.log(models);

    const sendToFirstBackend = async (value: string) => {
        setLoading(true);
        try {
            const response = await fetch("/api/endpoint1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ value }), // Send value to backend
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }
            console.log("Data sent successfully");
        } catch (error) {
            console.error("Error sending data to backend:", error);
        } finally {
            setLoading(false);
        }
    };
    const sendToSecondBackend = async (value: string) => {
        const data = {
            id: 0,
            name: value,
        };
        console.log(data);

        // postProduct(data)
    };

    const sendToThirdBackend = async (value: string) => {
        setLoading(true);
        try {
            const response = await fetch("/api/endpoint3", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ value }), // Send value to backend
            });

            if (!response.ok) {
                throw new Error("Failed to send data");
            }
            console.log("Data sent successfully");
        } catch (error) {
            console.error("Error sending data to backend:", error);
        } finally {
            setLoading(false);
        }
    };
    const sendToFinalBackend = async (values: any) => {
        const data = {
            category: values.category.label,
            product: values.product.label,
            model: values.model.label,
            tax: Number(values.tax),
            hsnAcs: values.hsnCode,
            description: values.description,
        };

        console.log(data);
        postMasterProduct(data);
        setShowProductList(true);
        console.log(masterProduct);
    };

    const handleSubmit = async (values: any) => {
        await sendToFinalBackend(values);
        console.log(values);
        // e.preventDefault();
        // console.log(e);
        // const data = {
        //     category: values.category.label,
        //     product: values.product.label,
        //     model: values.model.label,
        //     tax: Number(values.tax),
        //     hsnAcs: values.hsnCode,
        //     description: values.description
        // }

        // console.log(data);
        // postMasterProduct(data);
        // setShowProductList(true);
        // console.log(masterProduct);

        // Make a POST request here to save the product with all field values
    };

    // const handleBack = () => {
    //     setShowProductList(true);
    // };

    const handlebackClick = () => {
        setShowProductList(true);
    };

    return (
        <Box mt={3} mx={5} width={"80%"}>
            <Paper elevation={2} sx={{ borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 700, p: 2 }}>
                    Product information:
                </Typography>
                <Divider />

                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, setFieldValue, handleChange, handleBlur }) => (
                        <Form>
                            <Grid2 container px={3} columnSpacing={8}>
                                <Grid2 size={12}>
                                    <Box mt={3}>
                                        <Typography my={1}>Category</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"category"}
                                            sendToBackEnd={sendToFirstBackend}
                                            options={
                                                categories
                                                    ? categories.map((category: any) => ({
                                                        label: category.name,
                                                        id: category.id,
                                                    }))
                                                    : []
                                            }
                                            placeholder={"Category"}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>Product</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"product"}
                                            sendToBackEnd={sendToSecondBackend}
                                            id="2"
                                            options={
                                                products
                                                    ? products.map((product: any) => ({
                                                        label: product.name,
                                                        id: product.id,
                                                    }))
                                                    : []
                                            }
                                            placeholder={"Product"}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>Model</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"model"}
                                            sendToBackEnd={sendToThirdBackend}
                                            id="3"
                                            options={
                                                models
                                                    ? models.map((model: any) => ({
                                                        label: model.name,
                                                        id: model.id,
                                                    }))
                                                    : []
                                            }
                                            placeholder={"Model"}
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>HSN/ACS</Typography>

                                        <TextField
                                            label={"HSN/ACS"}
                                            name="hsnCode"
                                            type={"text"}
                                            value={values.hsnCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>Tax</Typography>

                                        <TextField
                                            label={"Tax (%)"}
                                            name="tax"
                                            type={"text"}
                                            value={values.tax}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={12}>
                                    <Box>
                                        <Typography my={2}>Description <Box component="span" color="#C0C0C0">(Optional)</Box></Typography>
                                        <TextField
                                            name="description"
                                            id="description"
                                            label="Description"
                                            value={values.description}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Box>
                                </Grid2>
                                <Grid2 size={12} display={"flex"} justifyContent={"end"}>
                                    <Box my={2}>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            variant="contained"
                                            sx={{ bgcolor: "grey", mr: 3 }}
                                            onClick={handlebackClick}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            variant="contained"
                                            sx={{ bgcolor: "red" }}
                                        >
                                            Submit
                                        </Button>

                                    </Box>
                                </Grid2>
                            </Grid2>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Box>
    );
};

export default ProductAdd;
