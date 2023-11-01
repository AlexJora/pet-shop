// Import the PRODUCTS_URL constant from the "../constants" file
import { PRODUCTS_URL } from "../constants";

// Import the apiSlice from the "./apiSlice" file
import { apiSlice } from "./apiSlice";

// Create a new API slice called "productsApiSlice" by injecting endpoints into the existing apiSlice
export const productsApiSlice = apiSlice.injectEndpoints({
  // builder provides methods and utilities for defining and configuring API endpoints, queries, and mutations.
  endpoints: (builder) => ({
    // =====Define an endpoint to fetch all products
    getProducts: builder.query({
      // Specify the query function to execute when this endpoint is called
      query: () => ({
        // Set the URL for this query to PRODUCTS_URL
        url: PRODUCTS_URL,
      }),
      // Configure how long unused data for this query should be kept in the cache (5 seconds in this case)
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),

    // =====Define an endpoint to fetch details of a single product by its ID
    getProductDetails: builder.query({
      // Specify the query function, which takes a productId as a parameter
      query: (productId) => ({
        // Set the URL for this query to include the productId
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      // Configure how long unused data for this query should be kept in the cache (5 seconds in this case)
      keepUnusedDataFor: 5,
      invalidatesTags: ["Products"],
    }),

    //=====Create product
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      //will stop it from being cached so that we have fresh data. Without this we will need to click to reload the page to get the new data. It's clearing cache.
      invalidatesTags: ["Product"],
    }),

    //=====Update/edit product
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Extract the generated hooks for the defined endpoints
export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productsApiSlice;
