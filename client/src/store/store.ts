import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});

import { AuthState, ProductState, CartState, OrderState } from '../types';

export interface RootState {
  auth: AuthState;
  product: ProductState;
  cart: CartState;
  order: OrderState;
}

export type AppDispatch = typeof store.dispatch;
