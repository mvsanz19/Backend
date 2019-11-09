/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       //video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        //video.play();
     }
     ultimoScroll = scrollActual;
    })
    /*.scrollEnd(()=>{
      video.pause();
    }, 10)*/
}

inicializarSlider();
playVideoOnScroll();


/*Inicia Poyecto*/

function idBusqueda(event){
   event.preventDefault();
  $.ajax({
    url: "index.php",
    dataType: "text",
    cache: false,
    contentType: false,
    processData: false,
    type: 'post',
    success: function(response){
      if (response.msj == "true") {
        setTitles(response.Direccion);
      }else {
        window.location.href = 'index.html';
      }

    },
    error: function(){
      window.location.href = 'index.html';
    }
  })
}

// Funcion que permite Cargar Listado de Ciudades
function ListarCiudad() 
{  	 
	var city = $("#selectCiudad");	
    var opcion = 'Ciudad';
    var form_data = new FormData();
    form_data.append('opcion', opcion);	
	$.ajax({
    url: 'CargarListado.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
	data : form_data,
    type: 'post',
    success: function(data){  
     $(data).each(function(i, v){ // indice, valor
	 city.material_select();
     city.append('<option value="' + v.Ciudad + '">' + v.Ciudad + '</option>');
	
      })
    },
    error: function(){
		alert('error');
    }
  })

}

// Funcion para cargar Listado de Tipo Vivienda

function ListarTipoV() 
{  	 
	var Tipo = $("#selectTipo");	
    var opcion = 'Tipo';
    var form_data = new FormData();
    form_data.append('opcion', opcion);	
	$.ajax({
    url: 'CargarListado.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
	data : form_data,
    type: 'post',
    success: function(data){  
     $(data).each(function(i, v){ // indice, valor
	 Tipo.material_select();
     Tipo.append('<option value="' + v.Tipo + '">' + v.Tipo + '</option>');
	
      })
    },
    error: function(){
		alert('error');
    }
  });
 
  $(window).ready(function() {
		$('select').material_select();
	});
	
}

// Funcion que llama toda la busqueda del objeto Json
function MostrarTodo(){
  var opcion = 'Mostrar';
  var busqueda = $(".colContenido");
  var form_data = new FormData();
  form_data.append('opcion', opcion);
  $( "div" ).remove( ".itemMostrado" );  
  $.ajax({
    url: 'busqueda.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
	data : form_data,
    type: 'post',
    success: function(data){ 
	  $(data).each(function(i, v){ // indice, valor
      var FieldHTML = '<div class="itemMostrado colContenido divider " id="Prueba['+v.Id+']">'+
	                 '<img src="img/home.jpg" class="itemMostrado img" id="image['+v.Id+']"/>'+ 
	                 '<div id=b"['+v.Id+']" class="card-action">'+
					 '<h7  class = "itemMostrado card-action" id="Ciudade['+v.Id+']">Ciudades: '+v.Ciudad+'</h7>'+
					 '<h7 class = "itemMostrado card-action" id= "Direccion['+v.Id+']">Direccion: '+v.Direccion+'</h7>'+
					 '<h7  class = "itemMostrado card-action" id= "Telefono['+v.Id+']">Telefono: '+v.Telefono+'</h7>'+
					 '<h7 class = "itemMostrado card-action"  id= "Codigo['+v.Id+']">Codigo Postal: '+v.Codigo_Postal+'</h7>'+
					 '<h7 class = "itemMostrado card-action"  id= "Tipo['+v.Id+']">Tipo: '+v.Tipo+'</h7>'+
					 '<h7 class = "itemMostrado card-action precioTexto"  id= "Precio['+v.Id+']">Precio: '+v.Precio+'</h7>'+
					 '</div></div>';
  		 
									
       busqueda.append(FieldHTML); 
	
      })
    },
    error: function(){
		alert('error');
    }
  })
}


//Funcion solo para la busqueda segun los parametros
function submitConsulta(){
  var opcion = 'Consultar';
  var busqueda = $(".colContenido");
  var form_data = new FormData(); 
  form_data.append('opcion', opcion);
  form_data.append('ciudad', $("[name='ciudad']").val()); 
  form_data.append('tipo', $("[name='tipo']").val());    
  form_data.append('rango1',  $('#rangoPrecio').data().from); 
  form_data.append('rango2',  $('#rangoPrecio').data().to);
  $( "div" ).remove( ".itemMostrado" );
  $.ajax({
    url: 'busqueda.php',
    dataType: "json",
    cache: false,
    contentType: false,
    processData: false,
	data : form_data,
    type: 'post',
    success: function(data){ 
	
	 $(data).each(function(i, v){ // indice, valor
	  
	 var FieldHTML = '<div class="itemMostrado colContenido divider " id="Prueba['+v.Id+']">'+
	                 '<img src="img/home.jpg" class="itemMostrado img" id="image['+v.Id+']"/>'+ 
	                 '<div id=b"['+v.Id+']" class="card-action">'+
					 '<h7  class = "itemMostrado card-action" id="Ciudade['+v.Id+']">Ciudades: '+v.Ciudad+'</h7>'+
					 '<h7 class = "itemMostrado card-action" id= "Direccion['+v.Id+']">Direccion: '+v.Direccion+'</h7>'+
					 '<h7  class = "itemMostrado card-action" id= "Telefono['+v.Id+']">Telefono: '+v.Telefono+'</h7>'+
					 '<h7 class = "itemMostrado card-action"  id= "Codigo['+v.Id+']">Codigo Postal: '+v.Codigo_Postal+'</h7>'+
					 '<h7 class = "itemMostrado card-action"  id= "Tipo['+v.Id+']">Tipo: '+v.Tipo+'</h7>'+
					 '<h7 class = "itemMostrado card-action precioTexto"  id= "Precio['+v.Id+']">Precio: '+v.Precio+'</h7>'+
					 '</div></div>';
  		 
									
       busqueda.append(FieldHTML); 
		 
      })
	  
    },
    error: function(){
		alert('error');
    }
  })
}



//main program
$(function(){
 ListarCiudad();
 ListarTipoV();
 
var button1 = document.getElementById('mostrarTodos');
button1.addEventListener('click',  function(){
	MostrarTodo();
});

$("#formulario").submit(submitConsulta);
   
	$(window).ready(function() {
		$('select').material_select();
	});
	
	
})

