<?php

    require 'woocommerce.php';
    require 'conexion.php';

    // print_r($woocommerce->get('orders/9945'));
    // print_r($woocommerce->get('products/9713/variations/9714'));
    // print_r($woocommerce->get('products'));

    $datos = $woocommerce->get('products'); 
    $json = json_decode(json_encode($datos), true);
    
    foreach($json as $item)
    {
        $sku = $item['sku'];
        $name = $item['name'];

        $sql_woo = "INSERT INTO stock (descripcion, codigo, kilos, stock) VALUE ('$name', '$sku', '0', '1')";
        $resultado_woo = mysqli_query($conexion, $sql_woo);
    }

?>