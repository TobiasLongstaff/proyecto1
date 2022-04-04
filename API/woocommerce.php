<?php

    require __DIR__ . '/vendor/autoload.php';

    use Automattic\WooCommerce\Client;

    $woocommerce = new Client(
        'https://club.ohrapampa.com/', 
        // 'ck_919cf97820fe782c1f2cae53f4546fbbae008ffa', 
        'ck_919cf97820fe782c1f2cae53f4546fbbae008ffa', 
        'cs_19a3a2daeb86b4e9b79cb53b2a52ed37fd323d14',
        [
            'version' => 'wc/v3',
        ]
    );

    // function buscar_producto($sku_producto, $productos)
    // {
    //     // $sku_producto = 'S4100003007';
    //     foreach ($productos as $product)
    //     {
    //         if($product->sku == $sku_producto)
    //         {
    //             $datos_producto = array(
    //                 'id' => $product->id,
    //                 'paso' => $product->weight,
    //                 'stock' => $product->stock_quantity
    //             );
    //             return $datos_producto;
    //         }
    //     }
    // }

?>