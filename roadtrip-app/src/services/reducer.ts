// reducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for the user
interface UserState {
  currentUser: any | null;
}

const initialState: UserState = {
  currentUser: null,
};

// Create the slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state:any , action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});

// Export the action
export const { setCurrentUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;

// Selector to access the currentUser
export const selectCurrentUser = (state: { user: UserState }) => state.user.currentUser;
