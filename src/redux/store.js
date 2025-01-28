import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import roomReducer from './Slices/roomSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
  },
});

export default store;
