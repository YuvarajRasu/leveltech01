import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
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
    getPurchaseList: builder.query({
      query: ({pageNo, perPageValue, searchInput}) => ({
        url: `purchase/list?pageNo=${pageNo}&count=${perPageValue}&search=${searchInput}`,
        method: "GET",
      }),
    }),
    postPurchase: builder.mutation({
      query: (credentials) => ({
        url: `purchase`,
        method: "POST",
        body: credentials
      }),
    }),
    getPurchaseById: builder.mutation({
      query: (credentials) => ({
        url: `purchase/${credentials}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPurchaseListQuery, usePostPurchaseMutation, useGetPurchaseByIdMutation} = purchaseApi