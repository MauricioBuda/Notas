// Imports ↓
import { addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db, registrarUsuario, iniciarSesion, recuperarClave, cerrarSesion, auth, eliminarCuenta, obtenerColeccionDeFirestore, agregarNuevoCampoADoc } from './firestoreConfig';
import { updateProfile } from 'firebase/auth';
import { llamarProgramarNotificacion, obtenerToken, requestPermission } from './notificaciones';
import Swal from 'sweetalert2';






// Array para ir guardando las cards ↓
let unaCard = [];
let notasRapidasArray = [];







//DECLARO VARIABLES Y LES ASIGNO EVENTOS ↓

// Variables menú ↓
let botonMas = document.getElementById("botonMas_id");
let menu = document.getElementById("id_menu");
let divDeEstados = document.getElementById("divDeEstadosID");


// Variables formulario para agregar tarea ↓
let formulario = document.getElementById("section_formulario_id");
let botonAgregarTarea = document.getElementById("boton_agregarTarea_id");
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))



// Eventos del formulario ↓
botonAgregarTarea.addEventListener("click", agregarTarea);


// Variables del formulario, de la notificación en tarea nueva ↓
let calendario = $('#datepicker');
let iconoCalendar = document.getElementById("icono-calendar")
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


// Variables del formulario, de la notificación en tarea existente ↓
let check08a
let check14a
let check21a




// Eventos del formulario, para la notificación ↓
aceptarNoti.addEventListener("click", mostrarCargaDeNotificacion);
rechazarNoti.addEventListener("click", ocultarCargaDeNotificacion);

// Variables para el modal de notificación ↓
let modalParaNotificacion
let modalParaAgregarNotificacionACardExistente

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
let menuSuperior = document.getElementById("filtro_id_menu")
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
// let modalNotificacion = document.getElementById("modalNotificacion");
let modalFooter = document.getElementById("modal_footerID");
let svgBell = `<svg class="img-campana-card" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
</svg>`;

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
let botonRecargarPagina = document.getElementById("button_recargar");
let salir_navbar =  document.getElementById("navbar_salir");
let boton_cambiar_nombre = document.getElementById("button_cambiar_nombre");
let boton_eliminar_cuenta = document.getElementById("button_eliminar_cuenta");
let boton_notas_rapidas = document.getElementById("button_notas_rapidas");
let boton_qr = document.getElementById("button_qr");
let usuarioConSesionIniciada = null;



// Eventos del menú desplegable
botonRecargarPagina.addEventListener("click", ()=> {location.reload()});
boton_eliminar_cuenta.addEventListener("click", elimnarLaCuenta);
boton_cambiar_nombre.addEventListener("click", cambiarNombre);
boton_notas_rapidas.addEventListener("click", modalNotasRapidas);
salir_navbar.addEventListener("click", salir);


// Notas rápidas ↓
let cardNotaRapida = document.getElementById("seccion-notas-rapidas");
let tituloNotaRapidaInput = document.getElementById("input-titulo-notas-rapidas");
let detalleNotaRapidaInput = document.getElementById("input-detalle-notas-rapidas");
let desplegarFormularioDeNotaRapida = document.getElementById("btn-add-nota-rapida");
let botonAgregarGuardarNotaRapida = document.getElementById("btn-guardar-nota-rapida");
let botonCancelarNotaRapida = document.getElementById("btn-cancelar-nota-rapida");
let seccionParaRenderizarNotas = document.getElementById("seccion-cards-notas-rapidas");

desplegarFormularioDeNotaRapida.addEventListener("click", desplegarFormularioNotaRapida)
botonAgregarGuardarNotaRapida.addEventListener("click", guardarNuevaNotaRapida)
botonCancelarNotaRapida.addEventListener("click", desplegarFormularioNotaRapida)




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

      // Pido permiso para notificaciones
      requestPermission();

      // Creo esta variable como bandera para poder cambiar nombre en cambiarNombre();
      usuarioConSesionIniciada=usuario; 

      // Oculto/muestro las pantallas necesarias
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

      // Obtengo token para notificaciones
      obtenerToken();
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
        showConfirmButton: false,
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

      botonRecargarPagina.classList.add("letra-clarita");
      salir_navbar.classList.add("letra-clarita");
      boton_eliminar_cuenta.classList.add("letra-clarita");
      boton_notas_rapidas.classList.add("letra-clarita");
      boton_qr.classList.add("letra-clarita");

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

  botonRecargarPagina.classList.remove("letra-clarita");
  salir_navbar.classList.remove("letra-clarita");
  boton_eliminar_cuenta.classList.remove("letra-clarita");
  boton_notas_rapidas.classList.remove("letra-clarita");
  boton_qr.classList.remove("letra-clarita");


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






