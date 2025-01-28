import { createSlice } from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomData: null, // Room data object
  },
  reducers: {
    setRoom: (state, action) => {
      state.roomData = action.payload; // Set the fetched room data
    },
    clearRoom: (state) => {
      state.roomData = null; // Clear room data
    },
  },
});

export const { setRoom, clearRoom } = roomSlice.actions;
export default roomSlice.reducer;
