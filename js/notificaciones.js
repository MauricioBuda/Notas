import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, Timestamp } from "firebase/firestore";
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, registrarUsuario, iniciarSesion, recuperarClave, cerrarSesion, auth, eliminarCuenta } from './firestoreConfig';




let elToken


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





getToken(messaging, { vapidKey: 'BDpNk8BoC9BMf5ehzf3gleGjL0QBel69UeLdAbDk4FsCzcOCde6XrxOX4sfm6wxL0QvtkP2PXmrag_PXb9ctsmU' })
.then((currentToken) => {
    if (currentToken) {
        elToken = currentToken;
      console.log ("TOKEN OK →     ", currentToken)
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });



  function llamarProgramarNotificacion (tiempo, titulo, detalle) {
    let tokenDelUsuario = elToken;
    ProgramarNotificacion(tokenDelUsuario, tiempo, titulo, detalle)
  }






function ProgramarNotificacion (token, tiempo, titulo, detalle) {
    const firestore = getFirestore(app);

    // Obtener una referencia a la colección "notificaciones"

    let docRef = addDoc(collection(db, 'notificaciones'), {
        token: token,
        mensaje: titulo,
        tiempoProgramado: Timestamp.fromMillis(Date.now() + tiempo)
    });



    // const notificacionesRef = firestore.collection('notificaciones');
    // Crear un nuevo documento para programar una notificación en 48 horas
    // const nuevaNotificacion = {
    //   token: "TOKEN_DEL_USUARIO",
    //   mensaje: "Este es tu recordatorio de tarea",
    //   tiempoProgramado: Timestamp.fromMillis(Date.now() + (48 * 60 * 60 * 1000)) // Agregar 48 horas en milisegundos
    // };



    
    // // Añadir el documento a la colección "notificaciones"
    // notificacionesRef.add(nuevaNotificacion)
    //   .then(() => {
    //     console.log("Notificación programada correctamente.");
    //   })
    //   .catch((error) => {
    //     console.error("Error al programar la notificación:", error);
    //   });
    
}

export { llamarProgramarNotificacion }