import {
    Box,
    Button,
    Divider,
    Grid2,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import CustomReactSelect from "../../components/CustomReactSelect";
import { useGetCategoryQuery } from "../../features/CategoryService/CategoryApi";
import { usePostMasterProductDataMutation } from "../../features/MasterProductService/MasterProductApi";
import { useGetModelsQuery } from "../../features/ModelApi/ModelApi";
import {
    useGetProductsQuery,
    usePostProductMutation,
} from "../../features/ProductService/ProductApi";

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
    } = useGetCategoryQuery({});
    const {
        data: products,
    } = useGetProductsQuery({});
    const {
        data: models,
    } = useGetModelsQuery({});

    const [
        postMasterProduct,
        {
            data: masterProduct,
        },
    ] = usePostMasterProductDataMutation();

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
        } catch (error) {
            console.error("Error sending data to backend:", error);
        } finally {
            setLoading(false);
        }
    };
    const sendToSecondBackend = () => {
        
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

        postMasterProduct(data);
        setShowProductList(true);
    };

    const handleSubmit = async (values: any) => {
        await sendToFinalBackend(values);
    };

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
