// Imports ↓
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, registrarUsuario, iniciarSesion, recuperarClave, cerrarSesion, auth, eliminarCuenta } from './firestoreConfig';
import { updateProfile } from 'firebase/auth';
import { llamarProgramarNotificacion } from './notificaciones';
import Swal from 'sweetalert2';






// Array para ir guardando las cards ↓
let unaCard = [];







//DECLARO VARIABLES Y LES ASIGNO EVENTOS ↓

// Variables menú ↓
let botonMas = document.getElementById("botonMas_id");
let menu = document.getElementById("id_menu");
let divDeEstados = document.getElementById("divDeEstadosID");


// Variables formulario para agregar tarea ↓
let formulario = document.getElementById("section_formulario_id");
let botonAgregarTarea = document.getElementById("boton_agregarTarea_id");


// Eventos del formulario ↓
botonAgregarTarea.addEventListener("click", agregarTarea);


// Variables del formulario, de la notificación ↓
let calendario = $('#datepicker');
let aceptarNoti = document.getElementById("aceptar-noti");
let rechazarNoti = document.getElementById("rechazar-noti");
let quiereNotificacion = false;
let fechaSeleccionadaSinFormato = document.getElementById("date");
let fechaSeleccionadaParticionada = ""
let fechaSeleccionadaConFormato = ""
let check08 = document.getElementById("check-08");
let check14 = document.getElementById("check-14");
let check21 = document.getElementById("check-21");
let selecciona08 = false;
let selecciona14 = false;
let selecciona21 = false;



// Eventos del formulario, para la notificación ↓
aceptarNoti.addEventListener("click", mostrarCargaDeNotificacion);
rechazarNoti.addEventListener("click", ocultarCargaDeNotificacion);




// Variable del modal de cargando ↓
const modalCarga = document.getElementById('modalCarga');


// Variables del menú de secciones ↓
let botonMenuSecciones = document.getElementById("boton-para-secciones");
let botonSeccionesTodas = document.getElementById("boton-secciones-todas");
let botonSeccionesCompras = document.getElementById("boton-secciones-compras");
let botonSeccionesTrabajo = document.getElementById("boton-secciones-trabajo");
let botonSeccionesCasa = document.getElementById("boton-secciones-casa");
let botonSeccionesTurnos = document.getElementById("boton-secciones-turnos");
let botonSeccionesOtras = document.getElementById("boton-secciones-otras");
let seccionQueSeMuestraEnPantalla = "";
let muestraSeccionPantalla = "Todas";




// Eventos menú secciones
botonSeccionesTodas.addEventListener("click", () => {muestraSeccionPantalla="Todas", filtroDeSecciones(muestraSeccionPantalla), cardsEnPantalla(pantallaActual);});
botonSeccionesCompras.addEventListener("click", () => {muestraSeccionPantalla="Compras", filtroDeSecciones(muestraSeccionPantalla), cardsEnPantalla(pantallaActual);});
botonSeccionesTrabajo.addEventListener("click", () => {muestraSeccionPantalla="Trabajo", filtroDeSecciones(muestraSeccionPantalla), cardsEnPantalla(pantallaActual);});
botonSeccionesCasa.addEventListener("click", () => {muestraSeccionPantalla="Casa", filtroDeSecciones(muestraSeccionPantalla), cardsEnPantalla(pantallaActual);});
botonSeccionesTurnos.addEventListener("click", () => {muestraSeccionPantalla="Turnos", filtroDeSecciones(muestraSeccionPantalla), cardsEnPantalla(pantallaActual);});
botonSeccionesOtras.addEventListener("click", () => {muestraSeccionPantalla="Otras", filtroDeSecciones(muestraSeccionPantalla), cardsEnPantalla(pantallaActual);});
botonMenuSecciones.innerText = `Sección:    ${muestraSeccionPantalla.toUpperCase()}     `;




// Variables para definir que se muestra en pantalla con los botones del menú superior ↓
let mostrarTodas = document.getElementById("id_todas");
let mostrarPendientes = document.getElementById("id_pendientes");
let mostrarFinalizadas = document.getElementById("id_finalizadas");
let mostrarCanceladas = document.getElementById("id_canceladas");
let muestraPantalla = "Todas";
let pantallaActual = "Todas";


// Eventos a los botones del menú superior ↓
botonMas.addEventListener("click", mostrarFormulario);
mostrarTodas.addEventListener("click", () => {muestraPantalla="Todas", cardsEnPantalla(muestraPantalla)});
mostrarPendientes.addEventListener("click", () => {muestraPantalla="Pendientes", cardsEnPantalla(muestraPantalla)});
mostrarFinalizadas.addEventListener("click", () => {muestraPantalla="Finalizadas", cardsEnPantalla(muestraPantalla)});
mostrarCanceladas.addEventListener("click", () => {muestraPantalla="Canceladas", cardsEnPantalla(muestraPantalla)});


// Variables de las secciones de las cards ↓
let todasCards = document.getElementById("todas-cards");
let pendientesCards = document.getElementById("pendientes-cards");
let finalizadasCards = document.getElementById("finalizadas-cards");
let canceladasCards = document.getElementById("canceladas-cards");


// Variables de la ventana modal, de cards grandes ↓
let modalCard = document.getElementById("cardEnModal");
let modalFooter = document.getElementById("modal_footerID");


// Variables para pantalla de ingreso ↓
let pantallaInicioSesion = document.getElementById("formInicioSesion");
let botonIngresarCuentaExistente = document.getElementById("botonIngresarCuentaExistente");
let contraseñaIngresadaPorUsuario = document.getElementById("contraseñaInicio");
let botonOcultarMostrarClave = document.getElementById("ocultar-mostrar-clave");
let botonRegistrarme = document.getElementById("boton_registrarse");
let botonOlvideClave = document.getElementById("olvide_clave")


// Eventos para pantalla de inicio ↓
botonIngresarCuentaExistente.addEventListener("click", datosDeIngreso);
botonRegistrarme.addEventListener("click",mostrarModalRegistro);
botonOlvideClave.addEventListener("click", olvideClave);
botonOcultarMostrarClave.addEventListener("click", ocultarMostrarClave);


// Variables pantalla de registro de nueva cuenta ↓
let modalRegistrarse = document.getElementById("modalRegistro");
let botonCancelar = document.getElementById("cancelar_modal");
let botonRegistrarNuevaCuenta = document.getElementById("botonRegistrarNuevaCuenta");


// Eventos para pantalla de registro
botonRegistrarNuevaCuenta.addEventListener("click",datosDeRegistro);
botonCancelar.addEventListener("click",ocultarModalRegistro);


