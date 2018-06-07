<?php   
include_once('mysql.php');

function deleteBill($data){
	$D=new myDataBase();
	$connID=$D->dataBase();  

	if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];

		if($data['bid']&&$data['bid']!=null){
			$bid=$data['bid'];
		
			$sql="DELETE FROM bill WHERE id = '$bid'";

			$query=$connID->query($sql);  
			if($query){    
				echo urldecode(json_encode(array('resultCode' => "Y","resultMessage"=>"删除成功"))); 
			}else{
				echo urldecode(json_encode(array('resultCode' => "N",'error' => $sql,'error2' => mysql_error($connID))));
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请刷新页面")));
		}
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
}

deleteBill($_POST["data"]);

?>  
