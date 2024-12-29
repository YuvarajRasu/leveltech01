import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const masterProductsApi = createApi({
  reducerPath: "masterProductsApi",
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
    getAllMasterProduct: builder.query({
        query: () => ({
          url: "master/product/all",
          method: "GET",
        }),
      }),
    getMasterProductList: builder.query({
      query: ({pageNo, perPageValue, searchInput}) => ({
        url: `master/product/list?pageNo=${pageNo}&count=${perPageValue}&search=${searchInput}`,
        method: "GET",
      }),
    }),
    getMasterProductById: builder.mutation({
      query: (credentials) => ({
        url: `master/product/${credentials}`,
        method: "GET",
      }),
    }),
    postMasterProductData: builder.mutation({
      query: (credentials) => ({
        url: "master/product",
        method: "POST",
        body:credentials
      }),
    }),
    updateMasterProductListWithOptions: builder.mutation({
      query: (credentials) => ({
        url: `master/product/${credentials.id}`,
        method: "PUT",
        body: credentials.data
      }),
    }),
    deleteMasterProduct: builder.mutation({
      query: (credentials) => ({
        url: "master/product",
        method: "DELETE",
        body:credentials
      }),
    }),
  }),
});

export const { useGetAllMasterProductQuery, useGetMasterProductListQuery, useGetMasterProductByIdMutation, usePostMasterProductDataMutation, useUpdateMasterProductListWithOptionsMutation, useDeleteMasterProductMutation } = masterProductsApi;




