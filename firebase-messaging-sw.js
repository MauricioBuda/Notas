
console.log("estoy en el worker")

// Escuchar el mensaje del cliente (notificaciones.js)
self.addEventListener('message', (event) => {
  const variableRecibidaNombre = event.data.nombre;
  const variableRecibidaDetalle = event.data.detalle;

  if (variableRecibida !== undefined) {
    console.log('nombre:  ', variableRecibidaNombre);
    console.log('nombre:  ', variableRecibidaDetalle);

    // Aquí puedes realizar las operaciones necesarias con la variable recibida
  } 
});


self.addEventListener('push', (event) => {
  console.log("recibida")
  const options = {
    body: "pruebaaaa", // Usar el cuerpo del mensaje como contenido de la notificación
    icon: 'ruta/a/imagen.png', // Especificar la ruta de la imagen para la notificación
    // Aquí puedes agregar más opciones según necesites
  };

  event.waitUntil(
    self.registration.showNotification("tituloooo", options) // Mostrar la notificación
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Cerrar la notificación al hacer clic en ella

  // Aquí puedes agregar la lógica para manejar el clic en la notificación, por ejemplo, abrir una ventana
  // event.waitUntil(
  //   clients.openWindow('URL')
  // );
});
