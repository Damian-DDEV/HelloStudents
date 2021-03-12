  
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
        path: '/docente/',
        url: 'docente.html',
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
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var db = firebase.firestore();
var emails;
var colUsuarios = db.collection("usuarios");

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);

    //LOGIN DOCENTE
  $$("#ingresar").on('click', function(){
    var correod = $$("#correod").val();
    var claved = $$("#claved").val();
    firebase.auth().signInWithEmailAndPassword(correod, claved)
    .then((user) => {
      emails = correod;
      console.log(emails);
      mainView.router.navigate('/aulad/');      
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
      });
      $$("#docente").on('click', function(){
        mainView.router.navigate('/docente/');
      });
      $$("#alumno").on('click', function(){
        mainView.router.navigate('/alumno/');
      });
  })
  
//AULA DOCENTE
$$(document).on('page:init', '.page[data-name="aulad"]', function (e) {
  $$("#cerrarsesion").on('click', function(){
    mainView.router.navigate('/index/');
    firebase.auth().signOut().then(() => {
      alert("Se ha cerrado la sesion")
    }).catch((error) => {
      alert(error);
    });

  })
  $$("#agregaraula").on('click', function(){
    var nombreaula = $$("#nombreaula").val();
    $$(".aulas").append("<div class='col'><input type='button' value='"+nombreaula+"' class='col button button-large button-fill'></input></div>");
  })
  /*var docRef = db.collection("usuarios").doc(emails);
  docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        $$("#bienvenido").val(doc.data().nombre);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch((error) => {
    console.log("Error getting document:", error);
})*/
var docRef = db.collection("usuarios").doc(emails);
docRef.get().then(function(doc) {
    if (doc.exists) {
       var nomb = doc.data().nombre;
       $$("#bienvenido").val(nomb);
}
});
})


//REGISTRAR
$$(document).on('page:init', '.page[data-name="registrar"]', function (e) {
  $$("#registrar").on('click', function(){
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
  })
})

//DOCENTE
  $$(document).on('page:init', '.page[data-name="docente"]', function (e) {
    if ( $$('#docente').hasClass('azul') ) {
      $$('#docente').removeClass('azul').addClass('rojo');
    }
  })

//ALUMNO
  $$(document).on('page:init', '.page[data-name="alumno"]', function (e) {
    if ( $$('#docente').hasClass('rojo') ) {
      $$('#docente').removeClass('rojo').addClass('azul');
    } else if ($$('#docente').hasClass('rojo')) {
      $$('#docente').removeClass('rojo').addClass('azul');
    }

  })
