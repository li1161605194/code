<?php
header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

include '../../php/common.class.php';
include '../../php/mysqli.class.php';
include '../../php/upload/upload.class.php';
include '../../php/ocr/bd_ocr.class.php';
include '../../php/ocr/qq_ocr.class.php';
$c = new c_lst();
$m = new mysql_lst();
$u = new upload_lst();
$b = new bd_ocr_lst();
$q = new qq_ocr_lst();

/**
 * 图片上传识别图片信息
 */

$uploadType = $_POST["upload_type"];
$uploadFile = $_FILES["file"];
$ocrType = $_POST["ocr_type"];
$ocrAi = $_POST["ocr_ai"];

if ($c->null_empty($uploadFile)) {
	if ($c->null_empty($uploadType) && $uploadType == 1) {
//临时文件对象  不存储图片
		$file_res = $u->upload_img_temp($uploadFile);
	} else if ($c->null_empty($uploadType) && $uploadType == 2) {
//保存到服务器  和数据库存储路径
		$file_res = $u->upload_img($uploadFile);
	}
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
	echo urldecode(json_encode(array('resultCode' => "N", 'error' => "图片未上传")));
}

?>