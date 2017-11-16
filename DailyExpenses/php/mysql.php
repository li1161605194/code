<?php   
session_start();
Class myDataBase{
	function dataBase(){
		$GLOBALS['host']="bdm294739608.my3w.com:3306";  
		$GLOBALS['userName']="bdm294739608";  
		$GLOBALS['password']="asdf1234";  
		$GLOBALS['dbName']="bdm294739608_db";  
		
		$connID=mysql_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password']);  
		if($connID){
			mysql_select_db($GLOBALS['dbName'],$connID);  
			mysql_query("set names utf8",$connID);  
			return $connID;
		}else{
			return die(mysql_error());
		}
	}
	
}

?> 