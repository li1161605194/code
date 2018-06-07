<?php
header("Content-type: text/html; charset=utf-8");
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

/**
 * upload  图片上传
 */
class upload_lst {
	public function upload_img_temp($file_param) {
		if ($file_param["error"]) {
			return array('resultCode' => "N", 'error' => $file_param["error"]);
		} else {
			//控制上传文件的类型，大小
			if (($file_param["type"] == "image/jpeg" || $file_param["type"] == "image/jpg" || $file_param["type"] == "image/png") && $file_param["size"] < 1024000) {
				//判断文件是否存在
				if (file_exists($filesrc)) {
					return array('resultCode' => "N", 'error' => "该文件已存在！");
				} else {
					$img = file_get_contents($file_param["tmp_name"]);
					//$img = file_get_contents("https://m.hzqcjt.com/file/photo2/null/325e8aa38be949139f89cd79b2365163.jpg");//行驶证图片
					$img = base64_encode($img);
					return array('resultCode' => "Y", "data" => $img);
				}
			} else {
				return array('resultCode' => "N", 'error' => "文件类型不正确！");
			}
		}
	}
	public function upload_img($file_param) {
		$c_e = new c_lst();
		$mysql_e = new mysql_lst();
		if ($file_param["error"]) {
			echo urldecode(json_encode(array('resultCode' => "N", 'error' => $file_param["error"])));
		} else {
			//控制上传文件的类型，大小
			if (($file_param["type"] == "image/jpeg" || $file_param["type"] == "image/jpg" || $file_param["type"] == "image/png") && $file_param["size"] < 1024000) {
				//找到文件存放的位置
				$filetype = explode(".", $file_param["name"]);
				$filename = $c_e->now_hs() . "." . $filetype[1];
				$BASE_PATH = str_replace('\\', '/', realpath(dirname(__FILE__) . '/')) . "/";
				$filesrc = $BASE_PATH . "files/" . $filename;

				//转换编码格式
				$filename = iconv("gb2312", "UTF-8", $filename);
				$filesrc = iconv("gb2312", "UTF-8", $filesrc);

				//判断文件是否存在
				if (file_exists($filesrc)) {
					echo urldecode(json_encode(array('resultCode' => "N", 'error' => "该文件已存在！")));
				} else {
					//保存文件
					$img = file_get_contents($file_param["tmp_name"]);
					$img = base64_encode($img);
					move_uploaded_file($file_param["tmp_name"], $filesrc);
					$id = $mysql_e->insert_data("file", $d);
					$d = array(
						"fileid" => $id,
						"src" => $filesrc,
						"name" => $filename,
					);
					echo urldecode(json_encode(array('resultCode' => "Y", "file" => $d, 'data' => $img)));
				}
			} else {
				echo urldecode(json_encode(array('resultCode' => "N", 'error' => "文件类型不正确！")));
			}
		}
	}
}

?>