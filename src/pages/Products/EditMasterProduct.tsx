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
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CustomReactSelect from "../../components/CustomReactSelect";
import { useGetCategoryQuery } from "../../features/CategoryService/CategoryApi";
import { useGetMasterProductByIdMutation, useUpdateMasterProductListWithOptionsMutation } from "../../features/MasterProductService/MasterProductApi";
import { useGetModelsQuery } from "../../features/ModelApi/ModelApi";
import {
    useGetProductsQuery,
} from "../../features/ProductService/ProductApi";

const validationSchema = Yup.object().shape({
    category: Yup.object()
        .shape({
            label: Yup.string().required("Category is required"),
            value: Yup.string().required("Category is required"),
        })
        .nullable()
        .required("Category is required"),
    product: Yup.object()
        .shape({
            label: Yup.string().required("Product is required"),
            value: Yup.string().required("Product is required"),
        })
        .nullable()
        .required("Product is required"),
    model: Yup.object()
        .shape({
            label: Yup.string().required("Model is required"),
            value: Yup.string().required("Model is required"),
        })
        .nullable()
        .required("Model is required"),
    hsnCode: Yup.string().required("HSN/CODE required"),
    tax: Yup.string().required("Tax value required"),
})

const EditMasterProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    const [getMasterProductById, {
        data: productByIdData,
    }] = useGetMasterProductByIdMutation({});

    const initialValues = {
        category: { value: productByIdData?.category?.id || "", label: productByIdData?.category?.name || "" },
        product: { value: productByIdData?.product?.id || "", label: productByIdData?.product?.name || "" },
        model: { value: productByIdData?.model?.id || "", label: productByIdData?.model?.name || "" },
        hsnCode: productByIdData?.hsnAcs || "",
        tax: productByIdData?.tax || "",
        description: productByIdData?.description || "",
    };

    const [
        updateMasterProduct,
        {
            isError: updateMasterProductError,
        },
    ] = useUpdateMasterProductListWithOptionsMutation();

    console.log(updateMasterProductError);


    const handleSubmit = (values: any) => {
        const data = {
            category: values.category?.label.toUpperCase(),
            product: values.product?.label,
            model: values.model?.label,
            tax: Number(values.tax),
            hsnAcs: values.hsnCode,
            description: values.description,
        };

        console.log('Final Submitted Data:', data);
        updateMasterProduct({ id, data }).then(res => {
            if (res?.error) {
                toast.error("Unable to update Duplicate data");
            }
            if (res?.data) {
                toast.success("Product updated successfully");
                navigate(-1)
            }
        }
        );
    };

    const {
        data: categories,
        isLoading: categoriesIsLoading,
    } = useGetCategoryQuery({});
    const {
        data: products,
        isLoading: productsIsLoading,
    } = useGetProductsQuery({});
    const {
        data: models,
        isLoading: modelsIsLoading,
    } = useGetModelsQuery({});

    const handlebackClick = () => {
        navigate(-1)
    };

    useEffect(() => {
        getMasterProductById(id)
    }, [id])

    return (
        <Box mt={3} mx={5} width={"80%"}>
            <Paper elevation={2} sx={{ borderRadius: 3 }}>
                <Typography sx={{ fontWeight: 700, p: 2 }}>
                   Update product information:
                </Typography>
                <Divider />

                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, setFieldValue, handleChange, handleBlur, errors, touched }) => (
                        <Form>
                            <Grid2 container px={3} columnSpacing={8}>
                                <Grid2 size={12}>
                                    <Box mt={3}>
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
                                        />
                                        {
                                            errors.category && touched.category && (
                                                <Box sx={{color:"red"}}>{errors.category}</Box>
                                            )
                                        }
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>Product</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"product"}
                                            options={
                                                products
                                                    ? products.map((product: any) => ({
                                                        label: product.name,
                                                        value: product.id,
                                                    }))
                                                    : []
                                            }
                                            placeholder={
                                                productsIsLoading ? "Loading Products..." : "Select Product"
                                            }
                                        />
                                        {
                                            errors.product && touched.product && (
                                                <Box sx={{color:"red"}}>{errors.product}</Box>
                                            )
                                        }
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>Model</Typography>

                                        <CustomReactSelect
                                            setFieldValue={setFieldValue}
                                            setFieldValueLabel={"model"}
                                            options={
                                                models
                                                    ? models.map((model: any) => ({
                                                        label: model.name,
                                                        value: model.id,
                                                    }))
                                                    : []
                                            }
                                            placeholder={
                                                modelsIsLoading ? "Loading Models..." : "Select Model"
                                            }
                                        />
                                        {
                                            errors.model && touched.model&& (
                                                <Box sx={{color:"red"}}>{errors.model}</Box>
                                            )
                                        }
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>HSN/ACS</Typography>

                                        <TextField
                                            // label={"HSN/ACS"}
                                            name="hsnCode"
                                            type={"text"}
                                            value={values.hsnCode}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="HSN/ACS"
                                        />
                                        {
                                            errors.hsnCode && touched.hsnCode && (
                                                <Box sx={{color:"red"}}>{errors.hsnCode}</Box>
                                            )
                                        }
                                    </Box>
                                </Grid2>
                                <Grid2 size={6}>
                                    <Box>
                                        <Typography my={1}>Tax</Typography>

                                        <TextField
                                            name="tax"
                                            type={"text"}
                                            value={values.tax}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            size="small"
                                            fullWidth
                                            placeholder="Tax"
                                        />
                                        {
                                            errors.tax && touched.tax && (
                                                <Box sx={{color:"red"}}>{errors.tax}</Box>
                                            )
                                        }
                                    </Box>
                                </Grid2>
                                <Grid2 size={12}>
                                    <Box>
                                        <Typography my={2}>Description <Box component="span" color="#C0C0C0">(Optional)</Box></Typography>
                                        <TextField
                                            name="description"
                                            id="description"
                                            // label="Description"
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
                                            type="button"
                                            variant="contained"
                                            sx={{ bgcolor: "grey", mr: 3 }}
                                            onClick={handlebackClick}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
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

export default EditMasterProduct;
