import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDedRPrQ64_c01iAN6Jj1CHmCeweUVPCDw',
  authDomain: 'whatsapp-firebase-c56be.firebaseapp.com',
  databaseURL: 'https://whatsapp-firebase-c56be.firebaseio.com',
  projectId: 'whatsapp-firebase-c56be',
  storageBucket: 'whatsapp-firebase-c56be.appspot.com',
  messagingSenderId: '313946524575',
  appId: '1:313946524575:web:ca7bf21e945e0b633a8baa',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
