<?php   
include_once('mysql.php');

	function updateusername($dataParams){
		if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=null){
			$username=$dataParams['username'];
			if($username&&$username!=""&&$username!=null){
				$D=new myDataBase();
				$connID=$D->dataBase();  
				$userId=$_SESSION['uid'];
				$sql_username="SELECT COUNT(*) AS num FROM `user` WHERE user_name='$username'";
				$query_u=$connID->query($sql_username); 
				$result_u=mysqli_fetch_object($query_u);
				$same_num=$result_u -> num; 
				if($same_num&&$same_num==0){
					$sql = "UPDATE `user` SET user_name = '$username' WHERE id='$userId'";
					$query=$connID->query($sql); 
					if($query){
						echo urldecode(json_encode(array('resultCode' => "Y",'msg' => "用户名修改成功")));
					}else{
						echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
					}
				}else{
					echo urldecode(json_encode(array('resultCode' => "N",'error' => "该用户名已存在")));
				}
			}else{
				echo urldecode(json_encode(array('resultCode' => "N",'error' => "用户名必须填写")));
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
		}
	}

	function updateuserpwd($dataParams){
		$user_name=$dataParams['user_name'];
		$user_password=$dataParams['user_password'];
		$user_code=$dataParams['user_code'];
		$D=new myDataBase();
		$connID=$D->dataBase();  
		$sql = "SELECT * FROM user WHERE user_name='$user_name' AND user_pwd='$user_password' AND user_code='$user_code'";
		$query=$connID->query($sql); 
		if($query){
			$_SESSION['user_name']=$user_name;
			$_SESSION['user_password']=$user_password;
			$_SESSION['user_code']=$user_code;
			$result=mysqli_fetch_object($query);
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

	function shezhiInit($dataParams){
		if($dataParams&&$dataParams!=null){
			if($dataParams["type"]&&$dataParams["type"]=="username"){
				updateusername($dataParams);
			}else if($dataParams["type"]&&$dataParams["type"]=="userpwd"){
				updateuserpwd();
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新打开")));
		}
	}

	shezhiInit($_POST["data"]);

?>  
