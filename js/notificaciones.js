import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyABZOA8qx3lXr7Z2POXoPaT-pToiXvVEfc",
    authDomain: "notas-307ba.firebaseapp.com",
    projectId: "notas-307ba",
    storageBucket: "notas-307ba.appspot.com",
    messagingSenderId: "558524290384",
    appId: "1:558524290384:web:7cba0a20d83c3a4cdf8855"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);


function requestPermission() {
    console.log("Esperando confirmación.....");
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Permiso OK');
      } else {
        console.log("no accede al permiso")
      }
    })
}

requestPermission();




getToken(messaging, { vapidKey: 'BAJuCwJuKCPCnjCOK7yiaPJyU8rUKZHprLxnwiiOJ7uZkzqHd6RUB_uzuNzQv3glsisJi5mN8T8i1FsNQ14EOgY' })
.then((currentToken) => {
    if (currentToken) {
      console.log ("TOKEN OK →     ", currentToken)
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });