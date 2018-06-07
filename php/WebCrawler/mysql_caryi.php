<?php
header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

include '../common.class.php';
include '../mysqli.class.php';

$c = new c_lst();

$GLOBALS['host']="47.100.163.55";  
$GLOBALS['userName']="root";  
$GLOBALS['password']="123456";  
$GLOBALS['dbName']="database"; 

$data = $_POST["data"];
$type = $_POST["type"];

function carBrandYi($data){
	$m = new mysql_lst();
	$m->mysql_conn();
	for($i=0;$i< count($data);$i++){
		$sql_data =array(
			"name" => $data[$i]["name"],
			"href" => $data[$i]["href"],
			"temp" => "",
			"remark" => "",
		);
		set_time_limit(0);
	    $m->insert_data("car_brand_yi",$sql_data,2);
	}
}
function carLineEr($data){
	$m = new mysql_lst();
	$m->mysql_conn();
	for($i=0;$i< count($data);$i++){
		$sql_data =array(
			"fjid" => $data[$i]["fjid"],
			"name" => $data[$i]["name"],
			"price" => $data[$i]["price"],
			"img" => $data[$i]["img"],
			"temp" => "",
			"remark" => "",
		);
		set_time_limit(0);
	    $m->insert_data("car_line_er",$sql_data,2);
	}
}

if ($c->null_empty($data)) {
	if($c->null_empty($type) && $type == 1){
		$jg= carBrandYi($data);
	}else if($c->null_empty($type) && $type == 2){
		$jg= carLineEr($data);
	}elseif ($c->null_empty($type) && $type == 5) {
		$json_string = json_encode($data);
		//file_put_contents('test.json', $json_string);
		$f = fopen("test.json","w") or die("fail to open");   
		$json_string=mb_convert_encoding($json_string, 'UTF-8', 'UTF-8,GBK,GB2312,BIG5');
	    fwrite($f,$json_string);   
	    fclose($f);
	}elseif ($c->null_empty($type) && $type == 6) {
		$json_string = file_get_contents('test.json');
		$jg = json_decode($json_string, true);
	}
	echo urldecode(json_encode(array('resultCode' => "Y", 'info' => "200",'hanzi' => "哈就开始的回味", 'res' => $jg)));
} else {
	echo urldecode(json_encode(array('resultCode' => "N", 'info' => "500")));
}

?>