import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyABZOA8qx3lXr7Z2POXoPaT-pToiXvVEfc",
  authDomain: "notas-307ba.firebaseapp.com",
  projectId: "notas-307ba",
  storageBucket: "notas-307ba.appspot.com",
  messagingSenderId: "558524290384",
  appId: "1:558524290384:web:7cba0a20d83c3a4cdf8855",
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BDpNk8BoC9BMf5ehzf3gleGjL0QBel69UeLdAbDk4FsCzcOCde6XrxOX4sfm6wxL0QvtkP2PXmrag_PXb9ctsmU",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();

// // Definir la variable que deseas pasar al Service Worker
// const miVariable = "Hola desde notificaciones.js";

// // Registrar el Service Worker
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker
//     .register("/firebase-messaging-sw.js")
//     .then((registration) => {
//       console.log("Service Worker registrado:", registration);
//       // Pasar la variable al Service Worker
//       registration.active.postMessage({ variable: miVariable });
//     })
//     .catch((error) => {
//       console.error("Error al registrar Service Worker:", error);
//     });
// } else {
//   console.log("Service Worker no soportado en este navegador.");
// }


if ("serviceWorker" in navigator && "navigator" in window) {
    programarNotificacion("titulo", "detalle", 3000);
  } else {
    console.log("Service Worker no soportado en este navegador.");
  }


function programarNotificacion(titulo, detalle, tiempoEnMiliSegundos) {
  let tiempoParaPasar = tiempoEnMiliSegundos;
  console.log("se ejecuta programar")

  setTimeout(function() {
    console.log("entra al settime")
    // Definir la variable que deseas pasar al Service Worker
    let tituloParaPasar = titulo;
    let detalleParaPasar = detalle;

    // Registrar el Service Worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
      console.log("en el if dentro del set")
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          registration.active.postMessage({
            titulo: tituloParaPasar,
            detalle: detalleParaPasar,
          });
        })
        .catch((error) => {
          console.error("Error al registrar Service Worker:", error);
        });
    } else {
      console.log("Service Worker no soportado en este navegador.");
    }
  }, tiempoParaPasar);
}



export { programarNotificacion };
