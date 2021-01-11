const axios = require('axios');
//const path = require('path');

document.addEventListener('DOMContentLoaded',function(){
    cargarTabla();
})
// no recomendado por el profe, falta madurez y no lo toma bien algunos browsers async await
// recomendable usar axios sobre fetch
async function cargarTabla(){

    /*
        axios.get('http://localhost:3000/estudiantes')
            .then(function(datos){})
    */

    try{
      
        var respuesta = await axios.get('http://localhost:3000/estudiantes')
        console.log( typeof respuesta.data) // es un object, no es array usar siempre estas pruebas, 
        // no se puede usar el forech, se usa map (porque es un objeto según el typeof).
        var estudiantes = respuesta.data
        var ttable = document.querySelector(".table")
        var tbody = document.querySelector("#tbody")
        tbody.innerHTML = ""
        ttable.id ="tablaMonos"
        estudiantes.map(function(estudiante){
            var trEst = document.createElement('tr')
            
            var tdId = document.createElement('td')
            var tdNombre = document.createElement('td')
            var tdCurso = document.createElement('td')
            var tdTurno = document.createElement('td')

            var tdAccion = document.createElement('td')
            var botonComentar = document.createElement('button')
            botonComentar.innerHTML = "Comentario"
            botonComentar.classList.add('btn','btn-danger')
            botonComentar.setAttribute('id',estudiante.id)

            botonComentar.addEventListener('click',agregarComentario)

        
            tdAccion.appendChild(botonComentar)

            tdId.innerHTML = estudiante.id
            tdNombre.innerHTML = estudiante.nombre
            tdCurso.innerHTML = estudiante.curso
            tdTurno.innerHTML = estudiante.turno

            trEst.appendChild(tdId)
            trEst.appendChild(tdNombre)
            trEst.appendChild(tdCurso)
            trEst.appendChild(tdTurno)
            trEst.appendChild(tdAccion)

            tbody.appendChild(trEst)
        })
    }catch(error){
        console.log(error)
    }
    
}

function agregarComentario(event){
    //--------------
    function insRow(id) {
       // var filas = document.getElementById("tablaMonos").rows.length;
       //  var x = document.getElementById(id).insertRow(filas);
        console.log('ultima fila:'+ id);
        var x = document.getElementById("tablaMonos").insertRow(1);
       var y = x.insertCell(0);
        var z = x.insertCell(1);
        y.innerHTML = '<input type="text" id="fname">';
       // z.innerHTML ='<button id="btn" name="btn" > Delete</button>';
 }

    //----
    var id = event.target.id
    console.log ('id de receta:' + id);
      //------------------
      //var commentUri = 'http://localhost:4000/frontend/comment.html' //path.join(__dirname, 'frontend/comment.html') // 
      var commentUri = "/frontend/comment.html"
      /*  "https://www.box.com/api/oauth2/authorize?"+
       "client_id="+clientID+
       "&response_type=code"+
       "&redirect_uri="+callbackUri */
     //  window.open('/comment.html','_self')
      // window.open(commentUri, "windowname1", 'width=1000, height=600'); //este abria un popup
      //-----------------
      insRow(id);
      document.write("<iframe src=\"localhost:4000\/frontend\/comment.html\" id=\"iframe\"><\/iframe>");
     // document.write("<iframe src="/frontend/comment.html" id=\"iframe\"><\/iframe>");
      document.write("");
      document.write("<script>");
      document.write("  iframe.onload = function() {");
      document.write("    \/\/ solo haz cualquier cosa");
      document.write("    iframe.contentDocument.body.prepend(\"¡Hola, capo!\");");
      document.write("  };");
      document.write("<\/script>");

       //-----------------
    /* axios.delete('http://localhost:3000/estudiantes/' + id)
        .then(function(respuesta){
            console.log(respuesta)
        })
        .catch(function(error){
            console.log(error)
        }) */
}