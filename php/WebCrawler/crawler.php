<?php

header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

    $url = $_POST["url"];
    if($url){

    }else{
        $url ="http://www.xincheping.com/car/";
    }
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER,0);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER,1);//禁止调用时就输出获取到的数据
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION,1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($curl, CURLOPT_SSL_VERIFYHOST,false);
    $res=curl_exec($curl);
    curl_close($curl);

    //$content = json_decode($res);
    //$content_arr = objtoarr($content);
    $res=mb_convert_encoding($res, 'UTF-8', 'UTF-8,GBK,GB2312,BIG5');
    echo $res; 
?>