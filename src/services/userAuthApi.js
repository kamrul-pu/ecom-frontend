import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/' }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => {
        return {
          url: 'register/',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json'
          }
        }
      }
    }),
    loginUser: builder.mutation({
      query: (user) => {
        return {
          url: 'token',
          method: 'POST',
          body: user,
          headers: {
            'Content-type': 'application/json'
          }
        }
      }
    }),
    getLoggedUserProfile: builder.query({
      query: (access_token) => {
        return {
          url: 'me',
          method: 'GET',
          headers: {
            'authorization': `Bearer ${access_token}`
          }
        }
      }
    }),
  }),
})

export const { useRegisterUserMutation, useLoginUserMutation, useGetLoggedUserProfileQuery } = userAuthApi