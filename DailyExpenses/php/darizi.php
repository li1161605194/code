<?php   
header("Content-type: text/html; charset=utf-8"); 
include_once('mysql.php');

function selectBill($data){
	$D=new myDataBase();
	$connID=$D->dataBase();  

	if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];
		$sql="SELECT * FROM darizi order by shijian desc";
		$query = mysqli_query($connID,$sql);  
		if (!$query) {
			echo urldecode(json_encode(array('resultCode' => "N",'sqlerror'=>mysqli_error($connID),'error' => $sql)));
		    exit();
		}
		$rows = array();
        while($row=mysqli_fetch_array($query,MYSQLI_BOTH)){
        	$remark="";
        	if(!empty($row["remark"])&&!is_null($row["remark"])){
        		$remark=$row["remark"];
        	}else{
				$remark="-";
        	}
            array_push($rows,array(
            	'id' => $row["id"] ,
            	'remark' => $remark ,
            	'shijian' => $row["shijian"]
            ));
        }
        mysqli_free_result($query);   
		echo urldecode(json_encode(array('resultCode' => "Y",'dataList'=>$rows,"a"=>$_SESSION['user_name'],"b"=>$_SESSION['user_password']))); 
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
}

selectBill($_POST["data"]);

?>  
