import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CartState } from '../../types';
import * as cartAPI from '../../api/cart.api';

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { rejectWithValue }) => {
  try { const res = await cartAPI.getCart(); return res.data; }
  catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch cart'); }
});

export const addItemToCart = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity }: { productId: string; quantity: number }, { rejectWithValue }) => {
    try { const res = await cartAPI.addToCart(productId, quantity); return res.data; }
    catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to add to cart'); }
  }
);

export const removeItemFromCart = createAsyncThunk(
  'cart/remove',
  async (productId: string, { rejectWithValue }) => {
    try { const res = await cartAPI.removeFromCart(productId); return res.data; }
    catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to remove from cart'); }
  }
);

export const clearCartItems = createAsyncThunk('cart/clear', async (_, { rejectWithValue }) => {
  try { const res = await cartAPI.clearCart(); return res.data; }
  catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to clear cart'); }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCart(state) { state.cart = null; state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.loading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => { state.loading = false; state.cart = action.payload; })
      .addCase(fetchCart.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(addItemToCart.fulfilled, (state, action) => { state.cart = action.payload; })
      .addCase(removeItemFromCart.fulfilled, (state, action) => { state.cart = action.payload; })
      .addCase(clearCartItems.fulfilled, (state, action) => { state.cart = action.payload; });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