// Variables para guardar en la db ↓
let nombreDeUsuarioDB = "";
let mailDeUsuarioDB = "";
let nombreDeColeccion = "";


// Variables del menú desplegable ↓
let navbar_general = document.getElementById("navbar_general");
let nombreUsuarioIniciado = document.getElementById("offcanvasNavbarLabel");
let salir_navbar =  document.getElementById("navbar_salir");
let boton_cambiar_nombre = document.getElementById("button_cambiar_nombre");
let boton_eliminar_cuenta = document.getElementById("button_eliminar_cuenta");
let usuarioConSesionIniciada = null;


// Eventos del menú desplegable
boton_eliminar_cuenta.addEventListener("click", elimnarLaCuenta);
salir_navbar.addEventListener("click", salir);
boton_cambiar_nombre.addEventListener("click", cambiarNombre);




// TERMINO DE DECLARAR VARIABLES Y ASIGNAR EVENTOS ↑










// EJECUTO FUNCIONES NECESARIAS ↓


// Cuando se abre la página, compruebo si hay una sesión iniciada
corroborarSesionIniciada();

// Le asigno eventos a los botones de las cards
asignarEventosSegunDondeHagaClick();



// TERMINO CON EJECUCIÓN DE FUNCIONES NECESARIAS ↑









// EMPIEZO CON LA DECLARACIÓN DE TODAS LAS FUNCIONES (PRIMERO ESTÁN LAS RELACIONADAS CON LA DB, LUEGO LAS DE LA PÁGINNA EN SI) ↓





// Funcion con la que compruebo si hay una sesión iniciada
async function corroborarSesionIniciada (){
  mostrarCarga();

  // Me fijo si hay sesión iniciada
  auth.onAuthStateChanged(async (usuario) => {

    // Si entro al IF es que hay una sesión iniciada
    if (usuario) {
      console.log('Usuario autenticado:  ', usuario.displayName);
      // Creo esta variable como bandera para poder cambiar nombre en cambiarNombre();
      usuarioConSesionIniciada=usuario; 

      // Oculo/muestro las pantallas necesarias
      pantallaInicioSesion.classList.add("aplicar-display-none");
      menu.classList.remove("aplicar-display-none");
      navbar_general.classList.remove("aplicar-display-none")

      // Cargo en la DB nombre, mail y genero una nueva colección (o ingreso a la existente)
      let nombreDeLaColeccion = await asignarNombreAColeccion (usuario.uid);
      let nombreDeUsuario = await asignarNombreDeUsuarioDB (usuario.displayName);
      let mailDeUsuario = await asignarMailDeUsuarioDB (usuario.email);
      nombreDeUsuarioDB=nombreDeUsuario;
      mailDeUsuarioDB=mailDeUsuario;
      nombreDeColeccion = nombreDeLaColeccion;

      // Renderizo el nombre del usuario en el menú desplegable
      nombreUsuarioIniciado.innerHTML= usuario.displayName ;

      // Cuando entra a la cuenta, se muestran todas las cards existentes
      cardsEnPantalla(pantallaActual);
    } else {
      // Si no hay nadie ingresado, solo muestro pantalla de loguin
      pantallaInicioSesion.classList.remove("aplicar-display-none");
      console.log('No hay usuario autenticado');
    }
  });
  ocultarCarga();
}

function asignarNombreAColeccion(nombreColeccion){
  return nombreColeccion;
}
function asignarNombreDeUsuarioDB(nombreUsuario){
  return nombreUsuario;
}
function asignarMailDeUsuarioDB(MailUsuario){
  return MailUsuario;
}






// Función para cerrar sesión
async function salir (){
  let contraseñaIngresada = document.getElementById("contraseñaInicio");
  Swal.fire({
    title: "¿Cerrar sersión?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Cerrar",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      contraseñaIngresada.value = "";
      pantallaInicioSesion.classList.remove("aplicar-display-none")
      navbar_general.classList.add("aplicar-display-none");
      const sesionCerrada =   cerrarSesion();
      Swal.fire({
        title: "Sesión cerrada",
        timer: 1000,
        icon: "success"
      });
    }
  }); 
}






// Función para corroborar el inicio de sesión
async function datosDeIngreso(event){
  event.preventDefault();
  let mailIngresado = document.getElementById("mailInicio").value;
  let contraseñaIngresada = document.getElementById("contraseñaInicio").value;
  await  iniciarSesion(mailIngresado,contraseñaIngresada);
  auth.onAuthStateChanged(async (usuario) => {
  if (usuario && usuario.displayName) {
    pantallaInicioSesion.classList.add("aplicar-display-none");
      Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Hola " + usuario.displayName + "!",
      showConfirmButton: false,
      timer: 1500,
    });
  } 
  setTimeout(() => {
  }, 1000);
});
}





