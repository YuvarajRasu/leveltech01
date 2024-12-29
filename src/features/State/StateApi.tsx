import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const stateApi = createApi({
  reducerPath: "stateApi",
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
    getStateList: builder.query({
      query: (arg) => ({
        url: `state/list`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetStateListQuery } = stateApi