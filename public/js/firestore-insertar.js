/* CONEXION FIREBASE */

// Import the functions you need from the SDKs you need
//import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//import { getAuth, indexedDBLocalPersistence, onAuthStateChanged, getIdToken, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"
//import { getAuth } from 'https://cdn.jsdelivr.net/npm/firebase@^9.1.2/firebase-auth.js/+esm' 
// Importar base de datos CLOUD FIRESTORE
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
//const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
//export const auth = getAuth(app);
//export const db2 = getFirestore(app);

//export default app;

  //const auth = initializeAuth(firebaseApp, {persistence: indexedDBLocalPersistence});
  //const auth2 = getAuth(app);
  //const provider = new GoogleAuthProvider();
  //export const db = getFirestore();
  // const db = initializeFirestore(firebaseApp, { 
  //   experimentalForceLongPolling: true, 
  // })


    //const db2 = getFirestore();

    // this line useFetchStreams: false, // and this line })
  //const db = getFirestore();

  //export { app, auth2 };


// Initialize Firebase
//initializeApp(firebaseConfig);

const db = getFirestore(app);


// END CONEXION FIREBASE

  export const saveTask = (nombre,correo,contraseña)=>{
    try{
      addDoc(collection(db, 'registro'),{nombre,correo,contraseña});
      AlertaBien();
    }catch{
      AlertaMal();
    }
  }
    
  const taskForm = document.getElementById('taskFormRegistro')
  
  const nombre = taskForm['nombreRegistro']
  const correo = taskForm['correoRegistro']
  const contraseña = taskForm['contraseñaRegistro']


  let botonRegistro = document.getElementById("btnsaveRegistro");
  botonRegistro.addEventListener("click", botonRegistrar);
  

 function botonRegistrar(){


  getDocs(collection(db, "registro")).then(docSnap => {
    
    let users = [];
    var n = 0
    var listo2=0;
    // var si=0;
    var no=0;

    docSnap.forEach((doc)=> {
      users.push({ ...doc.data(), id:doc.id })

      if(users[n]['correo'] == correo.value){
        no++;//este manda, dice que no se puede ingresar el email porque hay 'no' iguales
        
      }else{
        // console.log('Base de datos: '+users[n]['correo']);
        // console.log('Yo: '+correo.value);
        // si++;
      }
      n++;

    });
    // console.log('Correos no repetidos: '+si);
    // console.log('Correos repetidos: '+no);

    docSnap.forEach((doc)=> {
        users.push({ ...doc.data(), id:doc.id })

      
        
 
        //console.log("Correo:", users[n]['correo']);

        try{
          
      
          //console.log(title,edad,description)
       
        //validar campos vacios
          if(nombre.value=='' || correo.value=='' || contraseña.value=='' && listo2==0){
    
            AlertaCamposVacios();
    
          }else{
     
            //validar si es numero o cadena
            // if(!isNaN(edad.value)){ 
    
              //validar si es numero entero o numero decimal
                // if(edad.value % 1 == 0){
    
                  // if(edad.value > 0 && edad.value < 100 ){

            
            if(no==0 && listo2==0){
              

              if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test((correo.value))){
                        
                if(contraseña.value.length >= 8){

                    // console.log('Entre : '+ n);
                    
                    saveTask(nombre.value, correo.value, contraseña.value)
                    
                    listo2=1;
                    //taskForm.reset()
                }else{
                  AlertaContraseñaMal();
                }

                

              }else{
                AlertaCorreoMal();
              }
            }else if(users[n]['correo'] == correo.value){


              AlertaCorreosIguales();
              listo2=1;
              // console.log('CORREOS IGUALES');
              //taskForm.reset()
              

            }

    
                      
                  // }else{
                  //   AlertaEdadNumero();
                  // }
                         
                  
                // }else{
                //   AlertaEdadNumero();
                // }
    
            // }else{
            //   AlertaEdadNumero();
            // }
          }
          
    
      }catch{
        AlertaMal();
      }

        n++;
    });
        
});

}



function AlertaBien(){

  Swal.fire({
    title: 'Registrado!',
    text: 'Usuario guardado correctamente',
    icon: 'success',
    confirmButtonText: 'Iniciar sesión'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //Swal.fire('Saved!', '', 'success')
      //window.open('iniciosesion.html','_blank');
      window.location.href='iniciosesion.html';
    } 
  })
}

function AlertaMal(){
  
  Swal.fire({
    title: 'No Registrado!',
    text: 'Algo salió mal',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCamposVacios(){
  
  Swal.fire({
    title: 'No Registrado!',
    text: 'Campo(s) no rellenado(s)',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaEdadNumero(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'Edad mal ingresada',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCorreoMal(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'Correo mal ingresado',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaContraseñaMal(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'La contraseña debe tener al menos 8 caracteres ',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCorreosIguales(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'Correo ya existe, ingrese otro correo...',
    icon: 'error',
    confirmButtonText: 'Ok'
  })

}