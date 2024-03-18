const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.verificarNotificaciones = functions.pubsub
    .schedule('every day 08:00')
    .timeZone('America/Argentina/Buenos_Aires')
    .onRun(async (context) => {
        const firestore = admin.firestore();
        const notificacionesRef = firestore.collection('notificaciones08hs');

        try {
            const notificacionesSnapshot = await notificacionesRef.where('procesado', '==', false).get();

            const workerPromises = [];
            notificacionesSnapshot.forEach(doc => {
                const notificacionData = doc.data();
                const token = notificacionData.token;
                const titulo = notificacionData.titulo;

                // Enviar información al worker
                const workerPayload = {
                    token: token,
                    titulo: titulo
                    // Aquí puedes agregar más datos si es necesario
                };

                // Agregar la tarea al array de promesas
                workerPromises.push(admin.messaging().send({
                    data: workerPayload,
                    // Aquí puedes agregar opciones adicionales para el envío de notificaciones
                }));
            });

            // Marcar las notificaciones como procesadas
            const updatePromises = notificacionesSnapshot.docs.map(doc => {
                return doc.ref.update({ procesado: true });
            });

            // Ejecutar todas las promesas en paralelo
            await Promise.all([...workerPromises, ...updatePromises]);

            return null; // La función se ejecutó con éxito
        } catch (error) {
            console.error('Error al procesar las notificaciones:', error);
            throw new functions.https.HttpsError('internal', 'Error al procesar las notificaciones');
        }
    });









