/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
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





///////////////////////////////////////ELIMINAR//////////////////////////////////////////

//export const deleteTask = (id) => deleteDoc(doc(db, "registro", "1EL7sNIgHr5pvpbZ4FyQ"));
//await deleteDoc(doc(db, "registro", "16Pag2U9JESPxv6dG7Bs"));



    const taskForm = document.getElementById('taskFormEliminar')
    const correo = taskForm['correoEliminar']
    const contraseña = taskForm['contraseñaEliminar']

    let botonEliminar = document.getElementById("btn-delete");
    botonEliminar.addEventListener("click", Eliminar);
  


/////////////////////////////////////////////////////////////////////


function Eliminar(){
      
      
  //console.log("ENTREEEE SIUUU")
  //get all data
  getDocs(collection(db, "registro")).then(docSnap => {

      let users2 = [];
      var vacio = 0;
      var listo2 = 0;
      var m = 0

      docSnap.forEach((doc)=> {

          users2.push({ ...doc.data(), id:doc.id })

          //console.log("Nombre:", users[n]['nombre']);
          //console.log("Correo:", users[n]['correo']);
          //console.log("Contraseña:", users[n]['contraseña']);


          if(correo.value == '' || contraseña.value == ''){
              AlertaCamposVacios();
              vacio=1;

          }else{

              if( correo.value == users2[m]['correo'] && contraseña.value == users2[m]['contraseña'] && listo2==0){
                 
                 //console.log("Correo:", users[n]['correo']);
                  //nombre = users2[m]['nombre'];
                  var id = users2[m]['id']
                  //console.log('ENTREEE '+id);
                  //nombreperfil(nombre);
                  //AlertaBien(nombre);
                  listo2=1;
                  //EliminandoID(id);
                  AlertaBien(id);
                  
                  
              }else{
                  
                  
                  
              }
          }

          
          m++;
  });
    
  
    if(listo2!=1 && vacio != 1){
      //console.log("MALLLL");
      AlertaMal();
    }
      

  });
}


  async function EliminandoID(id){
    
    try {
      //console.log('ENTREEE con ID = '+id);
      await deleteDoc(doc(db, "registro", id));
      window.location.href='index.html';
      //AlertaBien();
    } catch (error) {
      AlertaMal();
    }
  }

  function AlertaBien(id){

    Swal.fire({
        title: 'Borrar cuenta',
        text: '¿estás seguro(a) de borrar tu cuenta?',
        icon: 'warning',
        confirmButtonText: 'Sí',
        showCancelButton: true,
        CancelButtonText: 'No'
        
        //denyButtonText: `Don't save`,
      }).then((result) => {
        
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //Swal.fire('Cuenta borrada!', '', 'success')
          
          EliminandoID(id)
          
          
        } 
      })
}

function AlertaMal(){

  Swal.fire({
      title: 'Algo salió mal!',
      text: 'Ingresa nuevamente tu correo y contraseña',
      icon: 'error',
      confirmButtonText: 'Ok',

    })
}

function AlertaCamposVacios(){

  Swal.fire({
      title: 'No se ha podido borrar tu cuenta',
      text: 'Campo(s) vacío(s)',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
}

  // try {
  //   await deleteTask('16Pag2U9JESPxv6dG7Bs');
    
  // } catch (error) {
  //   console.log(error);
    
  // }