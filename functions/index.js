const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.verificarNuevasNotificaciones08 = functions.pubsub.schedule('every day 08:00')
  .timeZone('America/Argentina/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones08hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización

      snapshot.forEach(async(doc) => {
        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString());
        let mensaje 

        if (fechaHoy === fechaParaNotificar) {
          mensaje = {
            data: {
              titulo: notificacion.titulo,
            },
            token: notificacion.token,
          };
         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        }

        promises.push(sendPromise);
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

      snapshot.forEach(async(doc) => {
        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString());
        let mensaje 

        if (fechaHoy === fechaParaNotificar) {
          mensaje = {
            data: {
              titulo: notificacion.titulo,
            },
            token: notificacion.token,
          };
         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        }

        promises.push(sendPromise);
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

      snapshot.forEach(async(doc) => {
        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString());
        let mensaje 

        if (fechaHoy === fechaParaNotificar) {
          mensaje = {
            data: {
              titulo: notificacion.titulo,
            },
            token: notificacion.token,
          };
         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        } 

        promises.push(sendPromise);
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





  



    // Función para formatear la fecha en el formato día-mes-año (por ejemplo: 3/8/2024)
function formatarFecha(fecha) {
  const partes = fecha.split('/'); // Dividir la fecha en partes
  const dia = partes[1]; // El segundo elemento es el día
  const mes = partes[0]; // El primer elemento es el mes
  const anio = partes[2]; // El tercer elemento es el año

  return `${dia}/${mes}/${anio}`; // Formato día-mes-año
}