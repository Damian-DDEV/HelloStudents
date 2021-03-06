  
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
        path: '/alumno/',
        url: 'alumno.html',
      },
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/registrodocente/',
        url: 'registrodocente.html',
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
    var usuario = $$("#usuario").val();
    var clave = $$("#clave").val();
    firebase.auth().signInWithEmailAndPassword(usuario, clave)
    .then((user) => {
      mainView.router.navigate('/aulad/');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
      });
      $$("#docente").on('click', function(){
        mainView.router.navigate('/index/');
      });
      $$("#alumno").on('click', function(){
        mainView.router.navigate('/alumno/');
      });
  })
  
    
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="aulad"]', function (e) {
  $$("#editar").on('click', function(){
    mainView.router.navigate('/editard/');
  })
})


