<?php
  //session_start();
  
 
 require('Library.php');
 $opcion = 'Tipo';// $_POST['opcion'];
 $response = getDatos();  
 $response = Dato_Unico($response,$opcion);
echo json_encode($response);

/*foreach ($response as $key =>$value) {
	
   echo '<pre>';
   print_r($value['Tipo']);
    print_r($key);

    echo '</pre>';
} */

?> 