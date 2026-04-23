import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, IUser } from '../../types';
import * as authAPI from '../../api/auth.api';

const userFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : null;

const initialState: AuthState = {
  user: userFromStorage,
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, phone, password, city, pincode }: { name: string; email: string; phone: string; password?: string; city?: string; pincode?: string }, { rejectWithValue }) => {
    try {
      const res = await authAPI.registerUser(name, email, phone, password, city, pincode);
      const user = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ emailOrPhone, password }: { emailOrPhone: string; password?: string }, { rejectWithValue }) => {
    try {
      const res = await authAPI.loginUser(emailOrPhone, password);
      const user = res.data; 
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      localStorage.removeItem('user');
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => { state.loading = false; state.user = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => { state.loading = false; state.user = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
