function Instagram(){


    window.open('https://www.instagram.com/naxo.medina/','_blank');
}

function Facebook(){


    window.open('https://www.facebook.com/luis.medinabravo.9','_blank');
}

function Linkedin(){


    window.open('https://www.linkedin.com/in/luis-medina-bravo-124b6324b/','_blank');
}


function CerrarSesion(){


    Swal.fire({
        
        title: 'Cerrar Sesión',
        text: '¿estás seguro(a)?',
        icon: 'warning',
        confirmButtonText: 'Sí',
        showCancelButton: true,
        cancelButtonText: 'No',
        
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          
          window.location.href='index.html';
          
          
        }
         
      })
}

function ConfirmarCerrarSesion(){

    Swal.fire({
        
        title: 'Sesión cerrada',
        icon: 'success',
        showconfirmButton: true
        
      })

}

    

