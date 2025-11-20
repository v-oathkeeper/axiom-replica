import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TokenCategory, Token } from "@/types";

interface FilterState {
  category: TokenCategory | 'all';
  sortKey: keyof Token;
  sortDirection: 'asc' | 'desc';
  searchQuery: string;
}

const initialState: FilterState = {
  category: 'all',
  sortKey: 'createdAt', // Default sort by newest
  sortDirection: 'desc',
  searchQuery: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TokenCategory | 'all'>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<keyof Token>) => {
      // If clicking the same key, toggle direction
      if (state.sortKey === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        // New key, default to descending highest first is usually better for numbers
        state.sortKey = action.payload;
        state.sortDirection = 'desc';
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setSort, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;