const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();


exports.enviarNotificacion = functions.firestore
  .document('notificaciones/{notificacionId}')
  .onCreate((snap, context) => {
    const notificacion = snap.data();
    const token = notificacion.token;
    const mensaje = {
      notification: {
        title: `prueba ${notificacion.mensaje}`,
        body: notificacion.body,
      },
      token: token,
    };

    setTimeout(() => {
        admin.messaging().send(mensaje)
        .then((response) => {
          console.log('Notificación enviada exitosamente:', response);
          return null;
        })
        .catch((error) => {
          console.log('Error al enviar la notificación:', error);
          return null;
        });
    }, notificacion.tiempoProgramado);

  });
