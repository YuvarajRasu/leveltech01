import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get("token");
            if (token) {
                headers.set("Authorization", `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (arg) => ({
                url: "product/list",
                method: "GET",
            }),
        }),
        postProduct: builder.mutation({
            query: (credentials) => ({
                url: "product",
                method: "POST",
                body: credentials
            }),
        }),
        updateProduct: builder.mutation({
            query: (credentials) => ({
                url: "product",
                method: "PUT",
                body: credentials
            }),
        }),
        deleteProduct: builder.mutation({
            query: (credentials) => ({
                url: "product",
                method: "DELETE",
                body: credentials
            }),
        }),
        getProductsByCategoryId: builder.query({
            query: (arg) => ({
                url: `product/${arg}/category`,
                method: "GET",
            }),
        }),
    })
})

export const { useGetProductsQuery, usePostProductMutation,useUpdateProductMutation, useDeleteProductMutation, useGetProductsByCategoryIdQuery } = productApi