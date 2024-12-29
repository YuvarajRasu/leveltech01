import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const vendorApi = createApi({
    reducerPath: "vendorApi",
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
        getVendorList: builder.query({
            query: ({pageNo, perPageValue, searchInput}) => ({
                url: `vendor/list?pageNo=${pageNo}&count=${perPageValue}&search=${searchInput}`,
                method: "GET",
            }),
        }),
        postVendor: builder.mutation({
            query: (credentials) => ({
                url: "vendor",
                method: "POST",
                body: credentials
            }),
        }),
        getVendorById: builder.query({
            query: (arg) => ({
                url: `vendor/${arg}`,
                method: "GET",
            }),
        }),
        updateVendor: builder.mutation({
            query: ({id, data}) => ({
                url: `vendor/${id}`,
                method: "PUT",
                body: data
            }),
        }),
        deleteVendor: builder.mutation({
            query: (credentials) => ({
                url: "vendor",
                method: "DELETE",
                body: credentials
            }),
        }),
        getVendorByCategoryId: builder.query({
            query: (arg) => ({
                url: `vendor/${arg}`,
                method: "GET",
            }),
        }),
        getAccountTypeList: builder.query({
            query: (arg) => ({
              url: `state/list`,
              method: "GET",
            }),
          }),
          getBankList: builder.query({
            query: (arg) => ({
              url: `common/banks`,
              method: "GET",
            }),
          }),
          getAccountTypes: builder.query({
            query: (arg) => ({
              url: `common/account-types`,
              method: "GET",
            }),
          }),
    })
})

export const { useGetVendorListQuery, usePostVendorMutation, useUpdateVendorMutation, useDeleteVendorMutation, useGetVendorByCategoryIdQuery, useGetAccountTypeListQuery, useGetBankListQuery, useGetAccountTypesQuery, useGetVendorByIdQuery } = vendorApi