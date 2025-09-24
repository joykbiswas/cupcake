import { createSlice, } from '@reduxjs/toolkit';


import type { Cake } from '../../types/cake';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Cake[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Cake>) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        // If item exists, you could update quantity here if needed
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const { addToCart, removeFromCart, clearCart, setLoading, setError } = cartSlice.actions;

export default cartSlice.reducer;