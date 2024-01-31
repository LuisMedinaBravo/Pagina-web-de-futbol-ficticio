/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP0gkxwJ238I0N_TTY8Y2lhebl5wcNFuw",
  authDomain: "nachofutbolclub3.firebaseapp.com",
  projectId: "nachofutbolclub3",
  storageBucket: "nachofutbolclub3.appspot.com",
  messagingSenderId: "5633954872",
  appId: "1:5633954872:web:85240d583e20d01811c2cd"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// END CONEXION FIREBASE

let nombre="";
const taskForm = document.getElementById('taskFormInicio')


try {
    const correo = taskForm['correoInicio']
    const contraseña = taskForm['contraseñaInicio']
    let botonInicio = document.getElementById("btnsaveInicio");
    botonInicio.addEventListener("click", botonIniciar);

    

    function botonIniciar(){

        listar();
      }
      
      function listar(){
      
      
          //get all data
          getDocs(collection(db, "registro")).then(docSnap => {
       
              let users = [];
              
              var listo = 0;
              var n = 0
       
              docSnap.forEach((doc)=> {
       
                  users.push({ ...doc.data(), id:doc.id })
      
                  //console.log("Nombre:", users[n]['nombre']);
                  //console.log("Correo:", users[n]['correo']);
                  //console.log("Contraseña:", users[n]['contraseña']);
      
      
                  if(correo.value == '' || contraseña.value == ''){
                      AlertaCamposVacios();
                  }else{
      
                      if( correo.value == users[n]['correo'] && contraseña.value == users[n]['contraseña'] && listo==0){
                         
                         //console.log("Correo:", users[n]['correo']);
                          nombre = users[n]['nombre'];
                          
                          //nombreperfil(nombre);
                          AlertaBien(nombre);
                          listo=1;

                          
                          
                      }else{
                          
                          if(listo!=1){
                              //console.log("MALLLL");
                              AlertaMal();
                          }
                          
                      }
                  }
      
                  
                  n++;
          });
          
              
          });
      }
} catch (error) {
    
}


async function AlertaBien(nombre){

    Swal.fire({
        title: 'Sesión iniciada!',
        text: 'Bienvenido(a) '+nombre,
        icon: 'success',
        confirmButtonText: 'Continuar'
        //denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //Swal.fire('Saved!', '', 'success')
          window.location.href='miperfil.html';

          
        } 
      })
}

function AlertaMal(){

    Swal.fire({
        title: 'No se pudo iniciar sesión!',
        text: 'Usuario y/o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

}

function AlertaCamposVacios(){

    Swal.fire({
        title: 'No se pudo iniciar sesión!',
        text: 'Campo(s) vacío(s)',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
}

window.onload = function() {
  what();
  function what(){

    try {
      var x = document.getElementById('miPerfilId');
      x.innerHTML= `
      
      <h1>Mis datos: ${nombre}<h1/>
      `;
    } catch (error) {
      
    } 
  };
}



  