// Función para mostrar u ocultar clave con el ojo
function ocultarMostrarClave(){
  let estadoActual = contraseñaIngresadaPorUsuario.type;
  if (estadoActual === "text") {
    contraseñaIngresadaPorUsuario.type = "password";
    botonOcultarMostrarClave.innerHTML =  `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
  </svg>`
  } else {
    contraseñaIngresadaPorUsuario.type = "text";
    botonOcultarMostrarClave.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
    <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
  </svg>`
  }
}





// Función para registrar una nueva cuenta
async function datosDeRegistro(event){
  event.preventDefault();
  let nombreRegistro = document.getElementById("nombreRegistro").value;
  let mailIngresado = document.getElementById("MailRegistro").value;
  let contraseñaIngresada1 = document.getElementById("ContraseñaRegistro1").value;
  let contraseñaIngresada2 = document.getElementById("ContraseñaRegistro2").value;

  if (!nombreRegistro || !mailIngresado || !contraseñaIngresada1 || !contraseñaIngresada2) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Complete todos los campos",
      showConfirmButton: false,
      timer: 1200,
    });
    return;
  }
  if (nombreRegistro.length > 16) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "El nombre debe tener menos de 15 dígitos",
      showConfirmButton: false,
      timer: 1200,
    });
    return;
  }

  if (contraseñaIngresada1 === contraseñaIngresada2) {
    if (contraseñaIngresada1.length < 6 ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "La clave debe tener al menos 6 dígitos",
        showConfirmButton: false,
        timer: 1200,
      });
      return;
    }
    const registro = await registrarUsuario(nombreRegistro.trim(), mailIngresado, contraseñaIngresada1);
    if (registro === "ok") {
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario creado!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Las claves no coinciden",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  
}





// Función para enviar mal y reestablecer clave de la cuenta
async function olvideClave(event){
  event.preventDefault();
  const { value: mailIngresadoPorCliente } = await Swal.fire({
    title: "Mail para recibir link de reestablecimiento:",
    showCancelButton: true,
    input: "email",
    inputPlaceholder: "ejemplo@ejemplo.com",
    position: 'top',
    customClass: {
            popup: 'ventana-recupero-clave',
            input: 'input-recupero-clave',
          },
  });
  if (mailIngresadoPorCliente) {
      let mailIngresadoPorClienteSinEspacios = mailIngresadoPorCliente.trim();
      recuperarClave(mailIngresadoPorClienteSinEspacios);
      setTimeout(() => {
          Swal.fire({
            title: "Mail enviado",
            timer: 1500,
            icon: "success",
          showConfirmButton: false
          });
      }, 1000);
  }
}





// Función para eliminar definitivamente la cuenta
async function elimnarLaCuenta(){
  Swal.fire({
    title: "Borrarás la cuenta y sus tareas de manera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    footer:"NO SE PUEDEN RECUPERAR LAS TAREAS",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarCarga();
      eliminarCuenta();
      Swal.fire({
        title: "Cuenta eliminada!",
        timer: 2000,
        icon: "success",
        showConfirmButton: false,
      });
      setTimeout(() => {
        location.reload();
      }, 2200);
    }
  }); 
}






// Mostrar y ocultar el modal del registro
function ocultarModalRegistro(){
  modalRegistrarse.classList.add("aplicar-display-none")
}
function mostrarModalRegistro(){
  modalRegistrarse.classList.remove("aplicar-display-none")
}








// Función para cambiar el nombre de la cuenta
async function cambiarNombre(){
    let nombreParaEditar = document.getElementById("offcanvasNavbarLabel");
    let verSiGuardoOEditoNombre = boton_cambiar_nombre.textContent === "Cambiar nombre";
    let nuevoNombre = "";

    // Si entra al IF es porque apretó "cambiar nombre"
    if(verSiGuardoOEditoNombre){

      // Habilito edición, pongo ahí el cursor; y cambio el texto del botón a GUARDAR
      nombreParaEditar.contentEditable = true;
      nombreParaEditar.focus();
      boton_cambiar_nombre.textContent="GUARDAR"



        // Con este evento prevengo que aprieten Enter. El 13 representa al ENTER en keycode
        document.getElementById('offcanvasNavbarLabel').addEventListener('keypress', function(event) {

          switch (true) {
            case event.keyCode === 13 || nombreParaEditar.textContent.length >= 15:
              // Si entra acá es porque pusieron ENTER o llegó a 15 dígitos
              event.preventDefault();
              break;
            case event.keyCode > 47 && event.keyCode < 59:
                // Si entra acá es porque ingresaron un número
              break;
          
            case event.keyCode >= 65 && event.keyCode <= 90:
              // Si entra acá es porque ingresaron una mayúscula
      
              break;
      
            case (event.keyCode >= 97 && event.keyCode <= 122) ||  event.keyCode === 32:
              // Si entra acá es porque ingresaron una minúscula
              break;
      
            default:
              // Si ingresaron otra cosa, lo rechaza
              event.preventDefault();
              break;
          }
        });
  
  


  // Cambio estilos del botón
  nombreParaEditar.classList.add("bordeParaNombre");
  boton_cambiar_nombre.classList.add("guardar_red");
 } else {
  // Si entra acá es porque ya puso guardar
  let nombreNuevoIngresado = nombreParaEditar.textContent.trim();
  nuevoNombre = nombreNuevoIngresado;
  nombreParaEditar.textContent = nuevoNombre;

  if (nuevoNombre.length > 16) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "El nombre debe tener menos de 15 dígitos",
      showConfirmButton: false,
      timer: 1200,
    });
    return;
  }

  if (nuevoNombre === "") {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "No puede estar vacío",
      showConfirmButton: false,
      timer: 1200,
    });
    return;
  }
  nombreParaEditar.contentEditable = false;
  await updateProfile(usuarioConSesionIniciada, { displayName: nuevoNombre });
  nombreParaEditar.classList.remove("bordeParaNombre");
  boton_cambiar_nombre.classList.remove("guardar_red");
  boton_cambiar_nombre.textContent = "Cambiar nombre";
  Swal.fire({
    title: "Nombre modificado",
    timer: 800,
    showConfirmButton: false,
    icon: "success"
  });
 }
}







// Clase para generar cada card (tarea)
class Tarjetas {
  constructor(nombre, seccion, mail, titulo, detalle, urgencia, fechaCreacion, fechaParaOrdenarlas, fechaCierre, ultimaEdicion, estado) {
    this.nombre = nombre;
    this.seccion = seccion;
    this.mail = mail;
    this.titulo = titulo;
    this.detalle = detalle;
    this.urgencia = urgencia;
    this.fechaCreacion = fechaCreacion;
    this.fechaParaOrdenarlas = fechaParaOrdenarlas;
    this.fechaCierre = fechaCierre;
    this.ultimaEdicion = ultimaEdicion;
    this.estado = estado;
    this.id = null; // Inicializamos el ID como nulo
  }
  asignarId(id) {
    this.id = id;
  }
}






// Funcion que define que se va a ver en pantalla
async function cardsEnPantalla(estadoDeLaTarjetaSeleccionada) {
  mostrarCarga();
  switch (estadoDeLaTarjetaSeleccionada) {
      case "Todas":
        mostrarCanceladas.classList.remove("opcionElegidaDelMenu");
        mostrarFinalizadas.classList.remove("opcionElegidaDelMenu");
        mostrarPendientes.classList.remove("opcionElegidaDelMenu");
        mostrarTodas.classList.add("opcionElegidaDelMenu");

        pantallaActual = "Todas"; //Para mantenerme en la misma pantalla
        await obtenerCardsDesdeFirestore(pantallaActual); // Obtener las cards desde Firestore
        break;

      case "Pendientes":
        pantallaActual = "Pendientes";
        mostrarCanceladas.classList.remove("opcionElegidaDelMenu");
        mostrarFinalizadas.classList.remove("opcionElegidaDelMenu");
        mostrarTodas.classList.remove("opcionElegidaDelMenu");
        mostrarPendientes.classList.add("opcionElegidaDelMenu");

        await obtenerCardsDesdeFirestore(pantallaActual);
        
        break;

      case "Finalizadas":
        mostrarCanceladas.classList.remove("opcionElegidaDelMenu");
        mostrarTodas.classList.remove("opcionElegidaDelMenu");
        mostrarPendientes.classList.remove("opcionElegidaDelMenu");
        mostrarFinalizadas.classList.add("opcionElegidaDelMenu");

        pantallaActual = "Finalizadas";
        await obtenerCardsDesdeFirestore(pantallaActual);
        
        break;

      case "Canceladas":
        mostrarTodas.classList.remove("opcionElegidaDelMenu");
        mostrarFinalizadas.classList.remove("opcionElegidaDelMenu");
        mostrarPendientes.classList.remove("opcionElegidaDelMenu");
        mostrarCanceladas.classList.add("opcionElegidaDelMenu");

        pantallaActual = "Canceladas";
        await obtenerCardsDesdeFirestore(pantallaActual);
        
        break;

      default:
        break;
  }
  ocultarCarga();
  }
  
  
  
  
  
// función para filtrar por secciones
function filtroDeSecciones (seccionElegida) {
  let botonSeccionTodas = document.getElementById("boton-secciones-todas");
  let botonSeccionCompras = document.getElementById("boton-secciones-compras");
  let botonSeccionTrabajo = document.getElementById("boton-secciones-trabajo");
  let botonSeccionCasa = document.getElementById("boton-secciones-casa");
  let botonSeccionTurnos = document.getElementById("boton-secciones-turnos");
  let botonSeccionOtras = document.getElementById("boton-secciones-otras");


  botonMenuSecciones.innerText = `Sección:    ${seccionElegida.toUpperCase()}     `;

  
  switch (seccionElegida) {
      case "Todas":
      botonSeccionTodas.classList.add("fondo-para-seccion-seleccionada-en-desplegable");

      botonSeccionCasa.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      botonSeccionCompras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      botonSeccionTrabajo.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      botonSeccionTurnos.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      botonSeccionOtras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      break;

      case "Compras":
        botonSeccionCompras.classList.add("fondo-para-seccion-seleccionada-en-desplegable");

        botonSeccionTodas.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCasa.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTrabajo.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTurnos.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionOtras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      break;

      case "Trabajo":
        botonSeccionTrabajo.classList.add("fondo-para-seccion-seleccionada-en-desplegable");

        botonSeccionTodas.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCompras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCasa.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTurnos.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionOtras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      break;

      case "Casa":
        botonSeccionCasa.classList.add("fondo-para-seccion-seleccionada-en-desplegable");

        botonSeccionTodas.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCompras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTrabajo.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTurnos.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionOtras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      break;

      case "Turnos":
        botonSeccionTurnos.classList.add("fondo-para-seccion-seleccionada-en-desplegable");

        botonSeccionTodas.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCompras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTrabajo.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCasa.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionOtras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      break;

      case "Otras":
        botonSeccionOtras.classList.add("fondo-para-seccion-seleccionada-en-desplegable");

        botonSeccionTodas.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCompras.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTrabajo.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionTurnos.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
        botonSeccionCasa.classList.remove("fondo-para-seccion-seleccionada-en-desplegable");
      break;
  
    default:
      break;
  }
}






// Función para obtener las cards desde Firestore
async function obtenerCardsDesdeFirestore(estado) {
  // Limpiar el array de cards antes de obtener las nuevas desde Firestore
  actualizarCards();
  unaCard = [];

  // Obtener todas las tareas desde Firestore
  const querySnapshot = await getDocs(collection(db, nombreDeColeccion));

  // Iterar sobre las tareas y agregarlas al array y al contenedor
  querySnapshot.forEach((doc) => {
    const tarjetaFirestore = doc.data();
    tarjetaFirestore.seccion = tarjetaFirestore.seccion? tarjetaFirestore.seccion: "Otras";

    if (tarjetaFirestore.estado === estado || pantallaActual === "Todas") {

      if (tarjetaFirestore.seccion === muestraSeccionPantalla) {
        
        tarjetaFirestore.id = doc.id;
        unaCard.push(tarjetaFirestore);
        
      } else if (muestraSeccionPantalla === "Todas"){

        tarjetaFirestore.id = doc.id;
        unaCard.push(tarjetaFirestore);
      }
    }
  });

  // Ordenar las tarjetas cronológicamente
  unaCard.sort((b, a) => new Date(a.fechaParaOrdenarlas) - new Date(b.fechaParaOrdenarlas));

  // Iterar sobre las tarjetas ordenadas y agregarlas al contenedor
  unaCard.forEach(tarjeta => {
    agregarCardAlContenedor(tarjeta);
  });
}








function mostrarCarga() {
  modalCarga.style.display = 'flex';
}
// Ocultar el modal de carga
function ocultarCarga() {
  modalCarga.style.display = 'none';
}





// Funcion para mostrar u ocultar el formulario, poniendo borroso lo demás
function mostrarFormulario() {
  formulario.classList.toggle("oculto");

  if (formulario.classList.contains("oculto")) {
    botonMas.textContent = "+";
    botonMas.classList.add("botonMas_class");
    botonMas.classList.remove("boton_x");
    divDeEstados.classList.remove("aplicar-display-none");
    navbar_general.classList.remove("aplicar-display-none");
    menu.classList.remove("disminuir-margin-top");


    menuBorroso ();
  } else {
    botonMas.textContent = "x";
    botonMas.classList.remove("botonMas_class");
    botonMas.classList.add("boton_x");
    divDeEstados.classList.add("aplicar-display-none")
    navbar_general.classList.add("aplicar-display-none");
    menu.classList.add("disminuir-margin-top");

// Obtener el elemento del calendario

calendario.on('changeDate', function(event) {

  // let fechaSeleccionada = event.date;
  
  verSiHorarioDeNotificacionYaPaso();
});


    menuBorroso ();
  }
}





// Función para poner/sacar lo borroso
function menuBorroso () {
  if (formulario.classList.contains("oculto")) {
    // Saco el menú borroso
    mostrarCanceladas.classList.remove("menu_borroso");
    mostrarFinalizadas.classList.remove("menu_borroso");
    mostrarPendientes.classList.remove("menu_borroso");
    mostrarTodas.classList.remove("menu_borroso");

  } else {
    // Pongo el menú borroso
    mostrarCanceladas.classList.add("menu_borroso");
    mostrarFinalizadas.classList.add("menu_borroso");
    mostrarPendientes.classList.add("menu_borroso");
    mostrarTodas.classList.add("menu_borroso");

  }
}





// Funcion para cuando agrego una tarea, y debo ocultar el formulario y sacar lo borroso
function ocultarFormulario() {
  formulario.classList.add("oculto");
  botonMas.textContent = "+";
  botonMas.classList.add("botonMas_class");
  botonMas.classList.remove("boton_x");
  divDeEstados.classList.remove("aplicar-display-none");
  navbar_general.classList.remove("aplicar-display-none");
  menu.classList.remove("disminuir-margin-top");

  for (var i = 0; i < menu.children.length; i++) {
    var hijo = menu.children[i];

    // Verificar si el hijo es un enlace (<a>)
    if (hijo.tagName.toLowerCase() === "a") {
      hijo.classList.remove("menu_borroso");
    }
  }
}





// Función para vaciar campos del formulario
function vaciarCampos() {
  let tituloInput = document.getElementById("tareaTitulo");
  let detalleInput = document.getElementById("tareaDetalle");
  let urgenciaInput = document.getElementById("tareaUrgencia");
  let seccionInput = document.getElementById("secciones-id");

  tituloInput.value = "";
  detalleInput.value = "";
  urgenciaInput.value = "";
  seccionInput.value = "";
}





// Función para habilitar la programación de la notificación
function mostrarCargaDeNotificacion(e){
  e.preventDefault();
  check08.disabled = false;
  check14.disabled = false;
  check21.disabled = false;
  fechaSeleccionadaSinFormato.disabled = false;
  quiereNotificacion = true;
}

// Función para deshabilitar la programación de la notificación
function ocultarCargaDeNotificacion(e){
  if (e) {
    e.preventDefault();
  }
  check08.disabled = true;
  check14.disabled = true;
  check21.disabled = true;
  fechaSeleccionadaSinFormato.disabled = true;
  quiereNotificacion = false;
}







// Función para ver si el checkbox es de un horario que ya pasó
function verSiHorarioDeNotificacionYaPaso (){
  let fechaActual = new Date().toLocaleDateString();
  let horaActual = new Date().toLocaleTimeString([], {hour: '2-digit'});
  fechaSeleccionadaParticionada = fechaSeleccionadaSinFormato.value.split('-'); // Dividir la cadena por el guion
  fechaSeleccionadaConFormato = new Date(fechaSeleccionadaParticionada[2], fechaSeleccionadaParticionada[1] - 1, fechaSeleccionadaParticionada[0]).toLocaleDateString();

  if (fechaActual === fechaSeleccionadaConFormato) {
      if (selecciona08) {
          // if (horaActual >= 8) {
            if (!horaActual) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Seleccionaste un horario que ya pasó",
              showConfirmButton: false,
              timer: 1000,
            });
          selecciona08 = false;
          check08.checked = false
          }

      }
      if (selecciona14) {
          // if (horaActual >= 14) {
            if (!horaActual) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Seleccionaste un horario que ya pasó",
              showConfirmButton: false,
              timer: 1000,
            });
            selecciona14 = false;
            check14.checked = false
            }
      }

      if (selecciona21){
          // if (horaActual >= 21) {
          if (!horaActual) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "Seleccionaste un horario que ya pasó",
              showConfirmButton: false,
              timer: 1000,
            });
            selecciona21 = false;
            check21.checked = false
            }
      } 
    }
  }







// Manejo que pasa si tildan o destildan
check08.addEventListener('change', function(event) {
  if (check08.checked) {
    selecciona08 = true;
    verSiHorarioDeNotificacionYaPaso ();
  } else {
    selecciona08 = false;
  }
});
check14.addEventListener('change', function(event) {
  if (check14.checked) {
    selecciona14 = true;
    verSiHorarioDeNotificacionYaPaso ();
  } else {
    selecciona14 = false;
  }
});
check21.addEventListener('change', function(event) {
  if (check21.checked) {
    selecciona21 = true;
    verSiHorarioDeNotificacionYaPaso ();
  } else {
    selecciona21 = false;
  }
});










// Función para aagarrar los datos que ingresa el usuario cuando agrega una tarea, y guardarlos en la DB
async function agregarTarea(event) {
  mostrarCarga();
  event.preventDefault();
  let fecha = new Date();
  let formatoFechaCreacion = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  let titulo = document.getElementById("tareaTitulo").value;
  let detalle = document.getElementById("tareaDetalle").value;
  let urgencia = document.getElementById("tareaUrgencia").value;
  let fechaCreacion = fecha.toLocaleTimeString('es-AR', formatoFechaCreacion);
  let fechaParaOrdenarlas = fecha.toISOString();
  let fechaCierre = "-";
  let ultimaEdicion = fecha.toLocaleTimeString('es-AR', formatoFechaCreacion);
  let estado = "Pendientes";
  seccionQueSeMuestraEnPantalla = document.getElementById("secciones-id").value


  if (!titulo || !detalle || !urgencia || !seccionQueSeMuestraEnPantalla) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Se deben completar todos los campos",
                showConfirmButton: false,
                timer: 1000,
              });
              ocultarCarga();
              return;
  } else if(quiereNotificacion && fechaSeleccionadaSinFormato.value === "") {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "No seleccionó la fecha",
              showConfirmButton: false,
              timer: 1000,
          });
  ocultarCarga();
  return;
  } else if (quiereNotificacion && !check08.checked && !check14.checked && !check21.checked){
            Swal.fire({
              position: "center",
              icon: "warning",
              title: "No seleccionó ningun horario",
              showConfirmButton: false,
              timer: 1000,
            });
            ocultarCarga();
            return;
  }  else {
            let nuevaCard = new Tarjetas(nombreDeUsuarioDB, seccionQueSeMuestraEnPantalla, mailDeUsuarioDB, titulo, detalle, urgencia, fechaCreacion, fechaParaOrdenarlas, fechaCierre, ultimaEdicion, estado);
            unaCard.push(nuevaCard);

            try {
              let docRef = await addDoc(collection(db, nombreDeColeccion), {
                nombre: nuevaCard.nombre,
                seccion: nuevaCard.seccion,
                mail: nuevaCard.mail,
                titulo: nuevaCard.titulo,
                detalle: nuevaCard.detalle,
                urgencia: nuevaCard.urgencia,
                fechaCreacion: nuevaCard.fechaCreacion,
                fechaParaOrdenarlas: nuevaCard.fechaParaOrdenarlas,
                fechaCierre: nuevaCard.fechaCierre,
                ultimaEdicion: nuevaCard.ultimaEdicion,
                estado: nuevaCard.estado
              });

              // Asignar el ID generado por Firestore a la tarjeta
              nuevaCard.asignarId(docRef.id);

                    llamarProgramarNotificacion(fechaSeleccionadaConFormato, titulo, check08.checked, check14.checked, check21.checked, nombreDeUsuarioDB, mailDeUsuarioDB, fecha);


                      console.log(nombreDeUsuarioDB)
                      console.log(mailDeUsuarioDB)
                      console.log(fecha)


                    agregarCardAlContenedor(nuevaCard);
                    ocultarFormulario();
                    vaciarCampos();
                    menuBorroso();
                    ocultarCarga();
                    cardsEnPantalla("Pendientes");
                    ocultarCargaDeNotificacion();
                    fechaSeleccionadaSinFormato.value = "";
                    check08.checked = false;
                    check14.checked = false;
                    check21.checked = false;

                  Swal.fire({
                      title: "Tarea agregada!",
                      timer: 1200,
                      showConfirmButton: false,
                      icon: "success"
                  });



            } catch (error) {
              console.error("Error al agregar la tarea a Firestore", error);
              ocultarCarga();
            }
            ocultarCarga();

          }
      ocultarCarga();
}







  // Función para asignar los eventos a los botones de las cards ↓
function asignarEventosSegunDondeHagaClick() {
  // Asignar eventos a los botones
  document.addEventListener("click", (event) => {
      // Verificar si el clic ocurrió en un botón de editar
      if (event.target.id.startsWith("editar-")) {
          // Extraer el ID de la tarea de la identificación del botón
          editarTarea(event.target.id.split("-")[1]);
      } 
      // Verificar si el clic ocurrió en un botón de finalizar
      else if (event.target.id.startsWith("finalizar-")) {
          // Extraer el ID de la tarea de la identificación del botón
          finalizarTarea(event.target.id.split("-")[1]);
      } 
            // Verificar si el clic ocurrió en un botón de finalizar
            else if (event.target.id.startsWith("restaurar-")) {
              // Extraer el ID de la tarea de la identificación del botón
              restaurarTarea(event.target.id.split("-")[1]);
          }
      // Verificar si el clic ocurrió en un botón de finalizar
      else if (event.target.id.startsWith("modal-finalizar-")) {
        // Extraer el ID de la tarea de la identificación del botón
        finalizarTarea(event.target.id.split("-")[2]);
      // Verificar si el clic ocurrió en un botón de cancelar
      }
      else if (event.target.id.startsWith("cancelar-")) {
          // Extraer el ID de la tarea de la identificación del botón
          cancelarTarea(event.target.id.split("-")[1]);
      }// Verificar si el clic ocurrió en un botón de opciones
      else if (event.target.id.startsWith("opciones-")) {
        // Extraer el ID de la tarea de la identificación del botón
        masOpciones(event.target.id.split("-")[1]);
    }// Verificar si el clic ocurrió en un botón de eliminar
    else if (event.target.id.startsWith("eliminar-")) {
      // Extraer el ID de la tarea de la identificación del botón
      eliminar(event.target.id.split("-")[1]);
  }
  });
}





// Función que renderiza las cards, dependiendo su estado y su urgencia
function agregarCardAlContenedor(tarea) {
  // Genera un ID único para el div (card) basado en el ID de la tarea
  let cardID = `card-${tarea.id}`;
  let botonFinalizarID = `finalizar-${tarea.id}`;
  let botonMasOpcionesID = `opciones-${tarea.id}`;
  let botonEliminarID = `eliminar-${tarea.id}`;
  let textoCortado = tarea.detalle

  let maxCaracteres = 40;
  let contenidoDetalle = tarea.detalle;
  if (contenidoDetalle.length > maxCaracteres) {
    let detalleTruncado = contenidoDetalle.substring(0,maxCaracteres) + "...";
    textoCortado = detalleTruncado;
  }

  if (tarea.estado === "Pendientes") {
        if (tarea.urgencia === "Alta") {
          let nuevaCardHTML = `
          <div id="${cardID}" class="cards borde_urgencia">
            <h3>${tarea.titulo}</h3>
            <p class="p_detalle">${textoCortado}</p>
            <p>URGENCIA: <br> ${tarea.urgencia}</p>
            <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
            <p>SECCIÓN: <br> ${tarea.seccion}</p>
            <button id="${botonFinalizarID}" class="btn botonesCards" >Finalizar</button>
            <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
          </div>
        `;
          pendientesCards.innerHTML += nuevaCardHTML;
        } else if (tarea.urgencia === "Baja") {
        let nuevaCardHTML = `
        <div id="${cardID}" class="cards div-urgencia-baja">
          <h3>${tarea.titulo}</h3>
          <p class="p_detalle">${textoCortado}</p>
          <p>URGENCIA: <br> ${tarea.urgencia}</p>
          <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
          <p>SECCIÓN: <br> ${tarea.seccion}</p>
          <button id="${botonFinalizarID}" class="btn botonesCards" >Finalizar</button>
          <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
        </div>
      `;
        pendientesCards.innerHTML += nuevaCardHTML;
        } else {
          let nuevaCardHTML = `
        <div id="${cardID}" class="cards">
          <h3>${tarea.titulo}</h3>
          <p class="p_detalle">${textoCortado}</p>
          <p>URGENCIA: <br> ${tarea.urgencia}</p>
          <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
          <p>SECCIÓN: <br> ${tarea.seccion}</p>
          <button id="${botonFinalizarID}" class="btn botonesCards" >Finalizar</button>
          <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
        </div>
      `;
        pendientesCards.innerHTML += nuevaCardHTML;
        }
        }
    else if (tarea.estado === "Finalizadas") {
    let nuevaCardHTML = `
    <div id="${cardID}" class="cards">
      <h3>${tarea.titulo}</h3>
      <p class="p_detalle">${textoCortado}</p>
      <p>SECCIÓN: <br> ${tarea.seccion}</p>
      <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
      <p>FIN: <br> ${tarea.fechaCierre}</p>
      <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
    </div>
  `;
    finalizadasCards.innerHTML += nuevaCardHTML;
  } else if (tarea.estado === "Canceladas") {
    let nuevaCardHTML = `
    <div id="${cardID}" class="cards">
      <h3>${tarea.titulo}</h3>
      <p class="p_detalle">${textoCortado}</p>
      <p>SECCIÓN: <br> ${tarea.seccion}</p>
      <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
      <p>FIN: <br> ${tarea.fechaCierre}</p>
      <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
    </div>
  `;
    canceladasCards.innerHTML += nuevaCardHTML;
  }
}





// Función para el botón de "mas opciones", para abrir el modal grande de las cards
function masOpciones(id){
  let tarea = unaCard.find((t) => t.id === id);

    // Genera un ID único para el div (card) basado en el ID de la tarea
    let cardModalID = `cardModal-${tarea.id}`;
    let tituloID = `titulo-${tarea.id}`;
    let detalleID = `detalle-${tarea.id}`;
    let urgenciaID = `urgencia-${tarea.id}`;
    let seccionID = `seccion-${tarea.id}`
    let botonEditarID = `editar-${tarea.id}`;
    let botonFinalizarID = `modal-finalizar-${tarea.id}`;
    let botonCancelarID = `cancelar-${tarea.id}`;
    let botonEliminarID = `eliminar-${tarea.id}`;
    let botonRestaurarID = `restaurar-${tarea.id}`;
  
    let nuevaCardHTML = `
    <div id="${cardModalID}" class="cards_modal">
    <h1 class="h3_modal" id="${tituloID}">${tarea.titulo}</h1>
    <p class="detalle_modal" id="${detalleID}">${tarea.detalle}</p>
        <div class="div_modales">
        <strong>URGENCIA → </strong>
        <p class="urgencia_editar" id="${urgenciaID}">${tarea.urgencia}</p>
        </div>
        <div class="div_modales">
        <strong>SECCIÓN → </strong>
        <p class="seccion_editar" id="${seccionID}">${tarea.seccion?tarea.seccion:"Otras"}</p>
        </div>
        <div class="div_modales">
        <strong>CREACIÓN → </strong>
        <p> ${tarea.fechaCreacion}</p>
        </div>
        <div class="div_modales">
        <strong>ÚLTIMA EDICIÓN → </strong>
        <p>${tarea.ultimaEdicion}</p>
        </div>
        <div class="div_modales">
        <strong>FIN → </strong>
        <p> ${tarea.fechaCierre}</p>
        </div>
  </div>
    `;

modalCard.innerHTML = nuevaCardHTML;
modalFooter.innerHTML="";

if (tarea.estado === "Pendientes") {
  let botonesCard = `
  <button id="${botonEditarID}" class="btn botonesCards_modal" >Editar</button>
  <button id="${botonFinalizarID}" class="btn botonesCards_modal" >Finalizar</button>
  <button id="${botonCancelarID}" class="btn botonesCards_modal" >Cancelar</button>
  <button id="${botonEliminarID}" class="btn botonesCards_modal" >Eliminar</button>
  `
modalFooter.innerHTML = botonesCard;
  }  else if (tarea.estado === "Finalizadas" || tarea.estado === "Canceladas") {
    let botonesCard = `
    <button id="${botonRestaurarID}" class="btn botonesCards_modal" >Restaurar</button>
    <button id="${botonEliminarID}" class="btn botonesCards_modal" >Eliminar</button>

    `
    modalFooter.innerHTML = botonesCard;
  }
}






// Función para finalizar tarea de card
async function finalizarTarea(id) {
  // Buscar la tarea por su ID
  let tarea = unaCard.find((t) => t.id === id);
  
  if (tarea) {
  Swal.fire({
    title: "¿Finalizar tarea?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Finalizar",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      let fecha = new Date();
      let formatoFechaCierre = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

    // Cambiar el estado y la fecha de cierre
    tarea.estado = "Finalizadas";
    muestraPantalla = tarea.estado;
    tarea.fechaCierre = fecha.toLocaleTimeString('es-AR', formatoFechaCierre);
  
      // Actualiza la tarea en Firestore
      const tareaRef = doc(db, nombreDeColeccion, id);
      updateDoc(tareaRef, {
        estado: tarea.estado,
        fechaCierre: tarea.fechaCierre
      });
      Swal.fire({
        title: "Tarea finalizada!",
        timer: 1000,
        showConfirmButton: false,
        icon: "success"
      });
      setTimeout(() => {
        cardsEnPantalla(pantallaActual);
      }, 1000);
    }
    });
    } else {
      Swal.fire({
        title: "Tarea inexistente o modificada. Cierre la ventana",
        timer: 1200,
        showConfirmButton: false,
        icon: "error"
      });
    }
  }





// Función para eliminar una tarea de la DB
async function eliminar(id){
  let tarea = unaCard.find((t) => t.id === id);
 if (tarea) {
  Swal.fire({
    title: "Se eliminará de manera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: 'Cancelar',
    footer: "NO SE PUEDE RECUPERAR"
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarCarga();
      deleteDoc(doc(db, nombreDeColeccion, tarea.id));
      Swal.fire({
        title: "Tarea eliminada!",
        timer: 1000,
        showConfirmButton: false,
        icon: "success"
      });
      setTimeout(() => {
        cardsEnPantalla(pantallaActual);
        ocultarCarga();
      }, 1000);
    }
  }); 
 } else {
  Swal.fire({
    title: "Tarea inexistente o modificada. Cierre la ventana",
    timer: 1200,
    showConfirmButton: false,
    icon: "error"
  });
 }
}





// Función restaurar tarea:
async function restaurarTarea(id){
  let tarea = unaCard.find((t) => t.id === id);


  if (tarea) {
    Swal.fire({
      title: "¿Restaurar tarea?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
    
      // Cambiar el estado
      tarea.estado = "Pendientes";
      muestraPantalla = tarea.estado;
  
          // Actualiza la tarea en Firestore
          const tareaRef = doc(db, nombreDeColeccion, id);
          updateDoc(tareaRef, {
            estado: tarea.estado,
        });
        Swal.fire({
          title: "Tarea restaurada!",
          timer: 1000,
          showConfirmButton: false,
          icon: "success"
        });
        setTimeout(() => {
          cardsEnPantalla(pantallaActual);
          ocultarCarga();
        }, 1000);
  
      }
    });
  } else {
    Swal.fire({
      title: "Tarea inexistente o modificada. Cierre la ventana",
      timer: 1200,
      showConfirmButton: false,
      icon: "error"
    });
   }
  }







// Función para cancelar una tarea
async function cancelarTarea(id) {
  // Buscar la tarea por su ID
  let tarea = unaCard.find((t) => t.id === id);
if (tarea) {
  Swal.fire({
    title: "¿Cancelar tarea?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
    let fecha = new Date();
    let formatoFechaCierre = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    tarea.fechaCierre = fecha.toLocaleTimeString('es-AR', formatoFechaCierre);
  
    // Cambiar el estado
    tarea.estado = "Canceladas";
    muestraPantalla = tarea.estado;

        // Actualiza la tarea en Firestore
        const tareaRef = doc(db, nombreDeColeccion, id);
        updateDoc(tareaRef, {
          estado: tarea.estado,
          fechaCierre : tarea.fechaCierre
      });
      Swal.fire({
        title: "Tarea cancelada!",
        timer: 1000,
        showConfirmButton: false,
        icon: "success"
      });
      setTimeout(() => {
        cardsEnPantalla(pantallaActual);
        ocultarCarga();
      }, 1000);

    }
  });
} else {
  Swal.fire({
    title: "Tarea inexistente o modificada. Cierre la ventana",
    timer: 1200,
    showConfirmButton: false,
    icon: "error"
  });
 }
}








// Función para editar una tarea
async function editarTarea(id) {
  // Buscar la tarea por su ID
  let tarea = unaCard.find((t) => t.id === id);

  
  if (tarea) {
     //Me fijo fecha para después guardarla
  let fecha = new Date();         
  let formatoFechaEdicion = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  

  // Obtener la referencia al documento en Firestore
  let tareaRef = doc(db, nombreDeColeccion, id);


  // Obtener los elementos HTML correspondientes a los campos de título, detalle,sección y urgencia; y el botón editar
  let tituloParaEditar = document.getElementById(`titulo-${tarea.id}`);
  let detalleParaEditar = document.getElementById(`detalle-${tarea.id}`);
  let urgenciaParaEditar = document.getElementById(`urgencia-${tarea.id}`);
  let seccionParaEditar = document.getElementById(`seccion-${tarea.id}`);
  let botonEditar = document.getElementById(`editar-${tarea.id}`);

  // Obtener los demás botones, para anularlos
  let botonDeFinalizarID = document.getElementById(`modal-finalizar-${tarea.id}`);
  let botonDeCancelarID = document.getElementById(`cancelar-${tarea.id}`);
  let botonDeEliminarID = document.getElementById(`eliminar-${tarea.id}`);


  // Verificar si estamos en modo de edición o no
  let verSiGuardoOEdito = botonEditar.textContent === "Guardar";


  if (verSiGuardoOEdito) {
    // Guardar cambios

    // Obtener los nuevos valores de los campos editados
    let nuevoTitulo = document.getElementById(`titulo-${tarea.id}`).textContent;
    let nuevoDetalle = document.getElementById(`detalle-${tarea.id}`).textContent;
    let nuevaUrgencia = document.getElementById("tareaUrgencia-editar").value;
    let nuevaSeccion = document.getElementById("tareaSeccion-editar").value;



    // Me aseguro de que no hayan campos vacíos
    if (nuevoDetalle === "" || nuevaUrgencia === "" || nuevaSeccion === "" || nuevoTitulo === "") {
      Swal.fire({
        title: "Complete todos los campos",
        timer: 1200,
        showConfirmButton: false,
        icon: "warning"
      });
      return;
    }

    // Habilito los demás botones
    botonDeFinalizarID.disabled = false;
    botonDeCancelarID.disabled = false;
    botonDeEliminarID.disabled = false;
 


    // Guardo los nuevos valores
    urgenciaParaEditar.innerHTML = nuevaUrgencia;
    seccionParaEditar.innerHTML = nuevaSeccion;
    tarea.titulo = nuevoTitulo;
    tarea.detalle = nuevoDetalle;
    tarea.urgencia = nuevaUrgencia;
    tarea.seccion = nuevaSeccion;


    // Deshabilitar la edición en el DOM y borro las clases
    detalleParaEditar.classList.remove("fondo_input_editable");
    tituloParaEditar.classList.remove("fondo_input_editable");
    tituloParaEditar.contentEditable = false;
    detalleParaEditar.contentEditable = false;


    // Restaurar el botón de editar
    botonEditar.classList.remove("boton-guardar");
    botonEditar.textContent = "Editar";


    // Realizar la actualización en Firestore
    try {
      await updateDoc(tareaRef, {
        titulo: nuevoTitulo,
        detalle: nuevoDetalle,
        urgencia: nuevaUrgencia,
        seccion: nuevaSeccion,
        ultimaEdicion: fecha.toLocaleTimeString('es-AR', formatoFechaEdicion)// Actualizar la fecha de última edición
      });
      Swal.fire({
        title: "Modificado!",
        timer: 800,
        showConfirmButton: false,
        icon: "success"
      });
      cardsEnPantalla(pantallaActual);
    } catch (error) {
      Swal.fire({
        title: "Ocurrió un error. Revise su conexión",
        timer: 1200,
        showConfirmButton: false,
        icon: "error"
      });
      console.error("Error al actualizar el documento en Firestore", error);
    }
  } else {
    // Entrar en modo de edición

    // Cambio estilos de los campos a editar, y habilito su edición
    tituloParaEditar.classList.add("fondo_input_editable");
    detalleParaEditar.classList.add("fondo_input_editable");
    tituloParaEditar.contentEditable = true;
    detalleParaEditar.contentEditable = true;

    // Anulo los demás botones
    botonDeFinalizarID.disabled = true;
    botonDeCancelarID.disabled = true;
    botonDeEliminarID.disabled = true;


    let seccionSeleccionada = tarea.seccion?tarea.seccion: "Otras";
    // Genero el desplegable para elegir sección
    seccionParaEditar.innerHTML = `
    <select class="select-urgencia-editar" id="tareaSeccion-editar" name="tareaSeccion" required>
        <option value="Compras" ${seccionSeleccionada === "Compras" ? "selected" : ""}>Compras</option>
        <option value="Trabajo" ${seccionSeleccionada === "Trabajo" ? "selected" : ""}>Trabajo</option>
        <option value="Casa" ${seccionSeleccionada === "Casa" ? "selected" : ""}>Casa</option>
        <option value="Turnos" ${seccionSeleccionada === "Turnos" ? "selected" : ""}>Turnos</option>
        <option value="Otras" ${seccionSeleccionada === "Otras" ? "selected" : ""}>Otras</option>
    </select>
    `;


  

    let urgenciaSeleccionada = tarea.urgencia;
    // Genero el desplegable para elegir urgencia
    urgenciaParaEditar.innerHTML = `
    <select class="select-urgencia-editar" id="tareaUrgencia-editar" name="tareaUrgencia" required>
        <option value="Alta" ${urgenciaSeleccionada === "Alta" ? "selected" : ""}>Alta</option>
        <option value="Media" ${urgenciaSeleccionada === "Media" ? "selected" : ""}>Media</option>
        <option value="Baja" ${urgenciaSeleccionada === "Baja" ? "selected" : ""}>Baja</option>
    </select>
    `;



    // Pongo el cursor en el detalle, que es el más factible que se quiera editar
    detalleParaEditar.focus();


    // Cambiar el texto al botón editar y la función
    botonEditar.textContent = "Guardar";
    botonEditar.classList.add("boton-guardar");
    }
  } else {
    Swal.fire({
      title: "Tarea inexistente o modificada. Cierre la ventana",
      timer: 1200,
      showConfirmButton: false,
      icon: "error"
    });
  }
}







// Función para limpiar lo que se muestra en pantalla
function actualizarCards() {
  // Limpiar los contenedores
  todasCards.innerHTML = "";
  pendientesCards.innerHTML = "";
  finalizadasCards.innerHTML = "";
  canceladasCards.innerHTML = "";
}