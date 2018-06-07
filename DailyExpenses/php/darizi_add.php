<?php

header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');
include_once '../../php/common.class.php';
include_once '../../php/mysqli.class.php';

function insertBill($dataParams) {
	if ($dataParams) {
		if (isset($_SESSION['uid']) && $_SESSION['uid'] && $_SESSION['uid'] != "" && $_SESSION['uid'] != null) {
			$mysql_c = new mysql_lst();
			$date = $dataParams['date'];
			$remark = $dataParams['remark'];
			$userId = $_SESSION['uid'];
			$data = array(
				"shijian" => $date,
				"remark" => $remark,
				"a" => $userId,
				"b" => "",
				"c" => "",
			);
			$result = $mysql_c->insert_data("darizi", $data);
			if ($result) {
				echo '{"resultCode":"Y"}';
			} else {
				echo urldecode(json_encode(array('resultCode' => "N", 'error' => "请刷新")));
			}
		} else {
			echo urldecode(json_encode(array('resultCode' => "N", 'error' => "请重新打开")));
		}
	} else {
		echo urldecode(json_encode(array('resultCode' => "N", 'error' => "请重新登录")));
	}

}

insertBill($_POST["data"]);

?>
