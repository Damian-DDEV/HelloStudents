  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/alumno/',
        url: 'alumno.html',
      },
      {
        path: '/registrar/',
        url: 'registrar.html',
      },
      {
        path: '/recuperardocente/',
        url: 'recuperardocente.html',
      },
      {
        path: '/aulad/',
        url: 'aulad.html',
      },
      {
        path: '/editard/',
        url: 'editard.html',
      },
      {
        path: '/aulan/',
        url: 'aulan.html',
      },
      {
        path: '/asignartarea/',
        url: 'asignartarea.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var db = firebase.firestore();
var emails;
var idaula;
var nombreaula;
var idamateria;
var buscaralumno;
var colUsuarios = db.collection("usuarios");

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$("#ingresard").on('click', ingresard);
  if ( $$('#docente').hasClass('azul')) {
    $$('#docente').removeClass('azul').addClass('rojo');
    }
  if ($$('alumno').hasClass('rojo')){
    $$('#alumno').removeClass('rojo').addClass('azul');
  }
  $$("#alumno").on('click', function(){
    mainView.router.navigate('/alumno/');
  })
  })

//AULA DOCENTE
$$(document).on('page:init', '.page[data-name="aulad"]', function (e) {
  db.collection("materia").where("NombreProfesor", "==", emails)
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        $$(".aulas").append("<div class='col'><input type='button' id='"+doc.id+"' value='"+doc.data().Nombremateria+"' class='col button button-large button-fill redirn espacio'></input></div>");
      }); 
      $$(".redirn").on('click', function(){
        mainView.router.navigate('/aulan/');
        idamateria = $$(this).attr("id");
        var nombremateria = db.collection("materia").doc(idamateria);
        nombremateria.get().then(function(doc) {
        if (doc.exists) {
          var nombremat = doc.data().Nombremateria;
          $$("#nombremateria").html(nombremat);
          console.log(nombremat);
      }
      });
      })    
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

$$("#cerrarsesion").on('click', cerrarsesion);
$$("#agregaraula").on('click', function(){
  var nombreaula = $$("#nombreaula").val();
  $$(".aulas").append("<div class='col'><input type='button' value='"+nombreaula+"' class='col button button-large button-fill redirn espacio'></input></div>");
  db.collection("materia").doc().set({
    Nombremateria: ""+nombreaula+"",
    NombreProfesor: ""+emails+""
  })
.then(() => {
    console.log("Document successfully written!");
})
})
  var bienvenido = colUsuarios.doc(emails);
  bienvenido.get().then(function(doc) {

  if (doc.exists) {
    var nomb = doc.data().nombre;
    $$("#bienvenido").html(nomb);
}
});
})


//REGISTRAR
$$(document).on('page:init', '.page[data-name="registrar"]', function (e) {
  $$("#registrar").on('click', registrar);
})

//AULAN
  $$(document).on('page:init', '.page[data-name="aulan"]', function (e) {
    db.collection("usuarios").where("nombre", "==", "pedro")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
       console.log(doc);
      }); 

  })
    /*colUsuarios.doc(emails).get()
    .then((doc) => {
        console.log(doc.id, "=>", doc.data().nombre, "=>", doc.data().apellido);
    })*/
    /*.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
        });  
    })  .catch((error) => {
      console.log("Error getting documents: ", error);
  });*/
  
    
    $$("#asignartarea").on('click', function(){
      mainView.router.navigate('/asignartarea/');
      alert("click");
     })
     $$("#buscaralumno").on('click', function(){
      alert('click');
    })
    $$("#nombreaula").html(idamateria);


    

    




  })

//ALUMNO
  $$(document).on('page:init', '.page[data-name="alumno"]', function (e) {
    if ( $$('#docente').hasClass('rojo') && $$('#alumno').hasClass('azul')) {
      $$('#docente').removeClass('rojo').addClass('azul');
      $$('#alumno').removeClass('azul').addClass('rojo');
      }
      $$("#docente").on('click', function(){
        mainView.router.navigate('/index/');
      })
      $$("#ingresara").on('click', ingresara);
  })




function ingresard (){
  var correod = $$("#correod").val();
  var claved = $$("#claved").val();
  firebase.auth().signInWithEmailAndPassword(correod, claved)
  .then((user) => {
    emails = correod;
    mainView.router.navigate('/aulad/');      
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage + errorCode);
  });
    $$("#docente").on('click', function(){
      mainView.router.navigate('/docente/');
    });
    $$("#alumno").on('click', function(){
      mainView.router.navigate('/alumno/');
    });
}

function ingresara (){
  var correoa = $$("#correoa").val();
  var clavea = $$("#clavea").val();
  firebase.auth().signInWithEmailAndPassword(correoa, clavea)
  .then((user) => {
    emails = correod;
    mainView.router.navigate('/aulad/');      
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage + errorCode);
  });
    $$("#docente").on('click', function(){
      mainView.router.navigate('/docente/');
    });
    $$("#alumno").on('click', function(){
      mainView.router.navigate('/alumno/');
    });
}



function cerrarsesion(){
  mainView.router.navigate('/index/');
  firebase.auth().signOut().then(() => {
    alert("Se ha cerrado la sesion")
  }).catch((error) => {
    alert(error);
  });
}


function registrar() {
  var correor = $$("#correor").val();
  var claver = $$("#claver").val();
  var nombrer = $$("#nombrer").val();
  var apellidor = $$("#apellidor").val();
    firebase.auth().createUserWithEmailAndPassword(correor, claver)
    .then((user) => {
      datos = { nombre: nombrer, apellido: apellidor};
      colUsuarios.doc(correor).set(datos);
      mainView.router.navigate('/index/');
      alert("se registro correctamente");
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
  });
}

