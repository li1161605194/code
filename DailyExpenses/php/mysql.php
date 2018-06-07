<?php   
session_start();
Class myDataBase{
	function dataBase(){
		$GLOBALS['host']="47.100.163.55";  
		$GLOBALS['userName']="root";  
		$GLOBALS['password']="123456";  
		$GLOBALS['dbName']="lstaiyg";  
		
		/*$connID=mysql_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password']);  
		if($connID){
			mysql_select_db($GLOBALS['dbName'],$connID);  
			mysql_query("set names utf8",$connID);  
			return $connID;
		}else{
			return die(mysql_error());
		}*/

		$link = mysqli_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password'], $GLOBALS['dbName']);

		if (!$link) {
		    echo "Error: Unable to connect to MySQL." . PHP_EOL;
		    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
		    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
		    exit;
		}else{
			if (!mysqli_set_charset($link, "utf8")) {
			    //printf("Error loading character set utf8: %s\n", mysqli_error($link));
			} else {
			    //printf("Current character set: %s\n", mysqli_character_set_name($link));
			}

			return $link;
		}
	}
	
}

?> 