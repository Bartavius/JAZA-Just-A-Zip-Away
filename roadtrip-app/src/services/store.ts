// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer';  // Import the user reducer (you already defined this)

// Create and configure the store
const store = configureStore({
  reducer: {
    user: userReducer, // Attach the user reducer to the 'user' slice of the state
  },
});

// Export the store so it can be used in the Provider
export default store;
