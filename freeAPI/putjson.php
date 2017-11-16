<?php
$url = "http://lstcode.applinzi.com/freeAPI/js/userinfo.json"; 
$ch = curl_init(); 
curl_setopt ($ch, CURLOPT_URL, $url); 
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT,10); 
$dxycontent = curl_exec($ch); 
echo $dxycontent; 

$data = array();
$data[0] = array('1','吴者然','onestopweb.cn');
$data[1] = array('2','何开','iteye.com');
// 把PHP数组转成JSON字符串
$json_string = json_encode($data);
// 写入文件
file_put_contents('http://lstcode.applinzi.com/freeAPI/js/userinfo.json', $json_string);
?>