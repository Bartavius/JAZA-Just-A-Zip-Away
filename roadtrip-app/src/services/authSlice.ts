import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      console.log("Setting tokens in Redux:", action.payload); // Debugging
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },
    clearTokens: (state) => {
      console.log("Clearing tokens from Redux"); // Debugging
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});


export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
