// Importa la función de Firestore para agregar documentos ↓
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db, registrarUsuario, iniciarSesion, recuperarClave, cerrarSesion, auth, eliminarCuenta } from './firestoreConfig';
import { reload, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

// Menu ↓
let botonMas = document.getElementById("botonMas_id");
let menu = document.getElementById("id_menu");
let filtroParaMenuBorroso = document.getElementById("botonMas_id");

// Formulario ↓
let formulario = document.getElementById("section_formulario_id");
let botonAgregarTarea = document.getElementById("boton_agregarTarea_id");

// Asigno eventos click al boton del formulario ↓
botonAgregarTarea.addEventListener("click", agregarTarea);

// Modal de cargando ↓
const modalCarga = document.getElementById('modalCarga');

// Array para ir guardando las cards ↓
let unaCard = [];

// Definir que se muestra en pantalla con los botones del menú ↓
let mostrarTodas = document.getElementById("id_todas");
let mostrarPendientes = document.getElementById("id_pendientes");
let mostrarFinalizadas = document.getElementById("id_finalizadas");
let mostrarCanceladas = document.getElementById("id_canceladas");
let muestraPantalla = "Todas";
let pantallaActual = "Todas";

// Asigno eventos click a los botones del menú ↓
botonMas.addEventListener("click", mostrarFormulario);
mostrarTodas.addEventListener("click", () => {muestraPantalla="Todas", cardsEnPantalla(muestraPantalla)});
mostrarPendientes.addEventListener("click", () => {muestraPantalla="Pendientes", cardsEnPantalla(muestraPantalla)});
mostrarFinalizadas.addEventListener("click", () => {muestraPantalla="Finalizadas", cardsEnPantalla(muestraPantalla)});
mostrarCanceladas.addEventListener("click", () => {muestraPantalla="Canceladas", cardsEnPantalla(muestraPantalla)});

// Secciones de las cards ↓
let todasCards = document.getElementById("todas-cards");
let pendientesCards = document.getElementById("pendientes-cards");
let finalizadasCards = document.getElementById("finalizadas-cards");
let canceladasCards = document.getElementById("canceladas-cards");

//Ventana modal de cards grandes ↓
let modalCard = document.getElementById("cardEnModal");
let modalFooter = document.getElementById("modal_footerID");

// Modal de registro estética ↓
let modalRegistrarse = document.getElementById("modalRegistro");
let botonCancelar = document.getElementById("cancelar_modal");
botonCancelar.addEventListener("click",ocultarModalRegistro);
let botonRegistrarme = document.getElementById("boton_registrarse");
botonRegistrarme.addEventListener("click",mostrarModalRegistro);

// Registro o crear cuenta ↓
let botonIngresarCuentaExistente = document.getElementById("botonIngresarCuentaExistente");
botonIngresarCuentaExistente.addEventListener("click", datosDeIngreso);
let botonRegistrarNuevaCuenta = document.getElementById("botonRegistrarNuevaCuenta");
botonRegistrarNuevaCuenta.addEventListener("click",datosDeRegistro);
let botonOlvideClave = document.getElementById("olvide_clave")
botonOlvideClave.addEventListener("click", olvideClave);

// Datos para guardar en la db ↓
let nombreDeUsuarioDB = "";
let mailDeUsuarioDB = "";
let nombreDeColeccion = "";

// Boton salir ↓
let pantallaInicioSesion = document.getElementById("formInicioSesion");
let botonSalir = document.getElementById("boton_salir")
// botonSalir.addEventListener("click",salir)

// Navbar ↓
let navbar_general = document.getElementById("navbar_general");
let nombreUsuarioIniciado = document.getElementById("offcanvasNavbarLabel");
let salir_navbar =  document.getElementById("navbar_salir");
let boton_cambiar_nombre = document.getElementById("button_cambiar_nombre");
let boton_eliminar_cuenta = document.getElementById("button_eliminar_cuenta");
boton_eliminar_cuenta.addEventListener("click", elimnarLaCuenta);
salir_navbar.addEventListener("click", salir);
boton_cambiar_nombre.addEventListener("click", cambiarNombre);



corroborarSesionIniciada();

async function corroborarSesionIniciada (){
  auth.onAuthStateChanged(async (usuario) => {
    if (usuario) {
      // Hay una sesión iniciada

      pantallaInicioSesion.classList.add("ocultarRegistroModal");
      navbar_general.classList.remove("ocultarRegistroModal")
      console.log('El usuario está autenticado:', usuario.displayName);
      let nombreDeLaColeccion = await asignarNombreAColeccion (usuario.uid);
      let nombreDeUsuario = await asignarNombreDeUsuarioDB (usuario.displayName);
      let mailDeUsuario = await asignarMailDeUsuarioDB (usuario.email);
      nombreDeUsuarioDB=nombreDeUsuario;
      mailDeUsuarioDB=mailDeUsuario;
      nombreDeColeccion = nombreDeLaColeccion;
      nombreUsuarioIniciado.innerHTML= usuario.displayName ;
      cardsEnPantalla(pantallaActual);
    } else {
      // No hay una sesión iniciada
      console.log('No hay usuario autenticado');
    }
  });
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





// cardsEnPantalla(pantallaActual);

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

      pantallaInicioSesion.classList.remove("ocultarRegistroModal")
      navbar_general.classList.add("ocultarRegistroModal");
      const sesionCerrada =   cerrarSesion();
      Swal.fire({
        title: "Sesión cerrada",
        timer: 1000,
        icon: "success"
      });
    }
  }); 
}




