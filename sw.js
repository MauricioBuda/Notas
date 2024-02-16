self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Notification received', event);
  
    const options = {
      body: '¡No olvides tu tarea!',
      icon: '/path/to/icon.png', // Cambia esto por la ruta a tu icono de notificación
      // Puedes agregar más opciones como 'badge', 'image', etc., según tus necesidades
    };
  
    event.waitUntil(
      self.registration.showNotification('Recordatorio', options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');
  
    event.notification.close();
  
    // Aquí puedes agregar la lógica para redirigir al usuario a una página específica cuando hace clic en la notificación
  });
  