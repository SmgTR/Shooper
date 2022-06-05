import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: '', role: '', email: '', id: '' },
  isLogged: undefined
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state, { payload }) {
      state.user = payload;
    },

    setUser(state, { payload }) {
      state.user = payload;
    },

    setLoggedIn(state, { payload }) {
      state.isLogged = payload;
    }
  }
});

export const { logIn, setUser, setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