async function datosDeIngreso(event){
  event.preventDefault();
  let mailIngresado = document.getElementById("mailInicio").value;
  let contraseñaIngresada = document.getElementById("contraseñaInicio").value;
  await  iniciarSesion(mailIngresado,contraseñaIngresada);
  auth.onAuthStateChanged(async (usuario) => {
  if (usuario && usuario.displayName) {
    // navBar_desplegable.classList.remove("show");
    // navBar_desplegable.classList.add("ocultarRegistroModal");
    pantallaInicioSesion.classList.add("ocultarRegistroModal");
      Swal.fire({
      position: "center",
      icon: "success",
      title: "¡Hola " + usuario.displayName + "!",
      showConfirmButton: false,
      timer: 1200,
      customClass: {
        popup: 'cartel-bienvenida-popup',
        div: 'cartel-bienvenida-container',
      },
    });
  } 
  setTimeout(() => {
    // location.reload();
  }, 1000);
});
}




async function datosDeRegistro(event){
  event.preventDefault();
  let nombreRegistro = document.getElementById("nombreRegistro").value;
  let mailIngresado = document.getElementById("MailRegistro").value;
  let contraseñaIngresada1 = document.getElementById("ContraseñaRegistro1").value;
  let contraseñaIngresada2 = document.getElementById("ContraseñaRegistro2").value;

  if (contraseñaIngresada1 === contraseñaIngresada2) {
    if (contraseñaIngresada1.length < 6 ) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "La clave debe tener al menos 6 dígitos",
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: 'cartel-bienvenida-popup',
          div: 'cartel-bienvenida-container',
        },
      });
      return;
    }
    const registro = await registrarUsuario(nombreRegistro, mailIngresado, contraseñaIngresada1);
    if (registro === "ok") {
        Swal.fire({
        position: "center",
        icon: "success",
        title: "Usuario creado!",
        showConfirmButton: false,
        timer: 1200,
        customClass: {
          popup: 'cartel-bienvenida-popup',
          div: 'cartel-bienvenida-container',
        },
      });
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Las claves no coinciden",
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: 'cartel-bienvenida-popup',
        div: 'cartel-bienvenida-container',
      },
    });
  }
  
}




