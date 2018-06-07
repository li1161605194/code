<?php
header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

include 'common.class.php';
include 'mysqli.class.php';
include 'upload/upload.class.php';
include 'ocr/bd_ocr.class.php';
include 'ocr/qq_ocr.class.php';
$c = new c_lst();
$m = new mysql_lst();
$u = new upload_lst();
$b = new bd_ocr_lst();
$q = new qq_ocr_lst();

/**
 * 图片上传识别图片信息
 */
$uploadFile = $_POST["file"];
$ocrType = $_POST["ocr_type"];
$ocrAi = $_POST["ocr_ai"];

if ($c->null_empty($uploadFile)) {
	$img = file_get_contents($uploadFile);
	$img = base64_encode($img);
	$file_res=array(
		"data" => $img
	);
	if ($c->null_empty($ocrType) && $ocrType == "SFZ") {
		if ($c->null_empty($ocrAi) && $ocrAi == "bd"){
			$img_info = $b->IDCARD_bdocr(array(
				"zfm" => "front",
				"img" => $file_res["data"],
			));
		}else if ($c->null_empty($ocrAi) && $ocrAi == "qq"){
			$img_info = $q->IDCARD_bdocr(array(
				"img" => $file_res["data"]
			));
		}
	} else if ($c->null_empty($ocrType) && $ocrType == "YHK") {
		if ($c->null_empty($ocrAi) && $ocrAi == "bd"){
			$img_info = $b->BANKCARD_bdocr(array(
				"img" => $file_res["data"],
			));
		}else if ($c->null_empty($ocrAi) && $ocrAi == "qq"){
			$img_info = $q->BANKCARD_bdocr(array(
				"img" => $file_res["data"]
			));
		}
	} else if ($c->null_empty($ocrType) && $ocrType == "JSZ") {
		if ($c->null_empty($ocrAi) && $ocrAi == "bd"){
			$img_info = $b->DRIVERCARD_bdocr(array(
				"img" => $file_res["data"],
			));
		}else if ($c->null_empty($ocrAi) && $ocrAi == "qq"){
			$img_info = $q->DRIVERCARD_bdocr(array(
				"img" => $file_res["data"]
			));
		}
	} else if ($c->null_empty($ocrType) && $ocrType == "XSZ") {
		if ($c->null_empty($ocrAi) && $ocrAi == "bd"){
			$img_info = $b->XINGSHICARD_bdocr(array(
				"img" => $file_res["data"],
			));
		}else if ($c->null_empty($ocrAi) && $ocrAi == "qq"){
			$img_info = $q->XINGSHICARD_bdocr(array(
				"img" => $file_res["data"]
			));
		}
	} else if ($c->null_empty($ocrType) && $ocrType == "CHP") {
		if ($c->null_empty($ocrAi) && $ocrAi == "bd"){
			$img_info = $b->CARNUMBERCARD_bdocr(array(
				"img" => $file_res["data"],
			));
		}else if ($c->null_empty($ocrAi) && $ocrAi == "qq"){
			$img_info = $q->TONGYONGCARD_bdocr(array(
				"img" => $file_res["data"]
			));
		}
	}
	echo urldecode(json_encode(array('resultCode' => "Y", 'imginfo' => $img_info)));
} else {
	echo urldecode(json_encode(array('resultCode' => "N", 'error' => $uploadFile)));
}

?>