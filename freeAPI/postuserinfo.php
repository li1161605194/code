<?php

$user_name = $_POST['user_name'];
$user_password = $_POST['user_password'];
$user_code = $_POST['user_code'];

$errorinfo = array(
	'success' => array (
  		'1214'=>'http://2.lst1.applinzi.com/',
  		'1'=>'http://1.lstcode.applinzi.com/freeAPI/web-im/index.html',
  		'2017'=>'http://1.lstcode.applinzi.com/freeAPI/web-im/index.html',
  		'2'=>'http://1.lstcode.applinzi.com/freeAPI/caimiyu.html',
  		'3'=>'http://1.lstcode.applinzi.com/freeAPI/xiaohua.html'
  	),
	'error' => array (
  		'1'=>'无法识别你是谁~~',
  		'2'=>'密码错误~~',
  		'3'=>'请联系管理员~'
  	)
);

$code = array(
	'cswa' => 'http://1.lstcode.applinzi.com/freeAPI/user/yangge.html',
	'king' => 'http://1.lstcode.applinzi.com/freeAPI/index.html',
	'man' => 'http://1.lstcode.applinzi.com/freeAPI/index.html'
);

$userinfo = array (
  '1214' => array ('yg','yangge','杨歌'),
  '1' => array ('lst','lishitao','李石涛'),
  '2017' => array ('gz','guozhen','郭震','guozi'),
  '2' => array ('lishitao')
);
/*echo json_encode($userinfo,true);*/

function JSON($array) {  
	foreach ( $array as $key => $value ) {  
        $array[$key] = urlencode ( $value );  
    }  
 	return urldecode ( json_encode ( $array ) );  
}  


if($userinfo[$user_password]){
	$a = in_array($user_name,$userinfo[$user_password]);
	if($a){
		if($code[$user_code]){
			echo urldecode(JSON(array('success' => $code[$user_code])));
		}else{
			echo urldecode(JSON(array('success' => $errorinfo['success'][$user_password])));
		}
	}else{
		echo urldecode(JSON(array('error' => $errorinfo['error']['1'])));
	}
}else{
	echo urldecode(JSON(array('error' => $errorinfo['error']['2'])));
}




?>