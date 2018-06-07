<?php 
header("Content-type: text/html; charset=utf-8"); 
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

/**
* 数据库 链接  公共操作数据方法
*/
class mysql_lst 
{
	/**
	链接数据库
	@$database 数据库链接参数
	**/
	public function mysql_conn()
	{
		$c_e = new c_lst();
		if($c_e->null_empty($GLOBALS['host'])){
		}else{
			$GLOBALS['host']="47.100.163.55";  
			$GLOBALS['userName']="root";  
			$GLOBALS['password']="123456";  
			$GLOBALS['dbName']="lstaiyg";  
		}
		$link = mysqli_connect($GLOBALS['host'],$GLOBALS['userName'],$GLOBALS['password'], $GLOBALS['dbName']);
		if (!$link) {
		    printf("Error: Unable to connect to MySQL." . PHP_EOL);
		    printf("Debugging errno: " . mysqli_connect_errno() . PHP_EOL);
		    printf("Debugging error: " . mysqli_connect_error() . PHP_EOL);
		    exit;
		}else{
			if (!mysqli_set_charset($link, "utf8")) {
			    printf("Error loading character set utf8: %s\n", mysqli_error($link));
			    mysqli_close($connID);
			    exit;
			} else {
			}
			return $link;
		}
	}
	/**
	select查询数据
	@$tableName 数据库表名 必传字段
	@$value     返回的字段=表列名  默认全部 *
	@$sql_hz    需要做约束的查询条件语句
	**/
	public function select_data($tableName,$value='*',$sql_hz="")
	{
		$c_e = new c_lst();
		if($c_e->null_empty($tableName)){
			$connID=$this->mysql_conn();
			$sql="SELECT " .$value. " FROM " .$tableName. " " .$sql_hz;
			$query = mysqli_query($connID,$sql);  
			if (!$query) {
				printf(urldecode(json_encode(array('sqlerror'=>mysqli_error($connID),'error' => $sql))));
				mysqli_close($connID);
			    exit();
			}else{
				$rows = array();
		        while($row=mysqli_fetch_array($query,MYSQLI_BOTH)){
		        	$count=count($row);
		        	for($i=0;$i<$count;){
		        		unset($row[$i]);
		        		$i++;
		        	}
		        	array_push($rows,$row);
		        }
		        mysqli_free_result($query);   
		        mysqli_close($connID);
				return $rows;
			}
		}else{
			printf("Error: 缺少关键字段");
			exit;
		}
	}
	/**
	insert插入添加数据
	@$tableName 数据库表名 必传字段
	@$data     插入的数据  必传字段 (k1,k2,k3...) (v1,v2,v3...)
	@$type     唯一主键是否为id 是否自增  默认是id自增
	@$id    唯一主键
	**/
	public function insert_data($tableName,$data,$type=1,$id="id")
	{
		$c_e = new c_lst();
		if($c_e->null_empty($tableName)&&$c_e->null_empty($data)){
			$connID=$this->mysql_conn();
			$data=$c_e->insert_update_data($data);
			$key=$data["k"];
			$value=$data["v"];
			if($type==1){
				$sql="insert into " .$tableName. "(" .$key. ") values(" .$value. ")";
			}else if($type==2){
				$id_maxnum=mysqli_query($connID,"select max(" .$id. ") AS id from " .$tableName);
				$id_maxnum=mysqli_fetch_array($id_maxnum,MYSQLI_BOTH);
				$id_maxnum= floatval($id_maxnum["id"])+1;
				$sql="insert into " .$tableName. "(" .$id. "," .$key. ") values(" .$id_maxnum. "," .$value. ")";
			}
			$query = mysqli_query($connID,$sql);  
			if (!$query) {
				printf(urldecode(json_encode(array('sqlerror'=>mysqli_error($connID),'error' => $sql))));
				mysqli_close($connID);
			    exit();
			}else{
				$insert_id=mysqli_insert_id($connID);
				mysqli_close($connID);
				return $insert_id;
			}
		}else{
			printf("Error: 缺少关键字段");
			exit;
		}
	}
	/**
	update更新数据
	@$tableName 数据库表名 必传字段
	@$data     插入的数据  必传字段 (k1=v1,k2=v2,k3=v3...)
	@$sql_hz    需要做约束的查询条件语句
	**/
	public function update_data($tableName,$data,$sql_hz="")
	{
		$c_e = new c_lst();
		if($c_e->null_empty($tableName)&&$c_e->null_empty($data)){
			$connID=$this->mysql_conn();
			$data=$c_e->insert_update_data($data,2);
			$sql="update " .$tableName. " set " .$data. " " .$sql_hz;
			$query = mysqli_query($connID,$sql);  
			if (!$query) {
				printf(urldecode(json_encode(array('sqlerror'=>mysqli_error($connID),'error' => $sql))));
				mysqli_close($connID);
			    exit();
			}else{
				mysqli_close($connID);
				return $query;
			}
		}else{
			printf("Error: 缺少关键字段");
			exit;
		}
	}
	/**
	delete删除数据
	@$tableName 数据库表名 必传字段
	@$key     插入对应的字段=表列名  必传字段
	@$value     插入对应值  必传字段
	@$type     唯一主键是否为id 是否自增  默认是id自增
	@$id    唯一主键
	**/
	public function delete_data($tableName,$value,$key="id")
	{
		$c_e = new c_lst();
		if($c_e->null_empty($tableName)&&$c_e->null_empty($value)){
			$connID=$this->mysql_conn();
			$sql="delete from " .$tableName. " where " .$key. " = " .$value. " LIMIT 1";
			$query = mysqli_query($connID,$sql);  
			if (!$query) {
				printf(urldecode(json_encode(array('sqlerror'=>mysqli_error($connID),'error' => $sql))));
				mysqli_close($connID);
			    exit();
			}else{
				mysqli_close($connID);
				return $query;
			}
		}else{
			printf("Error: 缺少关键字段");
			exit;
		}
	}

}

?>