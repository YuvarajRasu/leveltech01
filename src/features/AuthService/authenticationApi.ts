import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from "js-cookie";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;


export const authenticationApi = createApi({
    reducerPath: "authenticationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
        prepareHeaders: (headers, { endpoint }) => {
            const token = Cookies.get("token");
            if (token && endpoint !== 'login' && endpoint !== 'register') {
                headers.set('Authorization', `${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
                headers: {},
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials,
                headers: {},
            })
        }),
        logout: builder.mutation({
            query: (arg) => ({
                url:"auth/logout",
                method:"POST",
            })
        }),
        forgetPassword: builder.mutation({
            query: (credentials) => ({
                url:"auth/forgot-password",
                method:"POST",
                body:credentials
            })
        }),
        changePassword: builder.mutation({
            query: (credentials) => ({
                url:"auth/change-password",
                method:"PUT",
                body:credentials
            })
        }),
        resetPassword: builder.mutation({
            query: (credentials) => ({
                url:"auth/reset-password",
                method:"POST",
                body:credentials
            })
        }),
        loginWithOTP: builder.mutation({
            query: (credentials) => ({
                url:"auth/generate/otp",
                method:"POST",
                body:credentials
            })
        }),
        
    })
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation,useForgetPasswordMutation, useChangePasswordMutation, useResetPasswordMutation,useLoginWithOTPMutation } = authenticationApi