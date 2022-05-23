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

    $id_pedido_woo = '11546';
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



    $data = [
        'update' => 
        [
            [
                'id' => $id_pedido_woo,
                'line_items' => 
                [
                    [
                        'id' => 6963,
                        'meta_data' =>
                        [
                            [
                                'id' => 52884,
                                'key' => 'peso recalculado',
                                'value' => 3.5,                                  
                            ]
                        ]                        
                    ]
                ]
            ]
        ]
    ];

    print_r($woocommerce->post('orders/batch', $data));
    
    // $productos = $woocommerce->get('orders/'.$id_pedido_woo);
    // print_r($json = json_decode(json_encode($productos), true));



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