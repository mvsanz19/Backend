<?php
require('Library.php');
$opcion = $_POST['opcion'];

// Opcion de Consultar todo
 IF ($opcion == 'Mostrar') {
 $response = getDatos();  
 $response = DatosT($response);
 }
 //Opcion de Consulta por Filtros
 IF ($opcion == 'Consultar') {
  $ciudad = $_POST['ciudad'];
  $tipo   = $_POST['tipo'];
  $rango1 = $_POST['rango1'];
  $rango2 = $_POST['rango2'];
  $response = getDatos();  
  $response = Consulta($response,$ciudad,$tipo ,$rango1,$rango2);   
 }
 echo json_encode($response);

?> 