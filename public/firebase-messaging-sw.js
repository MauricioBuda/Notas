// En tu archivo firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');


const firebaseConfig = {
  apiKey: "AIzaSyABZOA8qx3lXr7Z2POXoPaT-pToiXvVEfc",
  authDomain: "notas-307ba.firebaseapp.com",
  projectId: "notas-307ba",
  storageBucket: "notas-307ba.appspot.com",
  messagingSenderId: "558524290384",
  appId: "1:558524290384:web:7cba0a20d83c3a4cdf8855"
};

firebase.initializeApp(firebaseConfig);

// Obtiene una instancia de Firebase Messaging
const messaging = firebase.messaging();

// Escucha los mensajes entrantes
// messaging.onBackgroundMessage((payload) => {
//     console.log("Mensaje recibido:", payload);


//     const notificationOptions = {
//       body: payload.notification.body,
//       icon: 'https://raw.githubusercontent.com/MauricioBuda/Notas/master/img/agenda.png',
//       sound: 'greanpatch-166007.mp3',
//       data: {
//         url: 'https://notas-seven.vercel.app/' // Aquí incluye la URL
//       }
//     };



//     // Muestra la notificación al usuario
//     self.registration.showNotification(payload.notification.title, notificationOptions);


// }); 






// messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('RECIBIDO ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: 'EL CUERPO' + payload.notification.body,
    icon: 'https://raw.githubusercontent.com/MauricioBuda/Notas/master/img/agenda.png',
    sound: 'greanpatch-166007.mp3',
      data: {
         url: 'https://notas-seven.vercel.app/' // Aquí incluye la URL
    }
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
// });





// Manejar el evento de clic en la notificación
self.addEventListener('notificationclick', (event) => {
  const url = event.notification.data.url; // Obtener la URL del objeto de datos
  event.notification.close(); // Cerrar la notificación
  event.waitUntil(clients.openWindow('https://notas-seven.vercel.app/')); // Abrir la URL en una nueva ventana
});






