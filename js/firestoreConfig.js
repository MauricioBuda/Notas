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
    await updateProfile(user, { displayName: nombre });
    return "ok";

  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      Swal.fire({
        icon: "error",
        title: "Ya existe un usuario con ese email",
        text: "Intente con uno distinto",
        footer: 'O ponga "reestablecer clave"',
        timer: 2000
      });

    } else if (error.message === "Firebase: Error (auth/invalid-email)."){
      Swal.fire({
        icon: "error",
        title: "El mail ingresado es incorrecto",
        text: "Intente con uno distinto",
        timer: 2000
      });
    }
    console.log("este es el error →→  ", error.message)
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
      timer: 1500,
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

async function eliminarCuenta() {
  const user = auth.currentUser;

  try {
    // Elimina el usuario actual
    await user.delete();
    console.log("Usuario eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    // Maneja el error según sea necesario
  }
}





export { auth, registrarUsuario, iniciarSesion, recuperarClave, cerrarSesion, db , eliminarCuenta};


