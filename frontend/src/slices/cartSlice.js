import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      //checking if the item exist in the cart already
      const existItem = state.cartItems.find((x) => x._id === item._id);
      //update quantity
      if (existItem) {
        state.cartItems = state.cartItems.map((y) =>
          y._id === existItem._id ? item : y
        );
      } else {
        //add new item
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