async function olvideClave(event){
  console.log("1")
  event.preventDefault();
  console.log("2");
  const { value: mailIngresadoPorCliente } = await Swal.fire({
    title: "Ingrese dirección de mail para recibir link de reestablecimiento:",
    input: "email",
    inputPlaceholder: "ejemplo@ejemplo.com",
    allowOutsideClick: false,
    position: 'top',
    customClass: {
            popup: 'sweetAlert-recupero-divdiv',
            div: 'sweetAlert-recupero-div',
            input: 'sweetAlert-recupero-input',
            inputPlaceholder: 'sweetAlert-recupero-input-placeholder',
            inputValue: 'sweetAlert-recupero-input-value',
            label: 'sweetAlert-recupero-label',
            title: 'sweetAlert-recupero-titulo',
            content: 'sweetAlert-recupero-contenido',
            confirmButton: 'sweetAlert-recupero-boton',
            cancelButton: 'sweetAlert-recupero-boton',
          },
  });
  console.log("3");
  if (mailIngresadoPorCliente) {
    console.log("4");
      let mailIngresadoPorClienteSinEspacios = mailIngresadoPorCliente.trim();
      recuperarClave(mailIngresadoPorClienteSinEspacios);
      setTimeout(() => {
          Swal.fire({
            title: "Mail enviado",
            timer: 1200,
            icon: "success"
          });
      }, 1000);
  }
}




async function elimnarLaCuenta(){
  Swal.fire({
    title: "Borrarás la cuenta y sus tareas de manera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarCarga();
      eliminarCuenta();
      Swal.fire({
        title: "Cuenta eliminada!",
        timer: 1500,
        icon: "success"
      });
      setTimeout(() => {
        location.reload();
      }, 1200);
    }
  }); 
}







// Mostrar y ocultar el modal del registro
function ocultarModalRegistro(){
  modalRegistrarse.classList.add("ocultarRegistroModal")
}
function mostrarModalRegistro(){
  modalRegistrarse.classList.remove("ocultarRegistroModal")
}


async function cambiarNombre(){
  auth.onAuthStateChanged(async (usuario) => {
let nombreParaEditar = document.getElementById("offcanvasNavbarLabel");
let verSiGuardoOEditoNombre = boton_cambiar_nombre.textContent === "Cambiar nombre";
let nuevoNombre = "";

if(verSiGuardoOEditoNombre){
  nombreParaEditar.contentEditable = true;
  nombreParaEditar.focus();
  boton_cambiar_nombre.textContent="GUARDAR"
  nombreParaEditar.classList.add("bordeParaNombre");
  boton_cambiar_nombre.classList.add("guardar_red");
 } else {
  nombreParaEditar.contentEditable = false;
  boton_cambiar_nombre.textContent = "Cambiar nombre";
  nuevoNombre = nombreParaEditar.textContent;
  await updateProfile(usuario, { displayName: nuevoNombre });
  nombreParaEditar.classList.remove("bordeParaNombre");
  boton_cambiar_nombre.classList.remove("guardar_red");
  Swal.fire({
    title: "Nombre modificado",
    timer: 800,
    icon: "success"
  });
 }
 });
}






// Clase para generar cada card (tarea)
class Tarjetas {
  constructor(nombre, mail, titulo, detalle, urgencia, fechaCreacion, fechaCierre, ultimaEdicion, estado) {
    this.nombre = nombre;
    this.mail = mail;
    this.titulo = titulo;
    this.detalle = detalle;
    this.urgencia = urgencia;
    this.fechaCreacion = fechaCreacion;
    this.fechaCierre = fechaCierre;
    this.ultimaEdicion = ultimaEdicion;
    this.estado = estado;
    this.id = null; // Inicializamos el ID como nulo
  }

  asignarId(id) {
    this.id = id;
  }
}






