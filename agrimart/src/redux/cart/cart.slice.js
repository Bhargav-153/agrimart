import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/cart";

// 🧩 Fetch Cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const res = await axios.get(`${API_URL}/${userId}`);
  return res.data.items || [];
});

// 🧩 Add Item to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }) => {
    const res = await axios.post(`${API_URL}/add`, { userId, product });
    return res.data.items;
  }
);

// 🧩 Remove Item from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    const res = await axios.delete(`${API_URL}/${userId}/${productId}`);
    return res.data.items;
  }
);

// 🧩 Clear Cart
export const clearCart = createAsyncThunk("cart/clearCart", async (userId) => {
  const res = await axios.delete(`${API_URL}/${userId}`);
  return res.data.items || [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
