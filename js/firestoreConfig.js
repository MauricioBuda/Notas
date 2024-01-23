import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';


const firebaseConfig = {
  apiKey: "AIzaSyABZOA8qx3lXr7Z2POXoPaT-pToiXvVEfc",
  authDomain: "notas-307ba.firebaseapp.com",
  projectId: "notas-307ba",
  storageBucket: "notas-307ba.appspot.com",
  messagingSenderId: "558524290384",
  appId: "1:558524290384:web:7cba0a20d83c3a4cdf8855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();




async function registrarUsuario(nombre, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Bienvenido ", nombre)
    console.log('Usuario registrado:', user);
    await updateProfile(user, { displayName: nombre });
    return "ok";

  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      cartelToastify("Mail existente. Elegir otro, o ir a 'reestablecer contraseña")

    }
    console.log("El motivo por el cual no se pudo es", error)
    // Maneja el error según sea necesario
  }

}

async function iniciarSesion(email, password) {
  try {
    const datos = auth.currentUser;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;

  } catch (error) {
      console.log(error.message)
      Swal.fire({
      position: "center",
      icon: "error",
      title: "Credenciales incorrectas o inexistentes",
      showConfirmButton: false,
      timer: 1200,
      customClass: {
        popup: 'cartel-bienvenida-popup',
        div: 'cartel-bienvenida-container',
      },
    });
      return null;
  }

}

async function recuperarClave(mail){
  try {
    const recuperar = await sendPasswordResetEmail(auth,mail)
    cartelToastify("Revise su casilla")
  } catch (error) {
    console.log("error",error.message)
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

async function cerrarSesion(){
    signOut(auth).then(() => {
      return "ok";
      // Sign-out successful.
    }).catch((error) => {
      console.log("error", error)
    });
}






export { auth, registrarUsuario, iniciarSesion, recuperarClave, cerrarSesion };

export { db };

