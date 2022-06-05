import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: 'Dashboard'
};

const pageNavSlice = createSlice({
  name: 'page-nav',
  initialState,
  reducers: {
    setPageTitle(state, { payload }) {
      state.title = payload;
    }
  }
});

export const { setPageTitle } = pageNavSlice.actions;

export default pageNavSlice.reducer;
