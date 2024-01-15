import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';



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

async function registrarUsuario(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuario registrado:', user);
    // Puedes almacenar información adicional sobre el usuario en tu base de datos si es necesario
  } catch (error) {
    if (error.message === "Firebase: Error (auth/email-already-in-use).") {
      alert("Usuario existente")
    } else {
      
    }
    console.log(error)
    console.error('Error al registrar usuario:', error.message);
    // Maneja el error según sea necesario
  }
}

async function iniciarSesion(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('Usuario autenticado:', user);
    // Realiza acciones adicionales después del inicio de sesión si es necesario
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    alert("Usuario inválido o inexistente");
    location.reload();
    // Maneja el error según sea necesario
  }
}




export { registrarUsuario, iniciarSesion };

export { db };

