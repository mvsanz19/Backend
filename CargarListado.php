<?php
 require('Library.php');
 // Recibo la Opcion sea Ciudad o Tipo con la funcion $_POST
 $opcion = $_POST['opcion'];
 // Obtengo los Datos del Json de la Libreria
 $response = getDatos();  
 // Elimino Los Datos Repetidos
 $response = Dato_Unico($response,$opcion);
 // envio la peticion de nuevo al Ajax
 echo json_encode($response);
 
?> 