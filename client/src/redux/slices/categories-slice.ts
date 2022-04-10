import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  category: {
    _id: '',
    parent: null,
    name: '',
    category: ''
  }
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getAllCategories(state, { payload }) {
      state.categories = payload;
    },
    getCategoryById(state, { payload }) {
      state.category = payload;
    }
  }
});

export const { getAllCategories, getCategoryById } = categoriesSlice.actions;

export default categoriesSlice.reducer;