// TERMINO CON TEMA REGISTRO Y FIREBASE AUTH ↑

// EMPIEZO CON FUNCIONALIDADES DE LA APP INTERNAS ↓








// Clase para generar cada card (tarea)
class Tarjetas {
  constructor(nombre, seccion, mail, titulo, detalle, urgencia, fechaCreacion, fechaParaOrdenarlas, fechaCierre, ultimaEdicion, estado, quiereNotificacion) {
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
    this.quiereNotificacion = quiereNotificacion;
    this.id = null;
  }
  asignarId(id) {
    this.id = id;
  }
}






// Clase para generar notas rápidas
class NotasRapidas {
  constructor( notaRapidaBandera, titulo, detalle, fechaCreacion, fechaCreacionConFormato) {
    this.notaRapidaBandera = notaRapidaBandera;
    this.titulo = titulo;
    this.detalle = detalle;
    this.fechaCreacion = fechaCreacion;
    this.fechaCreacionConFormato = fechaCreacionConFormato;
    this.id = null;
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
async function mostrarFormulario() {
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
  iconoCalendar.classList.remove("icono-calendar-block")
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
  iconoCalendar.classList.add("icono-calendar-block")
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
          if (horaActual >= 8) {
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
          if (horaActual >= 14) {

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
          if (horaActual >= 21) {
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







// Manejo que pasa si tildan o destildan en el formulario de nueva tarea
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












// Función para agarrar los datos que ingresa el usuario cuando agrega una tarea, y guardarlos en la DB
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
            let nuevaCard = new Tarjetas(nombreDeUsuarioDB, seccionQueSeMuestraEnPantalla, mailDeUsuarioDB, titulo, detalle, urgencia, fechaCreacion, fechaParaOrdenarlas, fechaCierre, ultimaEdicion, estado, quiereNotificacion);
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
                estado: nuevaCard.estado,
                quiereNotificacion: quiereNotificacion
              });

              // Asignar el ID generado por Firestore a la tarjeta
              nuevaCard.asignarId(docRef.id);



                    if(quiereNotificacion){
                      llamarProgramarNotificacion(fechaSeleccionadaConFormato, titulo, detalle, check08.checked, check14.checked, check21.checked, nombreDeUsuarioDB, mailDeUsuarioDB, fecha, nuevaCard.id);
                    }



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
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al cargar",
                showConfirmButton: false,
                timer: 1000,
                footer: "Por favor actualizar página"
              });
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

        // Verificar si el clic ocurrió en un botón de restaurar
      else if (event.target.id.startsWith("restaurar-")) {
        // Extraer el ID de la tarea de la identificación del botón
        restaurarTarea(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón de finalizar
      else if (event.target.id.startsWith("modal-finalizar-")) {
        // Extraer el ID de la tarea de la identificación del botón
        finalizarTarea(event.target.id.split("-")[2]);
      }

      // Verificar si el clic ocurrió en un botón de cancelar
      else if (event.target.id.startsWith("cancelar-")) {
        // Extraer el ID de la tarea de la identificación del botón
        cancelarTarea(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón de opciones
      else if (event.target.id.startsWith("opciones-")) {
        // Extraer el ID de la tarea de la identificación del botón
        masOpciones(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón de eliminar
      else if (event.target.id.startsWith("eliminar-")) {
        // Extraer el ID de la tarea de la identificación del botón
        eliminar(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón de campanita
      else if (event.target.id.startsWith("bell-")) {
        // Extraer el ID de la tarea de la identificación del botón
        mostrarSiTieneNotificaciones(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón de agregar notificación a card existente
      else if (event.target.id.startsWith("agregarNoti-")) {
        // Extraer el ID de la tarea de la identificación del botón
        agregarNotificacionACardExistente(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón cerrar el modal para ver notificaciones existentes
      else if (event.target.id.startsWith("salirDeModalNoti-")) {
        // Extraer el ID de la tarea de la identificación del botón
        cerrarModalConNotificacionesExistentes(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón eliminar notificación existente
      else if (event.target.id.startsWith("eliminarNoti-")) {
        // Extraer el ID de la tarea de la identificación del botón
        eliminarNotificaconExistente(event.target.id.split("-")[1]);
      }

      // Verificar si el clic ocurrió en un botón agregar notificación a card existente
      else if (event.target.id.startsWith("agregarNotificacionEnCardExistente-")) {
        // Extraer el ID de la tarea de la identificación del botón
        confirmarNotificacionAgregadaACardExistente(event.target.id.split("-")[1]);
      }

      else if (event.target.id.startsWith("botonEditarNotaRapida-")) {
        // Extraer el ID de la tarea de la identificación del botón
        editarNotaRapida(event.target.id.split("-")[1]);
      } 

      else if (event.target.id.startsWith("botonEliminarNotaRapida")) {
        // Extraer el ID de la tarea de la identificación del botón
        eliminarNotaRapida(event.target.id.split("-")[1]);
      } 
  });
}








// Función que renderiza las cards, dependiendo su estado y su urgencia
function agregarCardAlContenedor(tarea) {
  // Genera un ID único para el div (card) basado en el ID de la tarea
  let cardID = `card-${tarea.id}`;
  let botonFinalizarID = `finalizar-${tarea.id}`;
  let botonMasOpcionesID = `opciones-${tarea.id}`;
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
      <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
      <p>FIN: <br> ${tarea.fechaCierre}</p>
      <p>SECCIÓN: <br> ${tarea.seccion}</p>
      <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
    </div>
  `;
    finalizadasCards.innerHTML += nuevaCardHTML;
  } else if (tarea.estado === "Canceladas") {
    let nuevaCardHTML = `
    <div id="${cardID}" class="cards">
      <h3>${tarea.titulo}</h3>
      <p class="p_detalle">${textoCortado}</p>
      <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
      <p>FIN: <br> ${tarea.fechaCierre}</p>
      <p>SECCIÓN: <br> ${tarea.seccion}</p>
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
    let botonBellID = `bell-${tarea.id}`;
  
    let nuevaCardHTML = `
    <div id="${cardModalID}" class="cards_modal">
    <h1 class="h3_modal" id="${tituloID}">${tarea.titulo}</h1>
    <p class="detalle_modal" id="${detalleID}">${tarea.detalle}</p>
        <div class="div_modales">
        <strong>URGENCIA: </strong>
        <p class="urgencia_editar" id="${urgenciaID}">${tarea.urgencia}</p>
        </div>
        <div class="div_modales">
        <strong>SECCIÓN: </strong>
        <p class="seccion_editar" id="${seccionID}">${tarea.seccion?tarea.seccion:"Otras"}</p>
        </div>
        <div class="div_modales">
        <strong>CREACIÓN: </strong>
        <p> ${tarea.fechaCreacion}</p>
        </div>
        <div class="div_modales">
        <strong>ÚLTIMA EDICIÓN: </strong>
        <p>${tarea.ultimaEdicion}</p>
        </div>
        <div class="div_modales">
        <strong>FIN: </strong>
        <p> ${tarea.fechaCierre}</p>
        </div>
  </div>
    `;

    if (tarea.estado === "Pendientes") {
      nuevaCardHTML = `
    <div id="${cardModalID}" class="cards_modal">
    <h1 class="h3_modal" id="${tituloID}">${tarea.titulo}</h1>
    <p class="detalle_modal" id="${detalleID}">${tarea.detalle}</p>

        <div class="div_modales">
        <strong>URGENCIA: </strong>
        <p class="urgencia_editar" id="${urgenciaID}">${tarea.urgencia}</p>
        </div>
        <div class="div_modales">
        <strong>SECCIÓN: </strong>
        <p class="seccion_editar" id="${seccionID}">${tarea.seccion?tarea.seccion:"Otras"}</p>
        </div>
        <div class="div_modales">
        <strong>CREACIÓN: </strong>
        <p> ${tarea.fechaCreacion}</p>
        </div>
        <div class="div_modales">
        <strong>ÚLTIMA EDICIÓN: </strong>
        <p>${tarea.ultimaEdicion}</p>
        </div>
  </div>
    `;
    } else {
      nuevaCardHTML = `
    <div id="${cardModalID}" class="cards_modal">
    <h1 class="h3_modal" id="${tituloID}">${tarea.titulo}</h1>
    <p class="detalle_modal" id="${detalleID}">${tarea.detalle}</p>
        <div class="div_modales">
        <strong>URGENCIA: </strong>
        <p class="urgencia_editar" id="${urgenciaID}">${tarea.urgencia}</p>
        </div>
        <div class="div_modales">
        <strong>SECCIÓN: </strong>
        <p class="seccion_editar" id="${seccionID}">${tarea.seccion?tarea.seccion:"Otras"}</p>
        </div>
        <div class="div_modales">
        <strong>CREACIÓN: </strong>
        <p> ${tarea.fechaCreacion}</p>
        </div>
        <div class="div_modales">
        <strong>FIN: </strong>
        <p> ${tarea.fechaCierre}</p>
        </div>
  </div>
    `;
    }

modalCard.innerHTML = nuevaCardHTML;
modalFooter.innerHTML="";

if (tarea.estado === "Pendientes") {
  let botonesCard = `
  <button id="${botonEditarID}" class="btn botonesCards_modal" >Editar</button>
  <button id="${botonBellID}" class="button-campana-modal">${svgBell}</button>
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










// Funcion del boton de la campanita, para ver si esa tarea tiene notificaciones
async function mostrarSiTieneNotificaciones (id) {
  mostrarCarga();

  let tarea = unaCard.find((t) => t.id === id);

  let botonEditarID = document.getElementById(`editar-${tarea.id}`);
  let botonFinalizarID = document.getElementById(`modal-finalizar-${tarea.id}`);
  let botonCancelarID = document.getElementById(`cancelar-${tarea.id}`);
  let botonEliminarID = document.getElementById(`eliminar-${tarea.id}`);
  let botonBellID = document.getElementById(`bell-${tarea.id}`);

  let modalDeNotificacionID = `modalNotificacion-${tarea.id}`;
  let botonAgregarNotificacionID = `agregarNoti-${tarea.id}`;
  let botonSalirDeNotificacionID = `salirDeModalNoti-${tarea.id}`;
  let notificacionesExistentesID = `notificacionesExistentes-${tarea.id}`;






  if(tarea.quiereNotificacion){


    botonEditarID.disabled = true; 
    botonFinalizarID.disabled = true;
    botonCancelarID.disabled = true;
    botonEliminarID.disabled = true;
    botonBellID.disabled = true;

    modalParaNotificacion = document.createElement("div");
    modalParaNotificacion.innerHTML = `
    <div class="modalDeNotificacion" id="${modalDeNotificacionID}">

        <h1 class="h1-modal-notificaciones"> Notificaciones programadas: </h1>
  
        <div id="${notificacionesExistentesID}">
              <!-- Aquí se mostrarán las notificaciones -->
        </div>

        <div class="botones-modal-notificacion">
          <button id="${botonAgregarNotificacionID}" >Agregar</button>
          <button id="${botonSalirDeNotificacionID}" >Cerrar</button>
        </div>
    </div>
    `;

    modalCard.appendChild(modalParaNotificacion)

    await obtenerColeccionDeFirestore("notificaciones08hs", "notificaciones14hs", "notificaciones21hs", tarea.id, notificacionesExistentesID);


  } else if(tarea.quiereNotificacion === undefined){
      console.log("Entra al else if, porque es undefinded")
      await agregarNuevoCampoADoc(nombreDeColeccion, id, true);
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Al ser una tarea vieja, se recargará la página para que puedas agregar notificaciones",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        location.reload();
      }, 1500);
  } else {

    botonEditarID.disabled = true; 
    botonFinalizarID.disabled = true;
    botonCancelarID.disabled = true;
    botonEliminarID.disabled = true;
    botonBellID.disabled = true;

    modalParaNotificacion = document.createElement("div");
    modalParaNotificacion.innerHTML = `
    <div class="modalDeNotificacion" id="${modalDeNotificacionID}">
      <div>
      <h1 class="h1-modal-notificaciones"> No tiene notificacines programadas </h1>
      </div>
      <div class="botones-modal-notificacion">
        <button id="${botonAgregarNotificacionID}" >Agregar</button>
        <button id="${botonSalirDeNotificacionID}" >Cerrar</button>
      </div>
    </div>
    `;
    modalCard.appendChild(modalParaNotificacion)
  }
  ocultarCarga();
}









// Función para agregar una notificación a una tarea pendiente existente
function agregarNotificacionACardExistente (id) {
  let tarea = unaCard.find((t) => t.id === id);

  let botonSalirDeNotificacionID = `salirDeModalNoti-${tarea.id}`;
  let botonAgregarNotificacionEnCardExistenteID = `agregarNotificacionEnCardExistente-${tarea.id}`;



  modalParaNotificacion.remove();

    modalParaAgregarNotificacionACardExistente = document.createElement("div");
    modalParaAgregarNotificacionACardExistente.innerHTML = `    
    <div class="modalDeNotificacion">
    <section class="container">
    <form class="row">
      <div class="col-5">
        <div class="input-group date" id="datepicker2">
          <input readonly type="text" class="form-control" id="date2" />
          <span class="input-group-append">
            <span class="input-group-text bg-light d-block " id="icono-calendar">
              <i class="fa fa-calendar"></i>
            </span>
          </span>
        </div>
      </div>
    </form>

    <div class="div-de-divs-horarios">
        <div class="div-de-checkbox">
        <input type="checkbox" name="" id="check-08a">
        <label for="horario">08:00hs</label>
      </div>

      <div class="div-de-checkbox">
        <input type="checkbox" name="" id="check-14a">
        <label for="horario">14:00hs</label>
      </div>

      <div class="div-de-checkbox">
        <input type="checkbox" name="" id="check-21a">
        <label for="horario">21:00hs</label>
      </div>
    </div>

    </section>

    <div class="botones-modal-notificacion">

    <button id="${botonAgregarNotificacionEnCardExistenteID}" >Aceptar</button>
    <button id="${botonSalirDeNotificacionID}" >Cerrar</button>

    </div>

  </div>
    `
    modalCard.appendChild(modalParaAgregarNotificacionACardExistente);

    $(function(){
      $('#datepicker2').datepicker({
          startDate: new Date(), 
          format: 'dd-mm-yyyy',
          orientation: 'bottom',
          autoclose: true,
          todayHighlight: true,
          language: 'es'
      });
    });


    check08a = document.getElementById("check-08a");
    check14a = document.getElementById("check-14a");
    check21a = document.getElementById("check-21a");
}







// Carga de nueva notificación en la DB
function confirmarNotificacionAgregadaACardExistente (id){
  let tarea = unaCard.find((t) => t.id === id);
  let fecha2 = new Date ();
  let fechaActual = new Date().toLocaleDateString();
  let horaActual = new Date().toLocaleTimeString([], {hour: '2-digit'});
  let fechaSeleccionadaPorUsuario = document.getElementById("date2").value

  let fechaSeleccionadaParticionada2 = fechaSeleccionadaPorUsuario.split('-'); // Dividir la cadena por el guion
  let fechaSeleccionadaConFormato2 = new Date(fechaSeleccionadaParticionada2[2], fechaSeleccionadaParticionada2[1] - 1, fechaSeleccionadaParticionada2[0]).toLocaleDateString();


if(!fechaSeleccionadaPorUsuario){

  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Seleccione alguna fecha",
    showConfirmButton: false,
    timer: 1000,
  });
  return;
}

if(!check08a.checked && !check14a.checked && !check21a.checked){

  Swal.fire({
    position: "center",
    icon: "warning",
    title: "Seleccione algún horario",
    showConfirmButton: false,
    timer: 1000,
  });
  return;
}

if (fechaActual === fechaSeleccionadaConFormato2) {


    if (horaActual >= 8 && check08a.checked) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Seleccionaste un horario que ya pasó",
        showConfirmButton: false,
        timer: 1000,
      });
    check08a.checked = false
    return;
    }



    if (horaActual >= 14 && check14a.checked) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Seleccionaste un horario que ya pasó",
        showConfirmButton: false,
        timer: 1000,
      });
      check14a.checked = false
      return;
      }


    if (horaActual >= 21 && check21a.checked) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Seleccionaste un horario que ya pasó",
        showConfirmButton: false,
        timer: 1000,
      });
      check21a.checked = false
      return;
    }


  } 

    llamarProgramarNotificacion(fechaSeleccionadaConFormato2, tarea.titulo, tarea.detalle, check08a.checked, check14a.checked, check21a.checked, nombreDeUsuarioDB, mailDeUsuarioDB, fecha2, tarea.id);
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Notificaciones actualizadas!",
      showConfirmButton: false,
      timer: 1000,
    });
    agregarNuevoCampoADoc(nombreDeColeccion, id, true);
    cerrarModalConNotificacionesExistentes(id);
    mostrarSiTieneNotificaciones(id)
    
    if(!tarea.quiereNotificacion)
    setTimeout(() => {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Para que esta notificación se guarde, necesitamos actualizar la página",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        location.reload();
      }, 1200);

    }, 1000);
}











// Función para cerrar modal que muestra notificaciones de una tarea pendiente existente
function cerrarModalConNotificacionesExistentes(id){
  let tarea = unaCard.find((t) => t.id === id);

  if (modalParaNotificacion) {
      modalParaNotificacion.remove();
  }

  if (  modalParaAgregarNotificacionACardExistente) {
      modalParaAgregarNotificacionACardExistente.remove();
  }


  let botonEditarID = document.getElementById(`editar-${tarea.id}`);
  let botonFinalizarID = document.getElementById(`modal-finalizar-${tarea.id}`);
  let botonCancelarID = document.getElementById(`cancelar-${tarea.id}`);
  let botonEliminarID = document.getElementById(`eliminar-${tarea.id}`);
  let botonBellID = document.getElementById(`bell-${tarea.id}`);


  botonEditarID.disabled = false; 
  botonFinalizarID.disabled = false;
  botonCancelarID.disabled = false;
  botonEliminarID.disabled = false;
  botonBellID.disabled = false;
}









// Función para eliminar una notificación a una tarea pendiente existente
async function eliminarNotificaconExistente(id){

  let botonXparaEliminar = document.getElementById(`eliminarNoti-${id}`)

  let contenedor = document.getElementById(`notificacionesExistentes-${botonXparaEliminar.dataset.id}`);
  let cartelCarga = document.createElement("p");
  cartelCarga.innerText = "En proceso...";
  contenedor.innerHTML = "";
  contenedor.appendChild(cartelCarga);

    const querySnapshot1 = await getDocs(collection(db, "notificaciones08hs"));
    const querySnapshot2 = await getDocs(collection(db, "notificaciones14hs"));
    const querySnapshot3 = await getDocs(collection(db, "notificaciones21hs"));



    let idDeNotificacionParaEliminar
    let coleccionDeNotificacionParaEliminar

    querySnapshot1.forEach((doc) => {
      if (id === doc.id) {
        idDeNotificacionParaEliminar = id;
        coleccionDeNotificacionParaEliminar = "notificaciones08hs";
      }
    })

    querySnapshot2.forEach((doc) => {
      if (id === doc.id) {
        idDeNotificacionParaEliminar = id;
        coleccionDeNotificacionParaEliminar = "notificaciones14hs";
      }
    })

    querySnapshot3.forEach((doc) => {
      if (id === doc.id) {
        idDeNotificacionParaEliminar = id;
        coleccionDeNotificacionParaEliminar = "notificaciones21hs";
      }
    })

  if (idDeNotificacionParaEliminar) {
    Swal.fire({
      title: "¿Eliminar notificación programada?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, coleccionDeNotificacionParaEliminar, idDeNotificacionParaEliminar));
        Swal.fire({
          title: "Notificación eliminada!",
          timer: 1000,
          showConfirmButton: false,
          icon: "success"
        });
        cartelCarga.remove();
      }

      setTimeout(() => {
        cerrarModalConNotificacionesExistentes(botonXparaEliminar.dataset.id);
        mostrarSiTieneNotificaciones(botonXparaEliminar.dataset.id);
      }, 300);

    }); 
  } else {
    Swal.fire({
      title: "Ocurrió algún error, actualice la página por favor",
      timer: 1200,
      showConfirmButton: false,
      icon: "error"
    });
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
        timer: 2000,
        showConfirmButton: false,
        icon: "success"
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
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
        timer: 2000,
        showConfirmButton: false,
        icon: "success"
      });
      setTimeout(() => {
        location.reload();
      }, 2000);
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
          timer: 2000,
          showConfirmButton: false,
          icon: "success"
        });
        setTimeout(() => {
          location.reload();
        }, 2000);
  
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
        timer: 2000,
        showConfirmButton: false,
        icon: "success"
      });
      setTimeout(() => {
        location.reload();
      }, 2000);

    }
  });
} else {
  Swal.fire({
    title: "Tarea inexistente o modificada. Cierre la ventana",
    timer: 1000,
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
  let botonBellID = document.getElementById(`bell-${tarea.id}`);



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
    botonBellID.disabled = false;
 


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
    botonBellID.disabled = true;


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









// Función para ir a la sección de notas rápidas
function modalNotasRapidas () {

  let fondoHTML = document.getElementsByTagName("html")[0];
  let fondoBODY = document.getElementsByTagName("body")[0];

  fondoHTML.classList.add("fondo-html");
  fondoBODY.classList.add("fondo-html");
  botonMenuSecciones.classList.add("aplicar-display-none");
  menuSuperior.classList.add("aplicar-display-none");
  canceladasCards.classList.add("aplicar-display-none");
  finalizadasCards.classList.add("aplicar-display-none");
  pendientesCards.classList.add("aplicar-display-none");
  botonMas.classList.add("aplicar-display-none");

  desplegarFormularioDeNotaRapida.classList.remove("aplicar-display-none");
  obtenerNotasDesdeFirestore();
}









// Función para formulario de nueva nota rápida
function desplegarFormularioNotaRapida() {
  cardNotaRapida.classList.toggle("aplicar-display-none");

  setTimeout(() => {
  tituloNotaRapidaInput.focus();
  }, 800);
}







// Recoger datos de la nueva nota rápida para guardarlos
async function guardarNuevaNotaRapida(event) {
  mostrarCarga();
  event.preventDefault();
  let fechaCreacion = new Date();
  let formatoFechaCreacion = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  let titulo = tituloNotaRapidaInput.value;
  let detalle = detalleNotaRapidaInput.value;
  let fechaCreacionConFormato = fechaCreacion.toLocaleTimeString('es-AR', formatoFechaCreacion);
  let notaRapidaBandera = true;



  if (!titulo || !detalle ) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Se deben completar todos los campos",
                showConfirmButton: false,
                timer: 1000,
              });
              ocultarCarga();
              return;
  }  else {
            let nuevaNotaRapida = new NotasRapidas(notaRapidaBandera, titulo, detalle, fechaCreacion, fechaCreacionConFormato);
            notasRapidasArray.push(nuevaNotaRapida);

            try {
              let docRef = await addDoc(collection(db, nombreDeColeccion), {
                notaRapidaBandera: nuevaNotaRapida.notaRapidaBandera,
                titulo: nuevaNotaRapida.titulo,
                detalle: nuevaNotaRapida.detalle,
                fechaCreacion: nuevaNotaRapida.fechaCreacion,
                fechaCreacionConFormato: nuevaNotaRapida.fechaCreacionConFormato,
              });

              // Asignar el ID generado por Firestore a la tarjeta
              nuevaNotaRapida.asignarId(docRef.id);



                  Swal.fire({
                      title: "Nota rápida agregada!",
                      timer: 1200,
                      showConfirmButton: false,
                      icon: "success"
                  });

                  tituloNotaRapidaInput.value = "";
                  detalleNotaRapidaInput.value = "";

                  obtenerNotasDesdeFirestore();
                  desplegarFormularioNotaRapida()

            } catch (error) {
              console.error("Error al agregar la tarea a Firestore", error);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Error al cargar",
                showConfirmButton: false,
                timer: 1000,
                footer: "Por favor actualizar página"
              });
              ocultarCarga();
            }
            ocultarCarga();

          }
      ocultarCarga();
}





function renderizarNotaRapida(nota){
  // console.log(tarea.id)
  let tarea = notasRapidasArray.find((t) => t.id === nota.id);
  
  let tituloCardNotaRapidaID = `tituloNotaRapida-${tarea.id}`;
  let detalleCardNotaRapidaID = `detalleNotaRapida-${tarea.id}`;
  let botonEditarCardNotaRapidaID = `botonEditarNotaRapida-${tarea.id}`;
  let botonEliminarCardNotaRapidaID = `botonEliminarNotaRapida-${tarea.id}`;


  let nuevaCardNotaRapida = `
  <div class="div-cards-notas-rapidas " id="cards-notas-rapidas">
      <img class="img-gancho-card-nota-rapida" src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20fill='currentColor'%20class='bi%20bi-pin-angle-fill'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M9.828.722a.5.5%200%200%201%20.354.146l4.95%204.95a.5.5%200%200%201%200%20.707c-.48.48-1.072.588-1.503.588-.177%200-.335-.018-.46-.039l-3.134%203.134a6%206%200%200%201%20.16%201.013c.046.702-.032%201.687-.72%202.375a.5.5%200%200%201-.707%200l-2.829-2.828-3.182%203.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5%200%200%201%200-.707c.688-.688%201.673-.767%202.375-.72a6%206%200%200%201%201.013.16l3.134-3.133a3%203%200%200%201-.04-.461c0-.43.108-1.022.589-1.503a.5.5%200%200%201%20.353-.146'/%3e%3c/svg%3e" alt="img-chincheta">
        <h1 class="h1-card-notas-rapidas" id="${tituloCardNotaRapidaID}">
            ${tarea.titulo}
        </h1>
          <p class="p-card-detalle-nota-rapida" id="${detalleCardNotaRapidaID}">
          ${tarea.detalle}
          </p>
      <div class="btn-eliminar-editar-notas-rapidas">
        <button class="btn-editar-nota-rapida" id="${botonEditarCardNotaRapidaID}">EDITAR</button>
        <button class="btn-eliminar-nota-rapida" id="${botonEliminarCardNotaRapidaID}">ELIMIMNAR</button>
      </div>
</div>
  `

  seccionParaRenderizarNotas.innerHTML += nuevaCardNotaRapida;
}





// Función para obtener las NOTAS RÁPIDAS desde Firestore
async function obtenerNotasDesdeFirestore() {
  mostrarCarga();
  // Limpiar el array de cards antes de obtener las nuevas desde Firestore
  notasRapidasArray = [];
  seccionParaRenderizarNotas.innerHTML = "";

  // Obtener todas las tareas desde Firestore
  const querySnapshot = await getDocs(collection(db, nombreDeColeccion));

  // Iterar sobre las tareas y agregarlas al array y al contenedor
  querySnapshot.forEach((doc) => {
    const tarjetaFirestore = doc.data();


    if (tarjetaFirestore.notaRapidaBandera) {
      const tarjetaNotaFirestore = doc.data();
      tarjetaNotaFirestore.id = doc.id;
      notasRapidasArray.push(tarjetaNotaFirestore);
    }
  });

  // Ordenar las tarjetas cronológicamente
  notasRapidasArray.sort((b, a) => a.fechaCreacion - b.fechaCreacion);
  
  // Iterar sobre las tarjetas ordenadas y agregarlas al contenedor
  notasRapidasArray.forEach(nota => {
    renderizarNotaRapida(nota);
  });
  ocultarCarga();
}






// Función para editar una nota rápida
async function editarNotaRapida (id) {

  let tareaRef = doc(db, nombreDeColeccion, id);

  let inputH1ParaEditar = document.getElementById(`tituloNotaRapida-${id}`);
  let inputDetalleParaEditar = document.getElementById(`detalleNotaRapida-${id}`);

  let botonEditarNota = document.getElementById(`botonEditarNotaRapida-${id}`);
  let botonEliminarNota = document.getElementById(`botonEliminarNotaRapida-${id}`);

  let verSiGuardoOEdito = botonEditarNota.textContent === "EDITAR";

  if(verSiGuardoOEdito){
    // Si entra acá es porque puso EDITAR

    inputH1ParaEditar.contentEditable = true;
    inputDetalleParaEditar.contentEditable = true;

    inputH1ParaEditar.classList.add("editando-inputs");
    inputDetalleParaEditar.classList.add("editando-inputs");

    botonEditarNota.textContent = "GUARDAR";

  } else {
    mostrarCarga();
    // Si entra acá es porque puso GUARDAR
    let nuevoTitulo = inputH1ParaEditar.textContent.trim();
    let nuevoDetalle = inputDetalleParaEditar.textContent.trim();

    inputH1ParaEditar.contentEditable = false;
    inputDetalleParaEditar.contentEditable = false;

    inputH1ParaEditar.classList.remove("editando-inputs");
    inputDetalleParaEditar.classList.remove("editando-inputs");

    botonEditarNota.textContent = "EDITAR";

        // Realizar la actualización en Firestore
        try {
          await updateDoc(tareaRef, {
            titulo: nuevoTitulo,
            detalle: nuevoDetalle,
          });
          Swal.fire({
            title: "Nota modificada!",
            timer: 800,
            showConfirmButton: false,
            icon: "success"
          });
          ocultarCarga();
        } catch (error) {
          Swal.fire({
            title: "Ocurrió un error. Revise su conexión",
            timer: 1200,
            showConfirmButton: false,
            icon: "error"
          });
          console.error("Error al actualizar el documento en Firestore", error);
          ocultarCarga();
        }
  }
}






// Función para eliminar nota rápida
async function eliminarNotaRapida (id) {

 if (id) {
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
      deleteDoc(doc(db, nombreDeColeccion, id));
      Swal.fire({
        title: "Nota rápida eliminada!",
        timer: 1200,
        showConfirmButton: false,
        icon: "success"
      });
      ocultarCarga();
      setTimeout(() => {
      obtenerNotasDesdeFirestore();
        
      }, 1000);

    }
  }); 
 } else {
  Swal.fire({
    title: "Nota inexistente o modificada. Actualice página",
    timer: 1500,
    showConfirmButton: false,
    icon: "error"
  });
  ocultarCarga();
 }
}