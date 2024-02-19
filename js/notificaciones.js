

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


  function programarNotificacion(titulo, detalle, tiempoEnMiliSegundos) {
    const tiempoEspera = tiempoEnMiliSegundos;
  
    setTimeout(function() {
      const options = {
        body: detalle,
        icon: '../img/agenda.png',
      };
      new Notification(titulo, options);
    }, tiempoEspera);
  }
  
  export {programarNotificacion};
  