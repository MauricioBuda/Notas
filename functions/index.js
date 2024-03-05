const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.verificarNuevasNotificaciones = functions.pubsub.schedule('every day 15:25')
  .timeZone('America/Argentina/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización

      snapshot.forEach((doc) => {
        const notificacion = doc.data();
        const mensaje = {
          notification: {
            title: notificacion.mensaje,
            body: notificacion.body,
            image: 'https://raw.githubusercontent.com/MauricioBuda/Notas/master/img/agenda.png',
          },
          token: notificacion.token,
        };

        // Enviar notificación
        const sendPromise = admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = sendPromise.then(() => {
          return doc.ref.update({ procesado: true });
        });

        promises.push(updatePromise);
      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones:', error);
      return null;
    }
  });
