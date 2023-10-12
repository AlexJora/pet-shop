// !!!is createApi and not createSlice because this is a slice where we have endpoints that are dealing with asynchronous requests;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";

// Create a base query using fetchBaseQuery with a baseUrl of BASE_URL
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Define an API slice using createApi
export const apiSlice = createApi({
  // Use the baseQuery for making network requests
  baseQuery,

  // Define tag types for the API
  tagTypes: ["Product", "Order", "User"],

  // Define API endpoints (currently empty)
  endpoints: (builder) => ({}),
});
