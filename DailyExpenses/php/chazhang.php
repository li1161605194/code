<?php   
include_once('mysql.php');

function selectBill($data){
	$D=new myDataBase();
	$connID=$D->dataBase();  

	if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];

		if($data['type']&&$data['type']!=null){
			$type=$data['type'];
			$typeA = implode(",", $type);
			$typesql="AND type IN ($typeA)";
		}else{
			$typesql="";
		}
		if($data['money']&&$data['money']!=null){
			$money=$data['money'];
			$moneyA=explode('-',$money); 
			$moneysql="AND bmoney BETWEEN $moneyA[0] and $moneyA[1]";
		}else{
			$moneysql="";
		}
		if($data['year']&&$data['year']!=null){
			$year=$data['year'];
			$yearsql="AND bdate LIKE '$year-%'";
		}else{
			$year=date("Y");
			$yearsql="";
		}
		if($data['month']&&$data['month']!=null){
			$month=$data['month'];
			$monthsql="AND bdate LIKE '%-$month-%'";
		}else{
			$month=date("m");
			$monthsql="";
		}
		if($data['pageNum']&&$data['pageNum']!=null){
			$pageNum=$data['pageNum'];
		}else{
			$pageNum=1;
		}
		$num=($pageNum-1)*10;
		$pageNumsql="LIMIT $num,10";

		$totalNum=mysql_query("SELECT COUNT(*) AS totalNum FROM bill WHERE userId = '$userId' ".$typesql." ".$moneysql." ".$yearsql." ".$monthsql,$connID);
		if($totalNum){
			$a=mysql_fetch_object($totalNum);
			$a=$a->totalNum;

			$sql="SELECT * FROM bill WHERE userId = '$userId' ".$typesql." ".$moneysql." ".$yearsql." ".$monthsql." order by bdate desc,id desc"." ".$pageNumsql;

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
				echo urldecode(json_encode(array('resultCode' => "Y",'dataList'=>$arr,"totalNum"=>$a,"a"=>$_SESSION['user_name'],"b"=>$_SESSION['user_password']))); 
			}else{
				echo urldecode(json_encode(array('resultCode' => "N",'error' => $sql)));
			}
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => mysql_error($connID))));
		}
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
}

selectBill($_POST["data"]);

?>  
