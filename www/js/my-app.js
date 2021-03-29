  
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
        path: '/enviartarea/',
        url: 'enviartarea.html',
      },
      {
        path: '/aulaa/',
        url: 'aulaa.html',
      },
      {
        path: '/tareaa/',
        url: 'tareaa.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var db = firebase.firestore();
var colUsuarios = db.collection("usuarios");
var emails;
var nombreaula;
var idamateria;
var nombremat;
var bienvenido;
var busqueda = [];
var asignartarea = [];
var nomb;
var tarea;
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


//DOCENTE///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
          nombremat = doc.data().Nombremateria;
          $$("#nombremateria").html(nombremat);
      }
      });
      })    
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

$$("#cerrarsesion").on('click', cerrarsesiond);
$$("#agregaraula").on('click', function(){
  var nombreaula = $$("#nombreaula").val();
  $$(".aulas").append("<div class='col'><input type='button' value='"+nombreaula+"' class='col button button-large button-fill redirn espacio'></input></div>");
  db.collection("materia").doc().set({
    Nombremateria: ""+nombreaula+"",
    NombreProfesor: ""+emails+"",
    Tarea: ""
  })
.then(() => {
    console.log("Document successfully written!");
})
})
  bienvenido = colUsuarios.doc(emails);
  bienvenido.get().then(function(doc) {
  if (doc.exists) {
    nomb = doc.data().nombre;
    $$("#bienvenido").html(nomb);
}
});
})


//REGISTRAR
$$(document).on('page:init', '.page[data-name="registrar"]', function (e) {
  $$("#registrar").on('click', registrar);
})

//AULA DONDE EL DOCENTE SELECCIONA LOS ALUMNOS
  $$(document).on('page:init', '.page[data-name="aulan"]', function (e) {
    var searchbar = app.searchbar.create({
      el: '.searchbar',
      searchContainer: '.list',
      searchIn: '.item-title',
      on: {
        search(sb, query, previousQuery) {
          console.log(query, previousQuery);
        }
      }
    });
    db.collection("usuarios")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            busqueda.push(doc.data().nombre);
            tel = doc.data().tel;
        });
        for(i=0; i<busqueda.length; i++){
          $$("#buscadora").append("<li class='item-content'><div class='item-inner'><a href='#' id='a"+i+"'><div class='item-title'>"+busqueda[i]+"</div></a></div></li>");
          $$("#a"+i).on('click', function(){
            id = this.id;
            id = id.replace('a', '');
            list = busqueda[id];
            $$("#listatarea").append("<li>"+list+"</li>")
            asignartarea.push(list);
          })
        }
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });  
    $$("#asignartarea").on('click', function(){
      mainView.router.navigate('/enviartarea/');
     })
    $$("#nombreaula").html(idamateria);
    


  })
//tarea
  $$(document).on('page:init', '.page[data-name="enviartarea"]', function (e) {
     $$("#enviartarea").on('click', function(){
      tarea = $$("#tarea").text();
      asignartarea.map((alumno) => {
        db.collection("materia").doc(idamateria).collection("tarea").add({
          Tarea : tarea,
          Alumno : alumno,
          DevolucionAlumno: "",
          Correcion: "",
          Materia: nombremat
        });
      })
     });
    })

//ALUMNO//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

$$(document).on('page:init', '.page[data-name="aulaa"]', function (e) {
  $$("#cerrarsesion").on('click', cerrarsesiond);
  bienvenido = colUsuarios.doc(emails);
  bienvenido.get().then(function(doc) {
  if (doc.exists) {
    nomb = doc.data().nombre;
    console.log(emails , "=>", nomb);
}
});
  db.collectionGroup("tarea")
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().Alumno === nomb){
          $$(".pruebaA").append("<div class='col'><input type='button' id='"+doc.id+"' value='"+doc.data().Materia+"      "+ "Docente:  " +nomb+" ' class='col button button-large button-fill redirn espacio'></input></div>");
          $$("#"+doc.id).on('click', function(){
            tareaaresolver = doc.data().Tarea
            mainView.router.navigate('/tareaa/');
          })
        }
      }); 
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });

})
//TAREA ALUMNO
$$(document).on('page:init', '.page[data-name="tareaa"]', function (e) {
  $$("#tareaaresolver").html(tareaaresolver);
  db.collection("materia").doc(idamateria)
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc);
      });
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  }); 
  
  $$("#tcorregir").on('click', function(){
    talumnoaenviar = $$("#talumnoaenviar").text();

  });
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
    emails = correoa;
    mainView.router.navigate('/aulaa/');      
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



function cerrarsesiond(){
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
  tel = $$("#tel").val();
    firebase.auth().createUserWithEmailAndPassword(correor, claver)
    .then((user) => {
      datos = { nombre: nombrer, apellido: apellidor, tel: tel};
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

