import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { setRoom } from '../redux/Slices/roomSlice';

export const fetchRoom = async (dispatch, roomId) => {
  const db = getFirestore();

      dispatch(setRoom(roomId)); // Set the room data in Redux
    
};
