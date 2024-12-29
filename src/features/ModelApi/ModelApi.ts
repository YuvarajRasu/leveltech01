import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const modelApi = createApi({
    reducerPath: "modelApi",
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
        getModels: builder.query({
            query: (arg) => ({
                url: "model/list",
                method: "GET",
            }),
        }),
        getModelsByProductId: builder.query({
            query: (arg) => ({
                url: `model/${arg}/product`,
                method: "GET",
            }),
        }),
        postModel: builder.mutation({
            query: (credentials) => ({
                url: "model",
                method: "POST",
                body: credentials
            }),
        }),
    })
})

export const { useGetModelsQuery, usePostModelMutation, useGetModelsByProductIdQuery } = modelApi