// Defino que se va a ver en pantalla
async function cardsEnPantalla(loQueQuieroQueMuestre) {
  mostrarCarga();
switch (loQueQuieroQueMuestre) {
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







// Función para obtener las cards desde Firestore
async function obtenerCardsDesdeFirestore(estado) {
  // mostrarCarga();
// Limpiar el array de cards antes de obtener las nuevas desde Firestore
actualizarCards();
unaCard = [];

// Obtener todas las tareas desde Firestore
const querySnapshot = await getDocs(collection(db, nombreDeColeccion));

// Iterar sobre las tareas y agregarlas al array y al contenedor
querySnapshot.forEach((doc) => {
  const tarjetaFirestore = doc.data();
  if (tarjetaFirestore.estado === estado) {
    tarjetaFirestore.id = doc.id;
    unaCard.push(tarjetaFirestore);
  
    // Agregar la nueva card al contenedor correspondiente
    agregarCardAlContenedor(tarjetaFirestore);
  } else if (pantallaActual === "Todas"){
    tarjetaFirestore.id = doc.id;
    unaCard.push(tarjetaFirestore);
  
    // Agregar la nueva card al contenedor correspondiente
    agregarCardAlContenedor(tarjetaFirestore);
  }
// ocultarCarga();
});
}









// Mostrar el modal de carga
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

    menuBorroso ();
  } else {
    botonMas.textContent = "x";
    botonMas.classList.remove("botonMas_class");
    botonMas.classList.add("boton_x");

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

  tituloInput.value = "";
  detalleInput.value = "";
  urgenciaInput.value = "";
}




async function agregarTarea(event) {
  mostrarCarga();
  event.preventDefault();
  let fecha = new Date();
  let formatoFechaCreacion = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };

  let titulo = document.getElementById("tareaTitulo").value;
  let detalle = document.getElementById("tareaDetalle").value;
  let urgencia = document.getElementById("tareaUrgencia").value;
  let fechaCreacion = fecha.toLocaleTimeString('es-AR', formatoFechaCreacion);
  let fechaCierre = "-";
  let ultimaEdicion = fecha.toLocaleTimeString('es-AR', formatoFechaCreacion);
  let estado = "Pendientes";
  let nombre = nombreDeUsuarioDB;
  let mail = mailDeUsuarioDB;

  if (!titulo || !detalle || !urgencia || !fechaCreacion || !ultimaEdicion) {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Se deben completar todos los campos",
      showConfirmButton: false,
      timer: 1000,
      customClass: {
        popup: 'cartel-bienvenida-popup',
        div: 'cartel-bienvenida-container',
      },
    });
    ocultarCarga();
    return;
  } else {
    let nuevaCard = new Tarjetas(nombreDeUsuarioDB, mailDeUsuarioDB, titulo, detalle, urgencia, fechaCreacion, fechaCierre, ultimaEdicion, estado);
    unaCard.push(nuevaCard);

    try {
      let docRef = await addDoc(collection(db, nombreDeColeccion), {
        nombre: nuevaCard.nombre,
        mail: nuevaCard.mail,
        titulo: nuevaCard.titulo,
        detalle: nuevaCard.detalle,
        urgencia: nuevaCard.urgencia,
        fechaCreacion: nuevaCard.fechaCreacion,
        fechaCierre: nuevaCard.fechaCierre,
        ultimaEdicion: nuevaCard.ultimaEdicion,
        estado: nuevaCard.estado
      });

      // Asignar el ID generado por Firestore a la tarjeta
      nuevaCard.asignarId(docRef.id);
            // Agregar la nueva card al contenedor correspondiente
            agregarCardAlContenedor(nuevaCard);
            ocultarFormulario();
            vaciarCampos();
            menuBorroso();
            ocultarCarga();
            cardsEnPantalla("Pendientes");
          Swal.fire({
              title: "Tarea agregada!",
              timer: 1200,
              icon: "success"
          });
    } catch (error) {
      console.error("Error al agregar la tarea a Firestore", error);
      ocultarCarga();
    }
    ocultarCarga();

  }
}





  //Función para asignar los eventos a los botones de las cards ↓
