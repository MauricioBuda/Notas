const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.verificarNuevasNotificaciones08 = functions.pubsub.schedule('every day 08:00')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones08hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización
      


      snapshot.forEach(async(doc) => {



        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));
        let mensaje 
        console.log("ENTRA AL FOREACH 08hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle )

      console.log("FECHA DE HOY: ", fechaHoy);
      console.log("FECHA DE NOTIFICACIÓN: ", fechaParaNotificar);
      console.log("NewDate: ", new Date());
      console.log("NewDate.toLocalDateString: ", new Date().toLocaleDateString());
      console.log("NewDate.toLocaleString2: ", new Date().toLocaleString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));

        if (fechaHoy === fechaParaNotificar) {
          console.log("ENTRA AL IF 08hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
          mensaje = {
            data: {
              titulo: notificacion.titulo,
              detalle: notificacion.detalle ,
              nombreUsuario: notificacion.nombreUsuario,
            },
            token: notificacion.token,
          };

         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        // Almaceno promesas
        promises.push(sendPromise);
        promises.push(updatePromise);

        } else {
          console.log("ENTRA AL ELSE 08hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
        }

      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);
      console.log("ULTIMA LINEA 08hs")

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones 08hs:', error);
      return null;
    }
  });






  exports.verificarNuevasNotificaciones0801 = functions.pubsub.schedule('every day 08:01')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones08hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización
      


      snapshot.forEach(async(doc) => {



        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));
        let mensaje 
        console.log("ENTRA AL FOREACH 08:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle )

      console.log("FECHA DE HOY: ", fechaHoy);
      console.log("FECHA DE NOTIFICACIÓN: ", fechaParaNotificar);
      console.log("NewDate: ", new Date());
      console.log("NewDate.toLocalDateString: ", new Date().toLocaleDateString());
      console.log("NewDate.toLocaleString2: ", new Date().toLocaleString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));


        if (fechaHoy === fechaParaNotificar) {
          console.log("ENTRA AL IF 08:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
          mensaje = {
            data: {
              titulo: notificacion.titulo,
              detalle: notificacion.detalle ,
              nombreUsuario: notificacion.nombreUsuario,
            },
            token: notificacion.token,
          };

         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        // Almaceno promesas
        promises.push(sendPromise);
        promises.push(updatePromise);

        } else {
          console.log("ENTRA AL ELSE 08:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
        }

      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);
      console.log("ULTIMA LINEA 08:01s")

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones 08hs:01:', error);
      return null;
    }
  });






  exports.verificarNuevasNotificaciones14 = functions.pubsub.schedule('every day 14:00')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones14hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización
      


      snapshot.forEach(async(doc) => {



        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));
        let mensaje 
        console.log("ENTRA AL FOREACH 14hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle )

      console.log("FECHA DE HOY: ", fechaHoy);
      console.log("FECHA DE NOTIFICACIÓN: ", fechaParaNotificar);
      console.log("NewDate: ", new Date());
      console.log("NewDate.toLocalDateString: ", new Date().toLocaleDateString());
      console.log("NewDate.toLocaleString2: ", new Date().toLocaleString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));


        if (fechaHoy === fechaParaNotificar) {
          console.log("ENTRA AL IF 14hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
          mensaje = {
            data: {
              titulo: notificacion.titulo,
              detalle: notificacion.detalle ,
              nombreUsuario: notificacion.nombreUsuario,
            },
            token: notificacion.token,
          };

         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        // Almaceno promesas
        promises.push(sendPromise);
        promises.push(updatePromise);

        } else {
          console.log("ENTRA AL ELSE 14hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
        }

      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);
      console.log("ULTIMA LINEA 14hs")

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones 14hs:', error);
      return null;
    }
  });






  exports.verificarNuevasNotificaciones1401 = functions.pubsub.schedule('every day 14:01')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones14hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización
      


      snapshot.forEach(async(doc) => {



        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));
        let mensaje 
        console.log("ENTRA AL FOREACH 14:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle )

      console.log("FECHA DE HOY: ", fechaHoy);
      console.log("FECHA DE NOTIFICACIÓN: ", fechaParaNotificar);
      console.log("NewDate: ", new Date());
      console.log("NewDate.toLocalDateString: ", new Date().toLocaleDateString());
      console.log("NewDate.toLocaleString2: ", new Date().toLocaleString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));


        if (fechaHoy === fechaParaNotificar) {
          console.log("ENTRA AL IF 14:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
          mensaje = {
            data: {
              titulo: notificacion.titulo,
              detalle: notificacion.detalle ,
              nombreUsuario: notificacion.nombreUsuario,
            },
            token: notificacion.token,
          };

         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        // Almaceno promesas
        promises.push(sendPromise);
        promises.push(updatePromise);

        } else {
          console.log("ENTRA AL ELSE 14:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
        }

      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);
      console.log("ULTIMA LINEA 14:01hs")

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones 14:01hs:', error);
      return null;
    }
  });






  exports.verificarNuevasNotificaciones21 = functions.pubsub.schedule('every day 21:00')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones21hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización



      snapshot.forEach(async(doc) => {



        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));
        let mensaje 
        console.log("ENTRA AL FOREACH 21hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle )

      console.log("FECHA DE HOY: ", fechaHoy);
      console.log("FECHA DE NOTIFICACIÓN: ", fechaParaNotificar);
      console.log("NewDate: ", new Date());
      console.log("NewDate.toLocalDateString: ", new Date().toLocaleDateString());
      console.log("NewDate.toLocaleString2: ", new Date().toLocaleString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));


        if (fechaHoy === fechaParaNotificar) {
          console.log("ENTRA AL IF 21hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
          mensaje = {
            data: {
              titulo: notificacion.titulo,
              detalle: notificacion.detalle ,
              nombreUsuario: notificacion.nombreUsuario,
            },
            token: notificacion.token,
          };

         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        // Almaceno promesas
        promises.push(sendPromise);
        promises.push(updatePromise);

        } else {
          console.log("ENTRA AL ELSE 21hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
        }

      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);
      console.log("ULTIMA LINEA 21hs")

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones 21hs:', error);
      return null;
    }
  });






  exports.verificarNuevasNotificaciones2101 = functions.pubsub.schedule('every day 21:01')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    try {
      const snapshot = await admin.firestore().collection('notificaciones21hs').where('procesado', '==', false).get();
      const promises = []; // Arreglo para almacenar las promesas de actualización
      


      snapshot.forEach(async(doc) => {



        const notificacion = doc.data();
        const fechaParaNotificar = notificacion.fecha;
        const fechaHoy = formatarFecha(new Date().toLocaleDateString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));
        let mensaje 
        console.log("ENTRA AL FOREACH 21:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle )

      console.log("FECHA DE HOY: ", fechaHoy);
      console.log("FECHA DE NOTIFICACIÓN: ", fechaParaNotificar);
      console.log("NewDate: ", new Date());
      console.log("NewDate.toLocalDateString: ", new Date().toLocaleDateString());
      console.log("NewDate.toLocaleString2: ", new Date().toLocaleString('default', { timeZone: 'America/Argentina/Buenos_Aires' }));


        if (fechaHoy === fechaParaNotificar) {
          console.log("ENTRA AL IF 21:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
          mensaje = {
            data: {
              titulo: notificacion.titulo,
              detalle: notificacion.detalle ,
              nombreUsuario: notificacion.nombreUsuario,
            },
            token: notificacion.token,
          };

         // Enviar notificación
        const sendPromise = await admin.messaging().send(mensaje);
        
        // Marcar el documento como procesado después de enviar la notificación
        const updatePromise = await doc.ref.update({ procesado: true });

        // Almaceno promesas
        promises.push(sendPromise);
        promises.push(updatePromise);

        } else {
          console.log("ENTRA AL ELSE 21:01hs", notificacion.nombreUsuario, notificacion.titulo, notificacion.detalle  )
        }

      });

      // Esperar a que todas las promesas de actualización se resuelvan
      await Promise.all(promises);
      console.log("ULTIMA LINEA 21:01hs")

      return null;
    } catch (error) {
      console.error('Error al verificar nuevas notificaciones 21:01hs:', error);
      return null;
    }
  });





  exports.eliminarNotificacionesYaEjecutadas = functions.pubsub.schedule('every sunday 21:30')
  .timeZone('America/Buenos_Aires')
  .onRun(async (context) => {
    console.log("Ingreso a la funcion para borrar");
    try {
      const collections = ['notificaciones08hs', 'notificaciones14hs', 'notificaciones21hs'];

      for (const collectionName of collections) {
        console.log("Ingreso al for", collectionName, collections);
        const snapshot = await admin.firestore().collection(collectionName).where('procesado', '==', true).get();
        const promises = [];

        snapshot.forEach(async (doc) => {
          console.log("Ingreso al forEach: ", doc)
          const deletePromise = doc.ref.delete();
          promises.push(deletePromise);
        });

        await Promise.all(promises);
      }
      console.log("Salgo del for");

      return null;
    } catch (error) {
      console.error('Error al eliminar notificaciones:', error);
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