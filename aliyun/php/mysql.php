
<?php   

$GLOBALS['host']="bdm294739608.my3w.com:3306";  
$GLOBALS['userName']="bdm294739608";  
$GLOBALS['password']="asdf1234";  
$GLOBALS['dbName']="bdm294739608_db";  

$apiType=$_POST["type"];



function selectUser(){
	$connID=mysqli_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password']);  
	// 创建连接
	$conn = new mysqli($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password']);
	 
	// 检测连接
	if ($conn->connect_error) {
	    die("连接失败: " . $conn->connect_error);
	} 

	$sql = "SELECT * FROM user";
	$result = $conn->query($sql);
	 
	if ($result->num_rows > 0) {
	    // 输出数据
	    while($row = $result->fetch_assoc()) {
	        echo "id: " . $row["id"]. " - Name: " . $row["user_name"]. " " . $row["user_pwd"]. "<br>";
	    }
	} else {
	    echo "0 结果";
	}
	$conn->close();


	/*mysqli_select_db($connID,$GLOBALS['dbName']);  
	mysqli_query($connID,"set names gbk");  

	$query=mysqli_query($connID,"select * from user");  
	$arr = array();
	while($result=mysqli_fetch_array($query)) {  
		$count=count($result);
	    for($i=0;$i<$count;$i++){  
	        unset($result[$i]); 
	    }
	    array_push($arr,$result);
	}  
	$json=json_encode(array('dataList'=>$arr));
	echo $json; */
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
