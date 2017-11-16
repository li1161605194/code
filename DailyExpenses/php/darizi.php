<?php   
include_once('mysql.php');

function selectBill($data){
	$D=new myDataBase();
	$connID=$D->dataBase();  

	if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];

		$sql="SELECT * FROM darizi order by shijian desc";

		$query=mysql_query($sql,$connID);  
		$arr = array();  
		if($query){
			while($result=mysql_fetch_array($query)) {  
				$count=count($result);
			    for($i=0;$i<$count;$i++){  
			        unset($result[$i]); 
			    }
			    array_push($arr,$result);
			} 	    
			echo urldecode(json_encode(array('resultCode' => "Y",'dataList'=>$arr,"a"=>$_SESSION['user_name'],"b"=>$_SESSION['user_password']))); 
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => $sql)));
		}
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
}

selectBill($_POST["data"]);

?>  
