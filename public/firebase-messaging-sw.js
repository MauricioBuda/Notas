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
messaging.onBackgroundMessage((payload) => {
    console.log("Mensaje recibido:", payload);


    const notificationOptions = {
      body: payload.notification.body,
      icon: 'https://raw.githubusercontent.com/MauricioBuda/Notas/master/img/agenda.png',
      sound: 'https://github.com/MauricioBuda/Notas/raw/rama-fcm-2/res/raw/notifications-sound-127856.mp3'
    };



    // Muestra la notificación al usuario
    self.registration.showNotification(payload.notification.title, notificationOptions);


}); 








