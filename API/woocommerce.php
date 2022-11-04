<?php

    require __DIR__ . '/vendor/autoload.php';

    use Automattic\WooCommerce\Client;

    $woocommerce = new Client(
        'https://club.ohrapampa.com/', 
        // 'https://clubtest.ohrapampa.com/',
        // 'ck_919cf97820fe782c1f2cae53f4546fbbae008ffa', 
        'ck_c02d04d41d5693afdc829691841d78423a8e11ca', 
        'cs_484584ca8ae14f56728d9a9e968367c577491d5d',
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