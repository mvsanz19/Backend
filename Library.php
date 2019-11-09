<?php
// Funcion que Obtiene los datos del Json
  function getDatos(){
    $data = file_get_contents("./data/data-1.json");
    $datos = json_decode($data, true);
    return $datos;
  }
 //Funcion que Verifica Datos Repetidos en el Json 
  function Dato_Unico($array, $key) {
    $Datemp = array();
    foreach ($array as &$v) 
    { if (!isset($Datemp[$v[$key]])) 
	 $Datemp[$v[$key]] =& $v; 
     }
    $array = array_values($Datemp); 
    return $array; 
   
  }
  
  function DatosT($array) {
    $Datemp = array();
	$i =0;
    foreach ($array as &$v) 
    {  
	 $Datemp[$i] =& $v;
     $i++;	 
     }
    $array = array_values($Datemp); 
    return $array; 
   
  }
  // Funcion de Consulta filtrada por Parametros
   function Consulta($array, $ciudad, $tipo,$rg1,$rg2) {
    $Datemp = array();
	$i =0;
    foreach ($array as $key => $value) 
    {  
	  // Se convierte el valor de precio de tipo Double 
	  $str = substr($value['Precio'], 1);
	  $rango = (double)filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
	  
	  // Consulta solo Ciudad
	  IF((isset($ciudad)) and ($tipo == "")){
	    IF (($ciudad == $value['Ciudad']) and (($rango >= $rg1)and ($rango <= $rg2))) {
	      $Datemp[$i] =& $array[$key];
          $i++;		 
        }
	  }
	  //Consulta solo Tipo
	  IF(($ciudad == "") and (isset ($tipo))){
	    IF(($tipo == $value['Tipo']) and (($rango >= $rg1)and ($rango <= $rg2))){
	      $Datemp[$i] =& $array[$key];
          $i++;		 
        }
	  }
	  // consulta solo de rangos
	  
	  IF(($ciudad =="") and ($tipo== "")){
	    IF(($rango >= $rg1)and ($rango <= $rg2)){
	      $Datemp[$i] =& $array[$key];
          $i++;		 
        }
	  }
	 // consulta de ambas 
	  
	   IF((isset($ciudad)) and (isset ($tipo))){
	    IF(($tipo == $value['Tipo']) and ($ciudad == $value['Ciudad']) and (($rango >= $rg1)and ($rango <= $rg2))){
	      $Datemp[$i] =& $array[$key];
          $i++;		 
        }
	  }
	 
	   IF((isset($ciudad)) and (isset ($tipo))){
	    IF(($tipo == $value['Tipo']) and ($ciudad == $value['Ciudad'])){
	      $Datemp[$i] =& $array[$key];
          $i++;		 
        }
	  }
	}
    $array = array_values($Datemp); 
    return $array; 
   
  
  }
  

?>