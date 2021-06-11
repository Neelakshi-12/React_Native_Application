import * as firebase from 'firebase';
import '@firebase/auth';
import "@react-native-firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBRkAI8rV25DV_CwlGbhzvcoXrxb_9l4v0",
    authDomain: "todoapp-v1-49b1f.firebaseapp.com",
    projectId: "todoapp-v1-49b1f",
    storageBucket: "todoapp-v1-49b1f.appspot.com",
    messagingSenderId: "296295973957",
    appId: "1:296295973957:web:06d1b9899fe6e4fa9c0f2c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };