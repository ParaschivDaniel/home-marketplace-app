import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyC8cAxcM8VWuKzmeBTjSZzXcYdm9nOeqJ4',
	authDomain: 'house-marketplace-app-b7517.firebaseapp.com',
	projectId: 'house-marketplace-app-b7517',
	storageBucket: 'house-marketplace-app-b7517.appspot.com',
	messagingSenderId: '158784683414',
	appId: '1:158784683414:web:8018ac0db73d68a831f1b7',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
