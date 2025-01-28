import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null, // User data object
  },
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload; // Set the fetched user data
    },
    clearUser: (state) => {
      state.userData = []; // Clear user data
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
