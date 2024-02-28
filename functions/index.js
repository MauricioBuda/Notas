/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

            // const {onRequest} = require("firebase-functions/v2/https");
            // const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.enviarNotificacion = functions.firestore.document('notificaciones/{notificacionId}').onCreate((snapshot, context) => {
    const data = snapshot.data();
    const token = data.token;
    const mensaje = {
        notification: {
            title: 'Recordatorio de tarea',
            body: data.mensaje
        }
    };
    return admin.messaging().sendToDevice(token, mensaje);
});
