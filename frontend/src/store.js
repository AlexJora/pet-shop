import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";
// Configure the Redux store with reducers, middleware, and DevTools
const store = configureStore({
  // Define the initial structure of the application's state
  reducer: {
    // Use apiSlice.reducerPath as a dynamic property name and map it to apiSlice.reducer
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Create a 'cart' key in the state and associate it with the cartSliceReducer
    cart: cartSliceReducer,

    // Create an 'auth' key in the state and associate it with the authSliceReducer
    auth: authSliceReducer,
  },

  // Add middleware functions to the Redux store
  middleware: (getDefaultMiddleware) =>
    // Concatenate apiSlice.middleware to the default middleware
    getDefaultMiddleware().concat(apiSlice.middleware),

  // Enable Redux DevTools for debugging purposes
  devTools: true,
});
export default store;
