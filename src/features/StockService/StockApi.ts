import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const stockApi = createApi({
  reducerPath: "stockApi",
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
    getStockList: builder.query({
      query: ({pageNo, perPageValue, searchInput}) => ({
        url: `stocks?pageNo=${pageNo}&count=${perPageValue}&search=${searchInput}`,
        method: "GET",
      }),
    }),
    // postSale: builder.mutation({
    //   query: (credentials) => ({
    //     url: `sale`,
    //     method: "POST",
    //     body: credentials
    //   }),
    // }),
  }),
});

export const { useGetStockListQuery } = stockApi