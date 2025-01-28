
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { setUser } from '../redux/Slices/userSlice';

export const fetchUser = (dispatch, userId) => {
  const db = getFirestore();

  const userDocRef = doc(db, 'users', userId);

  // Listen for real-time updates
  onSnapshot(userDocRef, (snapshot) => {
    if (snapshot.exists()) {
      dispatch(setUser(snapshot.data())); // Update Redux store in real-time
    } else {
      console.error('No user found');
    }
  }, (error) => {
    console.error('Error fetching user data:', error);
  });
};

