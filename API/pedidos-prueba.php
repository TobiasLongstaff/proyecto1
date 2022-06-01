<?php

    require 'woocommerce.php';
    require 'conexion.php';

    // $datos = $woocommerce->get('orders'); 
    // $json = json_decode(json_encode($datos), true);

    // foreach($json as $item)
    // {
    //     echo $item['number'];
    //     echo $item['billing']['first_name'];
    //     echo $item['billing']['last_name'];
    //     echo $item['billing']['address_1'];
    //     echo $item['billing']['city'];
    //     echo '<br>';
    // }
    // echo $json[0]['billing']['first_name'];

    // foreach($json['billing'] as $item)
    // {
    //         echo $item['last_name'];
    //         echo $item['address_1'];
    //         echo $item['city'];
    // }

    // print_r($woocommerce->get('products/9713/variations/9714'));
    // print_r($woocommerce->get('orders?per_page=100'));
    // print_r($woocommerce->get('orders?per_page=25'));

    // $id_pedido_woo = '11546';
    $id_pedido_woo = '11562';
    // $data_productos[] = array();

    // foreach ($json['line_items'] as $item)
    // {
    //     $codigo = $item['sku'];
    //     $id_producto = $item['product_id'];
    //     $sql = "SELECT kilos FROM stock WHERE codigo = '$codigo'";
    //     $resultado = mysqli_query($conexion,$sql);
    //     if($filas = mysqli_fetch_array($resultado))
    //     {
    //         $data = [
    //             'update' => 
    //             [
    //                 [
    //                     'id' => $id_pedido_woo,
    //                     'line_items' => 
    //                     [
    //                         [
    //                             'id' => $id_producto,
    //                             'quantity' => $kilos = $filas['kilos']
    //                         ]
    //                     ]
    //                 ]
    //             ]
    //         ];
    //     }  
        
    //     print_r($woocommerce->post('orders/batch', $data));
    // }

    // $pedido = $woocommerce->get('orders/'.$id_pedido_woo);
    // $json_pedido = json_decode(json_encode($pedido), true);
    // foreach($json_pedido['line_items'] as $item)
    // {
    //     $id_producto_pedido = $item['id'];
    //     $id_producto = $item['product_id'];
    //     $sku = $item['sku'];

    //     $sql="SELECT kilos FROM productos WHERE cod_stock = '$sku' AND codigo = '$id'";
    //     $resultado=mysqli_query($conexion,$sql);
    //     if($filas = mysqli_fetch_array($resultado))
    //     {
    //         $kilos = $filas['kilos'];
    //     }

    //     $productos = $woocommerce->get('products/'.$id_producto);
    //     $precio_por_kilo = $productos->meta_data[166]->value;
    //     $precio_final = $precio_por_kilo * $kilos;

    //     $line_items[] = array(                  
    //         'id' => $id_producto_pedido,
    //         'meta_data' =>
    //         [
    //             [
    //                 'key' => 'peso recalculado',
    //                 'value' => $kilos,                                  
    //             ],
    //             [
    //                 'key' => 'precio recalculado',
    //                 'value' => $precio_final,                                  
    //             ]
    //         ]                        
    //     );
    // }

    // $data = [
    //     'update' => 
    //     [
    //         [
    //             'id' => $id_pedido_woo,
    //             'line_items' => $line_items 
    //         ]
    //     ]
    // ];

    // print_r($data);
    // print_r($woocommerce->post('orders/batch', $data));


    // UPDATE
    
    $productos = $woocommerce->get('orders/'.$id_pedido_woo);

    print_r($productos);
    $json = json_decode(json_encode($productos), true);
    //10978
    //10193

    // $productos = $woocommerce->get('products/10978');
    // print_r($precio_por_kilo = $productos->meta_data);



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