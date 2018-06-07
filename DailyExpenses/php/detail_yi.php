<?php   
include_once('mysql.php');

function selectBillDetailyi($data){
	$D=new myDataBase();
	$connID=$D->dataBase();  

	if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];

		if($data['date']&&$data['date']!=null&&!empty($data['date'])){
			$date=$data['date'];
		
			$sql="SELECT * FROM	bill WHERE	userId = '$userId' AND	bdate LIKE '$date%' order by bdate desc,id desc";
			$query=$connID->query($sql); 
			$arr = array();  
			if($query){
				while($result=mysqli_fetch_array($query)) {  
					$count=count($result);
				    for($i=0;$i<$count;$i++){  
				        unset($result[$i]); 
				    }
				    array_push($arr,$result);
				} 	    
				echo urldecode(json_encode(array('resultCode' => "Y",'dataList'=>$arr))); 
			}else{
				echo urldecode(json_encode(array('resultCode' => "N",'error' => mysql_error($connID),"yi" => $sql)));
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => mysql_error($connID),"yi" => $data)));
		}
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
}

selectBillDetailyi($_POST["data"]);

?>  
