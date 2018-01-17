<?php

function send_post($url, $post_data) {

  $postdata = http_build_query($post_data);
  $options = array(
    'http' => array(
      'method' => 'POST',
      'header' => 'Content-type:application/x-www-form-urlencoded',
      'content' => $postdata,
      'timeout' => 15 * 60 // 超时时间（单位:s）
    )
  );
  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);

	$getcontent = mb_convert_encoding($result, "gb2312", "utf-8");


  echo $getcontent;
}

//使用方法
$post_data = array(
  'loanStatus' => 0,
  'paymentMode' => 1,
  'durationScope' => 0,
  'page' => 2,
  'page_size' => 99
);

send_post('http://www.dididaivip.com/market/search-notes', $post_data);

//$url='http://www.dididaivip.com/market/search-notes';

//$contents = file_get_contents($url); 
//如果出现中文乱码使用下面代码 
//$getcontent = iconv("gb2312", "utf-8",$contents); 

//$getcontent = iconv("GBK", "UTF-8", $contents);

//$getcontent = mb_convert_encoding($contents, "gb2312", "utf-8");

//echo $contents; 

?>