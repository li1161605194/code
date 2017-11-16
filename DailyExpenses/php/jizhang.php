<?php   
include_once('mysql.php');

function insertBill($dataParams) {
	if($dataParams){
		$D=new myDataBase();
		$connID=$D->dataBase();  

		if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];

			$query=mysql_fetch_array(mysql_query("select max(id) as id from bill",$connID));   
		  	$id=$query['id']+1;  
			$type=$dataParams['type'];
			$paytype=$dataParams['paytype'];
			$da_type=$dataParams['da_type'];
			$money=$dataParams['money'];
			$date=$dataParams['date'];
			$remark=$dataParams['remark'];
		  	$sql = "INSERT INTO bill (id, datype, type, paytype, bmoney, userId, bdate, remark) 
		  	VALUES ('$id', '$da_type', '$type', '$paytype', '$money', '$userId', '$date', '$remark')";
			if (mysql_query($sql,$connID) == TRUE) {
				echo '{"resultCode":"Y"}';
			} else {
				echo urldecode(json_encode(array('resultCode' => "N",'error' => "请刷新","code"=>array($sql, $id,$type,$da_type,$money,$userId,$date,$remark))));
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新打开")));
		}
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
	
}

insertBill($_POST["data"]);

?>  
