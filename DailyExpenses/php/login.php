<?php   
include_once('mysql.php');

	function loginStatu(){
		if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=null){
			$D=new myDataBase();
			$connID=$D->dataBase();  
			$userId=$_SESSION['uid'];
			$sql = "SELECT * FROM user WHERE id='$userId'";
			$query=mysql_query($sql,$connID); 
			if($query){
				$result=mysql_fetch_object($query);
				if($_SESSION['user_code']==$result ->user_code){
					$href=$result ->code_href;
				}else{
					$href=$result ->href;
				} 
				$uid=$result ->id;
				$_SESSION['uid']=$uid;
				echo urldecode(json_encode(array('resultCode' => "Y",'href' => $href)));
			}else{
				echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
		}
	}

	function loginOut(){
		$_SESSION['user_name']=null;
		$_SESSION['user_password']=null;
		$_SESSION['user_code']=null;
		$_SESSION['uid']=null;
		echo urldecode(json_encode(array('resultCode' => "Y",'msg' => "退出成功")));
	}

	function selectUser($dataParams){
		$user_name=$dataParams['user_name'];
		$user_password=$dataParams['user_password'];
		$user_code=$dataParams['user_code'];
		$D=new myDataBase();
		$connID=$D->dataBase();  
		$sql = "SELECT * FROM user WHERE user_name='$user_name' AND user_pwd='$user_password' AND user_code='$user_code'";
		$query=mysql_query($sql,$connID); 
		if($query){
			$_SESSION['user_name']=$user_name;
			$_SESSION['user_password']=$user_password;
			$_SESSION['user_code']=$user_code;
			$result=mysql_fetch_object($query);
			if($user_code==$result ->user_code){
				$href=$result ->code_href;
			}else{
				$href=$result ->href;
			} 
			$uid=$result ->id;
			$_SESSION['uid']=$uid;
			echo urldecode(json_encode(array('resultCode' => "Y",'href' => $href)));
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
		}
	}

	function loginInit($dataParams){
		if($dataParams&&$dataParams!=null){
			if($dataParams["type"]&&$dataParams["type"]=="login"){
				selectUser($dataParams);
			}else if($dataParams["type"]&&$dataParams["type"]=="loginagin"){
				loginStatu();
			}else if($dataParams["type"]&&$dataParams["type"]=="loginout"){
				loginOut();
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
		}
	}

	loginInit($_POST["data"]);

?>  
