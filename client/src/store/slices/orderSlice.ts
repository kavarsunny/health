import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderState, IShippingAddress } from '../../types';
import * as orderAPI from '../../api/order.api';

const initialState: OrderState = {
  orders: [],
  order: null,
  allOrders: [],
  loading: false,
  error: null,
};

export const placeOrder = createAsyncThunk(
  'order/place',
  async ({ shippingAddress, paymentMethod }: { shippingAddress: IShippingAddress; paymentMethod: string }, { rejectWithValue }) => {
    try { const res = await orderAPI.createOrder(shippingAddress, paymentMethod); return res.data; }
    catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to place order'); }
  }
);

export const fetchMyOrders = createAsyncThunk('order/fetchMine', async (_, { rejectWithValue }) => {
  try { const res = await orderAPI.getMyOrders(); return res.data; }
  catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders'); }
});

export const fetchAllOrders = createAsyncThunk('order/fetchAll', async (_, { rejectWithValue }) => {
  try { const res = await orderAPI.getAllOrders(); return res.data; }
  catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders'); }
});

export const changeOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try { const res = await orderAPI.updateOrderStatus(id, status); return res.data; }
    catch (err: any) { return rejectWithValue(err.response?.data?.message || 'Failed to update order'); }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderError(state) { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => { state.loading = false; state.order = action.payload; })
      .addCase(placeOrder.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchMyOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.loading = false; state.orders = action.payload; })
      .addCase(fetchMyOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(fetchAllOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.loading = false; state.allOrders = action.payload; })
      .addCase(fetchAllOrders.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        const idx = state.allOrders.findIndex(o => o._id === action.payload._id);
        if (idx > -1) state.allOrders[idx] = action.payload;
      });
  },
});

export const { clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
