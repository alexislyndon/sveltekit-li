import { memoize } from 'lodash';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyA56S63P55430V-kc1jAn6q9KQs_2_q2V4',
	authDomain: 'alexislyndon-dev.firebaseapp.com',
	projectId: 'alexislyndon-dev',
	storageBucket: 'alexislyndon-dev.appspot.com',
	messagingSenderId: '310146701522',
	appId: '1:310146701522:web:ef52f2a192edfe1d43f50b',
	measurementId: 'G-82V4XLEM78'
};

export const initFirebase = memoize(() => {
	const app = initializeApp(firebaseConfig);
	const auth = getAuth(app);
	const db = getFirestore(app);
	const googleProvider = new GoogleAuthProvider();
	const emailProvider = new EmailAuthProvider();
	// const analytics = getAnalytics(app);
	return { app, auth, googleProvider, emailProvider, db };
});
