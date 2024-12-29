import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const categoryApi = createApi({
    reducerPath: "categoryApi",
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
        getCategory: builder.query({
            query: (arg) => ({
                url: "category/list",
                method: "GET",
            }),
        }),
        postCategory: builder.mutation({
            query: (credentials) => ({
                url: "category",
                method: "POST",
                body: credentials
            }),
        }),
    })
})

export const { usePostCategoryMutation, useGetCategoryQuery } = categoryApi