function init() {
  // Asignar eventos a los botones
  document.addEventListener("click", (event) => {
      // Verificar si el clic ocurrió en un botón de editar
      if (event.target.id.startsWith("editar-")) {
          // Extraer el ID de la tarea de la identificación del botón
          botonParaEditar(event.target.id.split("-")[1]);
      } 
      // Verificar si el clic ocurrió en un botón de finalizar
      else if (event.target.id.startsWith("finalizar-")) {
          // Extraer el ID de la tarea de la identificación del botón
          finalizarTarea(event.target.id.split("-")[1]);
      } 
      // Verificar si el clic ocurrió en un botón de cancelar
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


init();


// Renderizo la card, dependiendo su estado
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
            <p>FIN: <br> ${tarea.fechaCierre}</p>
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
          <p>FIN: <br> ${tarea.fechaCierre}</p>
          <button id="${botonFinalizarID}" class="btn botonesCards" >Finalizar</button>
          <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Opciones</button>
        </div>
      `;
        pendientesCards.innerHTML += nuevaCardHTML;
        }
  } else if (tarea.estado === "Finalizadas") {
    let nuevaCardHTML = `
    <div id="${cardID}" class="cards">
      <h3>${tarea.titulo}</h3>
      <p class="p_detalle">${textoCortado}</p>
      <p>URGENCIA: <br> ${tarea.urgencia}</p>
      <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
      <p>FIN: <br> ${tarea.fechaCierre}</p>
      <button id="${botonEliminarID}" class="btn botonesCards" >Eliminar</button>
      <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Agrandar</button>
    </div>
  `;
    finalizadasCards.innerHTML += nuevaCardHTML;
  } else if (tarea.estado === "Canceladas") {
    let nuevaCardHTML = `
    <div id="${cardID}" class="cards">
      <h3>${tarea.titulo}</h3>
      <p class="p_detalle">${textoCortado}</p>
      <p>URGENCIA: <br> ${tarea.urgencia}</p>
      <p>CREACIÓN: <br> ${tarea.fechaCreacion}</p>
      <p>FIN: <br> ${tarea.fechaCierre}</p>
      <button id="${botonEliminarID}" class="btn botonesCards" >Eliminar</button>
      <button id="${botonMasOpcionesID}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn botonesCards" >Agrandar</button>
    </div>
  `;
    canceladasCards.innerHTML += nuevaCardHTML;
  }
}







function masOpciones(id){
  let tarea = unaCard.find((t) => t.id === id);


    // Genera un ID único para el div (card) basado en el ID de la tarea
    let cardID = `card-${tarea.id}`;
    let tituloID = `titulo-${tarea.id}`;
    let detalleID = `detalle-${tarea.id}`;
    let botonEditarID = `editar-${tarea.id}`;
    let botonFinalizarID = `finalizar-${tarea.id}`;
    let botonCancelarID = `cancelar-${tarea.id}`;
    let botonEliminarID = `eliminar-${tarea.id}`;
  
    let nuevaCardHTML = `
    <div id="${cardID}" class="cards_modal">
    <h1 class="h3_modal" id="${tituloID}">${tarea.titulo}</h1>
    <p class="detalle_modal" id="${detalleID}">${tarea.detalle}</p>
        <div class="div_modales">
        <strong>URGENCIA → </strong>
        <p>${tarea.urgencia}</p>
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
    <button id="${botonEliminarID}" class="btn botonesCards_modal" >Eliminar</button>
    `
    modalFooter.innerHTML = botonesCard;
  }
}






// Función para finalizar tarea de card
async function finalizarTarea(id) {
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
    // Buscar la tarea por su ID
    let tarea = unaCard.find((t) => t.id === id);
    // let fondoDiv = document.getElementById(`card-${tarea.id}`);
  
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
        icon: "success"
      });
      setTimeout(() => {
        cardsEnPantalla(pantallaActual);
      }, 1000);

    }
  }); 
}





async function eliminar(id){
  let contenedorModal = document.getElementById("modalContainer");
  let contenedorModal2 = document.getElementById("exampleModal");

  Swal.fire({
    title: "Se eliminará de manera permanente",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      mostrarCarga();
      let tarea = unaCard.find((t) => t.id === id);
      deleteDoc(doc(db, nombreDeColeccion, tarea.id));
      // location.reload();
      Swal.fire({
        title: "Tarea eliminada!",
        timer: 1000,
        icon: "success"
      });
      setTimeout(() => {
        cardsEnPantalla(pantallaActual);
        ocultarCarga();
      }, 1000);
    }
  }); 
}





// Función para cancelar una tarea
async function cancelarTarea(id) {

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
      // Buscar la tarea por su ID
    let tarea = unaCard.find((t) => t.id === id);
    let botonEditar = document.getElementById(`editar-${tarea.id}`);
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
        icon: "success"
      });
      setTimeout(() => {
        cardsEnPantalla(pantallaActual);
        ocultarCarga();
      }, 1000);

    }
  });
}





// Función para editar una tarea
async function botonParaEditar(id) {
  // Buscar la tarea por su ID
  let tarea = unaCard.find((t) => t.id === id);

  //Me fijo fecha para después guardarla
  let fecha = new Date();
  let formatoFechaEdicion = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
  
  // Obtener la referencia al documento en Firestore
  const tareaRef = doc(db, nombreDeColeccion, id);

  // Obtener los nuevos valores de los campos editados
  const fechaDeEdicion = fecha.toLocaleTimeString('es-AR', formatoFechaEdicion);
  const nuevoTitulo = document.getElementById(`titulo-${tarea.id}`).textContent;
  const nuevoDetalle = document.getElementById(`detalle-${tarea.id}`).textContent;



  // Obtener los elementos HTML correspondientes a los campos de título y detalle
  let detalleParaEditar = document.getElementById(`detalle-${tarea.id}`);
  let tituloParaEditar = document.getElementById(`titulo-${tarea.id}`);
  let botonEditar = document.getElementById(`editar-${tarea.id}`);

  // Verificar si estamos en modo de edición o no
  const verSiGuardoOEdito = botonEditar.textContent === "Guardar";

  if (verSiGuardoOEdito) {
    // Guardar cambios
    tarea.titulo = nuevoTitulo;
    tarea.detalle = nuevoDetalle;

    // Deshabilitar la edición en el DOM
    detalleParaEditar.classList.remove("fondo_input_editable");
    tituloParaEditar.classList.remove("fondo_input_editable");
    tituloParaEditar.contentEditable = false;
    detalleParaEditar.contentEditable = false;

    // Restaurar el botón de editar
    botonEditar.classList.remove("boton-guardar");
    botonEditar.textContent = "Editar";

    try {
      // Realizar la actualización en Firestore
      await updateDoc(tareaRef, {
        titulo: nuevoTitulo,
        detalle: nuevoDetalle,
        ultimaEdicion: fecha.toLocaleTimeString('es-AR', formatoFechaEdicion)// Actualizar la fecha de última edición
      });

      Swal.fire({
        title: "Modificado!",
        timer: 800,
        icon: "success"
      });


    } catch (error) {
      console.error("Error al actualizar el documento en Firestore", error);
    }
  } else {
    // Entrar en modo de edición
    detalleParaEditar.classList.add("fondo_input_editable"); //Pongo fondo de input blanco
    tituloParaEditar.classList.add("fondo_input_editable");
    tituloParaEditar.contentEditable = true;
    detalleParaEditar.contentEditable = true;
    detalleParaEditar.focus();

    // Cambiar el texto al botón editar y la función
    botonEditar.textContent = "Guardar";
    botonEditar.classList.add("boton-guardar");
  }
  cardsEnPantalla(muestraPantalla);
}






// Función para limpiar lo que se muestra en pantalla
function actualizarCards() {
  // Limpiar los contenedores
  todasCards.innerHTML = "";
  pendientesCards.innerHTML = "";
  finalizadasCards.innerHTML = "";
  canceladasCards.innerHTML = "";
}


