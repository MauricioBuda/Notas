// import { prueba, horario } from "./app"; 


Notification.requestPermission().then(function(permission) {
    if (permission === 'granted') {
      console.log('Permission for Notifications granted.');
      // Ahora puedes enviar notificaciones
    } else {
      console.log('Permission for Notifications denied.');
    }
  });
  




if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registro del Service Worker exitoso
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // Error al registrar el Service Worker
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }


  function programarNotificacion() {
    const tiempoEspera = 3000; // 2 horas en milisegundos
  
    setTimeout(function() {
      const options = {
        body: "prueba",
        icon: '/path/to/icon.png', // Cambia esto por la ruta a tu icono de notificación
        // Puedes agregar más opciones como 'badge', 'image', etc., según tus necesidades
      };
      new Notification('Recordatorio', options);
    }, tiempoEspera);
  }
  
  programarNotificacion();
  