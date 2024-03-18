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

const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log('recibido: ', payload);
  const notificationTitle = `¡${payload.data.nombreUsuario}, NO OLVIDES ESTA TAREA!:`;

  const notificationOptions = {
    body: payload.data.titulo,
    icon: 'https://raw.githubusercontent.com/MauricioBuda/Notas/master/img/agenda.png',
        data: {
      url: 'https://notas-seven.vercel.app/'
    }
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});







// Manejar el evento de clic en la notificación
self.addEventListener('notificationclick', (event) => {
  const url = 'https://notas-seven.vercel.app/'; 
  event.notification.close(); // Cerrar la notificación
  event.waitUntil(clients.openWindow(url)); 
});






