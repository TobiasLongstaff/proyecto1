<?php

    require 'woocommerce.php';
    require 'conexion.php';

    $datos = $woocommerce->get('orders'); 
    $json = json_decode(json_encode($datos), true);

    foreach($json as $item)
    {
        echo $item['number'];
        echo $item['billing']['first_name'];
        echo $item['billing']['last_name'];
        echo $item['billing']['address_1'];
        echo $item['billing']['city'];
        echo '<br>';
    }
    // echo $json[0]['billing']['first_name'];

    // foreach($json['billing'] as $item)
    // {
    //         echo $item['last_name'];
    //         echo $item['address_1'];
    //         echo $item['city'];
    // }
    print_r($json);

    // print_r($woocommerce->get('products/9713/variations/9714'));
    // print_r($woocommerce->get('products'));

    // $datos = $woocommerce->get('products'); 
    // $json = json_decode(json_encode($datos), true);
    
    // foreach($json as $item)
    // {
    //     echo $sku = $item['sku'];
    //     echo $name = $item['name'];

    //     $sql_woo = "INSERT INTO stock (descripcion, codigo, kilos, stock) VALUE ('$name', '$sku', '0', '1')";
    //     $resultado_woo = mysqli_query($conexion, $sql_woo);
    // }

?>