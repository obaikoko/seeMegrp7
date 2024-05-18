import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery =
  process.env.NODE_ENV === 'development'
    ? fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
      })
    : fetchBaseQuery({
        baseUrl: 'https://seeme-nga3.onrender.com/',
      });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
