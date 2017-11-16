
<?php   

$GLOBALS['host']="bdm294739608.my3w.com:3306";  
$GLOBALS['userName']="bdm294739608";  
$GLOBALS['password']="asdf1234";  
$GLOBALS['dbName']="bdm294739608_db";  

$apiType=$_POST["type"];



function selectUser(){
	$connID=mysqli_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password']);  
	mysqli_select_db($connID,$GLOBALS['dbName']);  
	mysqli_query($connID,"set names gbk");  

	$query=mysqli_query($connID,"select * from bill");  
	$arr = array();
	while($result=mysqli_fetch_array($query)) {  
		$count=count($result);
	    for($i=0;$i<$count;$i++){  
	        unset($result[$i]); 
	    }
	    array_push($arr,$result);
	}  
	$json=json_encode(array('dataList'=>$arr));
	echo $json; 
}

function insertUser($userInfo) {
	if($userInfo){
		$connID=mysqli_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password']);  
		mysqli_select_db($connID,$GLOBALS['dbName']);  
		mysqli_query($connID,"set names gbk"); 

		$query=mysqli_fetch_array(mysqli_query($connID,"select max(id) as id from user"));   
	  	$id=$query['id']+1;  
		$user_name=$userInfo['name'];
		$user_pwd=$userInfo['pwd'];
	  	$sql = "INSERT INTO user (id, user_name, user_pwd) 
	  	VALUES ('$id','$user_name','$user_pwd')";
		if (mysqli_query($connID,$sql) == TRUE) {
			echo '{"code":"Y"}';
		} else {
			echo '{"code":"N"}';
		}
	}else{
		echo '{"code":"N","message":"参数不正确"}';
	}
	
}

if($apiType == "selectUser"){
	selectUser();
}else if($apiType == "insertUser"){
	insertUser($_POST["userInfo"]);
}


?>  
