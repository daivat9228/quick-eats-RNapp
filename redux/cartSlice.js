import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      if (!state.cartItem[itemId]) {
        state.cartItem[itemId] = 1;
      } else {
        state.cartItem[itemId] += 1;
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItem[itemId] > 1) {
        state.cartItem[itemId] -= 1;
      } else {
        delete state.cartItem[itemId];
      }
    },
    clearCart: (state) => {
      state.cartItem = {};
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
