<?php   
include_once('mysql.php');

function selectBill($data){
	$D=new myDataBase();
	$connID=$D->dataBase();  

	if(isset($_SESSION['uid'])&&$_SESSION['uid']&&$_SESSION['uid']!=""&&$_SESSION['uid']!=null){
		$userId=$_SESSION['uid'];

		if($data['year']&&$data['year']!=null&&!empty($data['year'])){
			$year=$data['year'];
		}else{
			$year=date("Y");
		}
		$datetime=$year."-".date("M");
		if($data['month']&&$data['month']!=null&&!empty($data['month'])){
			$month=$data['month'];
			$datetime=$year."-".$month;
		}

		$sqlYear="SELECT
			SUM(IF ( datype =1, bmoney, 0)) AS zongshouru,
			SUM(IF ( datype =2, bmoney, 0)) AS zongzhichu,
			SUM(IF ( datype =3, bmoney, 0)) AS zongjiechu,
			SUM(IF ( datype =4, bmoney, 0)) AS zongjieru,
			SUM(datype =1) AS zongshouruNum,
			SUM(datype =2) AS zongzhichuNum,
			SUM(datype =3) AS zongjiechuNum,
			SUM(datype =4) AS zongjieruNum,
			COUNT(*) AS count,
			DATE_FORMAT(bdate, '%Y-%m') AS t
		FROM
			bill
		WHERE
			userId = '$userId' AND
			DATE_FORMAT(bdate, '%Y') = '$year'
		GROUP BY
			t
		ORDER BY t DESC";

		$sqlMonth="SELECT
			SUM(IF ( datype =1, bmoney, 0)) AS zongshouru,
			SUM(IF ( datype =2, bmoney, 0)) AS zongzhichu,
			SUM(IF ( datype =3, bmoney, 0)) AS zongjiechu,
			SUM(IF ( datype =4, bmoney, 0)) AS zongjieru,
			SUM(datype =1) AS zongshouruNum,
			SUM(datype =2) AS zongzhichuNum,
			SUM(datype =3) AS zongjiechuNum,
			SUM(datype =4) AS zongjieruNum,
			COUNT(*) AS count,
			DATE_FORMAT(bdate, '%Y-%m-%d') AS t
		FROM
			bill
		WHERE
			userId = '$userId' AND
			DATE_FORMAT(bdate, '%Y-%m') = '$datetime'
		GROUP BY
			t
		ORDER BY t DESC";
		if($data['month']&&$data['month']!=null&&!empty($data['month'])){
			$query=mysql_query($sqlMonth,$connID); 
		}else{
			$query=mysql_query($sqlYear,$connID); 
		}
		$arr = array();  
		if($query){
			while($result=mysql_fetch_array($query)) {  
				$count=count($result);
			    for($i=0;$i<$count;$i++){  
			        unset($result[$i]); 
			    }
			    array_push($arr,$result);
			} 	    
			echo urldecode(json_encode(array('resultCode' => "Y",'dataList'=>$arr))); 
		}else{
			echo urldecode(json_encode(array('resultCode' => "N",'error' => mysql_error($connID),"yi" => $sqlYear,"er" => $sqlMonth)));
		}
	}else{
		echo urldecode(json_encode(array('resultCode' => "N",'error' => "请重新登录")));
	}
}

selectBill($_POST["data"]);

?>  
