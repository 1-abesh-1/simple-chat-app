import { doc, setDoc, updateDoc,getDoc, arrayUnion } from "firebase/firestore";
import {db} from "../firebase/firebase"; // Adjust the path to your Firebase configuration file
import { useSelector } from "react-redux";

/**
 * Creates a new room document in Firestore and adds it to the creator's user document.
 * @param {string} roomId - The unique ID for the room.
 * @param {string} creatorId - The user ID of the room creator.
 * @param {Object} roomData - Room details including name, description, and members.
 */
export const createRoom = async (roomId, creatorId, roomData) => {
    try {
      // Prepare room document data
      const roomDocument = {
        roomName: roomData.name,
        roomDetails: roomData.details,
        admin:roomData.user_name,
        roomMembers: [
          {
            'member':roomData.user_name,
            'id':creatorId
          }
        ], // Array of user IDs
        roomMessages: [], // Initialize with an empty array for messages
      };
 
      // Add the room document to the 'rooms' collection
      await setDoc(doc(db, "rooms", roomId), roomDocument);
  
      // Add the room ID to the creator's document in the 'users' collection
      await updateDoc(doc(db, "users", creatorId), {
        rooms: arrayUnion({ roomId: roomId, roomName: roomData.name }), // Append the new room ID to the creator's rooms array
      });
  
      alert(`Room ${roomId} created successfully and added to creator's rooms.`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };




  /**
 * Sends a message to a room by adding it to the roomMessages array.
 * @param {string} roomId - The ID of the room where the message will be sent.
 * @param {Object} messageData - The message details including userName and message text.
 */
export const sendMessage = async (roomId,user, msg) => {
  try {
    // Create the message object
    const messageObject = {
      userName: user,
      message: msg,
      timestamp: new Date().toISOString(), // Add a timestamp
    };

    // Update the room's roomMessages array with the new message object
    await updateDoc(doc(db, "rooms", roomId), {
      roomMessages: arrayUnion(messageObject),
    });

    console.log(`Message sent to room ${roomId} successfully.`);
  } catch (error) {
    console.error("Error sending message:", error);
  }
};




  
/**
 * Joins a user to a room by updating the roomMembers in the room document
 * and adding the room to the user's document.
 * @param {string} roomId - The ID of the room the user wants to join.
 * @param {string} userId - The ID of the user joining the room.
 */
export const joinRoom = async (roomId, userId, userName) => {
  try {
    // Check if the room exists
    const roomDocRef = doc(db, "rooms", roomId);
    const roomDoc = await getDoc(roomDocRef);

    if (!roomDoc.exists()) {
      console.error(`Room with ID ${roomId} does not exist.`);
      return;
    }

    const roomData = roomDoc.data();

    // Check if the user is already in the room
    const isUserInRoom = roomData.roomMembers.some(
      (member) => member.id === userId
    );

    if (isUserInRoom) {
      alert(`You are already in the room: ${roomData.roomName}`);
      return;
    }

    // Add the user to the roomMembers array in the room document
    await updateDoc(roomDocRef, {
      roomMembers: arrayUnion({ member: userName, id: userId }),
    });

    console.log(`User ${userId} joined room ${roomId} successfully.`);

    // Add the room ID and name to the user's rooms array in the users collection
    await updateDoc(doc(db, "users", userId), {
      rooms: arrayUnion({ roomId, roomName: roomData.roomName }),
    });

    alert(`You successfully joined the room: ${roomData.roomName}`);
  } catch (error) {
    console.error("Error joining room:", error);
  }
};