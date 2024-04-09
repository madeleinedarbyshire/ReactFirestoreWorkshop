import { initializeApp } from 'firebase/app';
import { getFirestore  } from 'firebase/firestore';

// TODO 1: Update this with your firebaseConfig in the console
const firebaseConfig = {
  apiKey: 'YOUR-CREDENTIALS',
  authDomain: 'YOUR-CREDENTIALS',
  projectId: 'YOUR-CREDENTIALS',
  storageBucket: 'YOUR-CREDENTIALS',
  messagingSenderId: 'YOUR-CREDENTIALS',
  appId: 'YOUR-CREDENTIALS',
  measurementId: 'YOUR-CREDENTIALS'
};

const COLLECTION = 'Observations'

// TODO 2: Implement subscribeToPosts
export const subscribeToPosts = (callback, sortField, SortDirection) => {

  return () => null;
}

// TODO 3: Implement addPost
export const addPost = async (title, description, image) => {

}

// TODO 4: Implement updatePost
export const updatePost = async (docID, title, description, image) => {

}

// TODO 5: Implement deletePost
export const deletePost = async (docID) => {

}

// TODO 6: Implement likePost
export const likePost = async (docID) => {

}

// TODO 7: Implement dislikePost
export const dislikePost = async (docID) => {

}