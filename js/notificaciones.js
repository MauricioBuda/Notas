

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);


// function requestPermission() {
//     console.log("Esperando confirmación.....");
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Permiso OK');
//       } else {
//         console.log("no accede al permiso")
//       }
//     })
// }

// requestPermission();




// getToken(messaging, { vapidKey: 'BDpNk8BoC9BMf5ehzf3gleGjL0QBel69UeLdAbDk4FsCzcOCde6XrxOX4sfm6wxL0QvtkP2PXmrag_PXb9ctsmU' })
// .then((currentToken) => {
//     if (currentToken) {
//       console.log ("TOKEN OK →     ", currentToken)
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//   });

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


// Importa el SDK de Firebase
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Crea una función que se ejecute a una hora específica
exports.sendNotification = functions.pubsub.schedule("every 24 hours").onRun(async (context) => {
    // Obtiene el token del usuario desde Firestore
    // (debes adaptar esto a tu estructura de datos)
    const userRef = admin.firestore().collection("users").doc("USER_ID");
    const userDoc = await userRef.get();
    const token = userDoc.data().token;

    // Crea el mensaje de notificación
    const message = {
        notification: {
            title: "¡No olvides realizar X tarea!",
            body: "Recuerda completar la tarea importante.",
            icon: "/path/to/icon.png" // Ruta a tu icono de notificación
        },
        token: token // El token del usuario
    };

    // Envía el mensaje usando el SDK de FCM
    admin.messaging().send(message)
        .then((response) => {
            console.log("Notificación enviada:", response);
        })
        .catch((error) => {
            console.error("Error al enviar notificación:", error);
        });
});
