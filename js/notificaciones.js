import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, Timestamp } from "firebase/firestore";
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firestoreConfig';




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
        console.log('Permiso otorgado OK');
      } else {
        console.log("No accede al permiso")
      }
    })
}

requestPermission();




function obtenerToken(){
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
}




  function llamarProgramarNotificacion (fechaSeleccionada, titulo, detalle, check08, check14, check21, nombreDeUsuarioDB, mailDeUsuarioDB, fecha, idDeLaCardEnFirestore) {
    let tokenDelUsuario = elToken;
    programarNotificacion(fechaSeleccionada, titulo, detalle, check08, check14, check21, tokenDelUsuario, nombreDeUsuarioDB, mailDeUsuarioDB, fecha, idDeLaCardEnFirestore)
  }






function programarNotificacion (fechaSeleccionada, titulo, detalle, check08, check14, check21, token, nombreUsuario, mail, fechaDeCarga, idDeLaCardEnFirestore) {
    const firestore = getFirestore(app);

    if (check08) {
      let docRef1 = addDoc(collection(db, 'notificaciones08hs'), {
        token: token,
        titulo: titulo,
        detalle:detalle,
        fecha: fechaSeleccionada,
        procesado: false,
        nombreUsuario: nombreUsuario,
        mail: mail,
        fechaDeCarga: fechaDeCarga,
        idDeLaCardEnFirestore: idDeLaCardEnFirestore
    });
    }


    if (check14) {
      let docRef2 = addDoc(collection(db, 'notificaciones14hs'), {
        token: token,
        titulo: titulo,
        detalle:detalle,
        fecha: fechaSeleccionada,
        procesado: false,
        nombreUsuario: nombreUsuario,
        mail: mail,
        fechaDeCarga: fechaDeCarga,
        idDeLaCardEnFirestore: idDeLaCardEnFirestore
      });
    }

    if (check21) {
      let docRef3 = addDoc(collection(db, 'notificaciones21hs'), {
        token: token,
        titulo: titulo,
        detalle:detalle,
        fecha: fechaSeleccionada,
        procesado: false,
        nombreUsuario: nombreUsuario,
        mail: mail,
        fechaDeCarga: fechaDeCarga,
        idDeLaCardEnFirestore: idDeLaCardEnFirestore
    });
    }
}

export { llamarProgramarNotificacion , obtenerToken }