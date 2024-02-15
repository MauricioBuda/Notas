import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();
// Add the public key generated from the console here.


function requestPermission() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else{
        console.log("denegado perro");
      }
    })
} 

requestPermission();



// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
getToken(messaging, { vapidKey: 'BKMLDVHGRcehfl-5P0R_NqlCWSv53tTq11izVr2nxOwxZECkuujvAaJ1o7MeaXldJnZrkU1UQ0qg0BEe5oWEZe0' })
.then((currentToken) => {
  if (currentToken) {
    console.log("Permiso OK → " + currentToken)
    // Send the token to your server and update the UI if necessary
    // ...
  } else {
    // Show permission request UI
    console.log('Nooooooop');
    // ...
  }
}).catch((err) => {
  console.log('Errroooooooooooooor →→  ', err);
  // ...
});