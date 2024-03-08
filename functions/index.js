const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.verificarNuevasNotificaciones08 = functions.pubsub.schedule('every day 08:00')
  .timeZone('America/Argentina/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones08hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización

      snapshot.forEach((doc) => {
        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = new Date().toLocaleDateString;
        const mensaje = {
          data: {
            titulo: notificacion.titulo,
          },
          token: notificacion.token,
        };
        if (fechaHoy === fechaParaNotificar) {
                  // Enviar notificación
        const sendPromise = admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = sendPromise.then(() => {
          return doc.ref.update({ procesado: true });
        });
        }


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




  exports.verificarNuevasNotificaciones14 = functions.pubsub.schedule('every day 14:00')
  .timeZone('America/Argentina/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones14hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización

      snapshot.forEach((doc) => {
        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = new Date().toLocaleDateString;
        const mensaje = {
          data: {
            titulo: notificacion.titulo,
          },
          token: notificacion.token,
        };
        if (fechaHoy === fechaParaNotificar) {
                  // Enviar notificación
        const sendPromise = admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = sendPromise.then(() => {
          return doc.ref.update({ procesado: true });
        });
        }


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




  exports.verificarNuevasNotificaciones21 = functions.pubsub.schedule('every day 21:00')
  .timeZone('America/Argentina/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones21hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización

      snapshot.forEach((doc) => {
        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = new Date().toLocaleDateString;
        const mensaje = {
          data: {
            titulo: notificacion.titulo,
          },
          token: notificacion.token,
        };
        if (fechaHoy === fechaParaNotificar) {
                  // Enviar notificación
        const sendPromise = admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = sendPromise.then(() => {
          return doc.ref.update({ procesado: true });
        });
        }


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
