<?php   
include_once('mysql.php');

function selectBillFenXi($data){
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
			SUM(IF ( type =11, bmoney, 0)) AS srgz,
			SUM(IF ( type =12, bmoney, 0)) AS srjz,
			SUM(IF ( type =13, bmoney, 0)) AS srhb,
			SUM(IF ( type =14, bmoney, 0)) AS srjl,
			SUM(IF ( type =15, bmoney, 0)) AS srqt,
			SUM(IF ( type =21, bmoney, 0)) AS zcfscd,
			SUM(IF ( type =22, bmoney, 0)) AS zcsccy,
			SUM(IF ( type =23, bmoney, 0)) AS zcjttq,
			SUM(IF ( type =24, bmoney, 0)) AS zcshjf,
			SUM(IF ( type =25, bmoney, 0)) AS zcrybh,
			SUM(IF ( type =26, bmoney, 0)) AS zchzmr,
			SUM(IF ( type =27, bmoney, 0)) AS zcqt,
			SUM(IF ( type =28, bmoney, 0)) AS zchb,
			SUM(IF ( type =29, bmoney, 0)) AS zcylyw,
			SUM(IF ( type =31, bmoney, 0)) AS jcysk,
			SUM(IF ( type =41, bmoney, 0)) AS jrwqk,
			SUM(IF ( paytype =11, bmoney, 0)) AS zffsxj,
			SUM(IF ( paytype =11.1, bmoney, 0)) AS zffszfb,
			SUM(IF ( paytype =11.2, bmoney, 0)) AS zffswx,
			SUM(IF ( paytype =12, bmoney, 0)) AS zffsyhk,
			SUM(IF ( paytype =13, bmoney, 0)) AS zffsxyk,
			SUM(IF ( paytype =14, bmoney, 0)) AS zffsmyhb,
			SUM(IF ( paytype =15, bmoney, 0)) AS zffsjdbt,
			SUM(IF ( paytype =16, bmoney, 0)) AS zffsqt,
			COUNT(*) AS count,
			DATE_FORMAT(bdate, '%Y') AS t
		FROM
			bill
		WHERE
			userId = '$userId' AND
			DATE_FORMAT(bdate, '%Y') = '$year'
		GROUP BY
			t
		ORDER BY t DESC";

		$sqlYear2="SELECT
			SUM(IF ( datype =1, bmoney, 0)) AS zongshouru,
			SUM(IF ( datype =2, bmoney, 0)) AS zongzhichu,
			SUM(IF ( datype =3, bmoney, 0)) AS zongjiechu,
			SUM(IF ( datype =4, bmoney, 0)) AS zongjieru,
			SUM(IF ( type =11, bmoney, 0)) AS srgz,
			SUM(IF ( type =12, bmoney, 0)) AS srjz,
			SUM(IF ( type =13, bmoney, 0)) AS srhb,
			SUM(IF ( type =14, bmoney, 0)) AS srjl,
			SUM(IF ( type =15, bmoney, 0)) AS srqt,
			SUM(IF ( type =21, bmoney, 0)) AS zcfscd,
			SUM(IF ( type =22, bmoney, 0)) AS zcsccy,
			SUM(IF ( type =23, bmoney, 0)) AS zcjttq,
			SUM(IF ( type =24, bmoney, 0)) AS zcshjf,
			SUM(IF ( type =25, bmoney, 0)) AS zcrybh,
			SUM(IF ( type =26, bmoney, 0)) AS zchzmr,
			SUM(IF ( type =27, bmoney, 0)) AS zcqt,
			SUM(IF ( type =28, bmoney, 0)) AS zchb,
			SUM(IF ( type =29, bmoney, 0)) AS zcylyw,
			SUM(IF ( type =31, bmoney, 0)) AS jcysk,
			SUM(IF ( type =41, bmoney, 0)) AS jrwqk,
			SUM(IF ( paytype =11, bmoney, 0)) AS zffsxj,
			SUM(IF ( paytype =11.1, bmoney, 0)) AS zffszfb,
			SUM(IF ( paytype =11.2, bmoney, 0)) AS zffswx,
			SUM(IF ( paytype =12, bmoney, 0)) AS zffsyhk,
			SUM(IF ( paytype =13, bmoney, 0)) AS zffsxyk,
			SUM(IF ( paytype =14, bmoney, 0)) AS zffsmyhb,
			SUM(IF ( paytype =15, bmoney, 0)) AS zffsjdbt,
			SUM(IF ( paytype =16, bmoney, 0)) AS zffsqt,
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
			SUM(IF ( type =11, bmoney, 0)) AS srgz,
			SUM(IF ( type =12, bmoney, 0)) AS srjz,
			SUM(IF ( type =13, bmoney, 0)) AS srhb,
			SUM(IF ( type =14, bmoney, 0)) AS srjl,
			SUM(IF ( type =15, bmoney, 0)) AS srqt,
			SUM(IF ( type =21, bmoney, 0)) AS zcfscd,
			SUM(IF ( type =22, bmoney, 0)) AS zcsccy,
			SUM(IF ( type =23, bmoney, 0)) AS zcjttq,
			SUM(IF ( type =24, bmoney, 0)) AS zcshjf,
			SUM(IF ( type =25, bmoney, 0)) AS zcrybh,
			SUM(IF ( type =26, bmoney, 0)) AS zchzmr,
			SUM(IF ( type =27, bmoney, 0)) AS zchb,
			SUM(IF ( type =28, bmoney, 0)) AS zcqt,
			SUM(IF ( type =29, bmoney, 0)) AS zcylyw,
			SUM(IF ( type =31, bmoney, 0)) AS jcysk,
			SUM(IF ( type =41, bmoney, 0)) AS jrwqk,
			SUM(IF ( paytype =11, bmoney, 0)) AS zffsxj,
			SUM(IF ( paytype =11.1, bmoney, 0)) AS zffszfb,
			SUM(IF ( paytype =11.2, bmoney, 0)) AS zffswx,
			SUM(IF ( paytype =12, bmoney, 0)) AS zffsyhk,
			SUM(IF ( paytype =13, bmoney, 0)) AS zffsxyk,
			SUM(IF ( paytype =14, bmoney, 0)) AS zffsmyhb,
			SUM(IF ( paytype =15, bmoney, 0)) AS zffsjdbt,
			SUM(IF ( paytype =16, bmoney, 0)) AS zffsqt,
			COUNT(*) AS count,
			DATE_FORMAT(bdate, '%Y-%m') AS t
		FROM
			bill
		WHERE
			userId = '$userId' AND
			DATE_FORMAT(bdate, '%Y-%m') = '$datetime'
		GROUP BY
			t
		ORDER BY t DESC";

		if($data['type']&&$data['type']!=null&&!empty($data['type'])&&$data['type']=="fullyear"){
			$query=mysql_query($sqlYear,$connID); 
		}else if($data['type']&&$data['type']!=null&&!empty($data['type'])&&$data['type']=="allmonth"){
			$query=mysql_query($sqlYear2,$connID); 
		}else if($data['type']&&$data['type']!=null&&!empty($data['type'])&&$data['type']=="onemonth"){
			$query=mysql_query($sqlMonth,$connID); 
		}else{
			$query=mysql_query($sqlYear2,$connID); 
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

selectBillFenXi($_POST["data"]);

?>  
