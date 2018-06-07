<?php 
header("Content-type: text/html; charset=utf-8"); 
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

/**
* common 
常用 公共方法 
*/
class c_lst
{	
	/**
	判断是否为空  
	不为空返回true  为空返回false
	**/
	public function null_empty($value='')
	{
		if(!empty($value)&&!is_null($value)){
			return true;
		}else{
			return false;
		}
	}
	/**
	得到当前时间的时间戳 
	@type=1默认为毫秒级  否则为秒
	**/
	public function now_hs($type=1) {
		if($type==1){
		    list($msec, $sec) = explode(' ', microtime());
		    $msectime =  (float)sprintf('%.0f', (floatval($msec) + floatval($sec)) * 1000);
		    return $msectime;
		}else{
			return strtotime(date('Y-m-d H:i:s', time()));
		}
	}
	/**
	将日期转为时间戳 
	@value默认为当前时间  
	@type=1默认为毫秒级  否则为秒
	**/
	public function date_to_hs($value="", $type=1)
	{
		if($this->null_empty($value)){}else{
			$value=date('Y-m-d H:i:s', time());
		}
		if($type==1){
			return floatval(strtotime($value))*1000;
		}else{
			return strtotime($value);
		}
	}
	/**
	将参数转换为sql参数
	@$array_data 必传参数
	 $array_data=array(
	 	key => value
	 )
	@type=1默认为insert  (k1,k2,k3...) (v1,v2,v3...)
		  2为update		  (k1=v1,k2=v2,k3=v3...)
	**/
	public function insert_update_data($array_data,$type=1)
	{
		if($this->null_empty($array_data)){
			$leg_num=count($array_data);
			$insert_data=array(
				"k" => "",
				"v" => ""
			);
			$update_data="";
			for($i=0;$i<$leg_num;$i++){
				$k=array_keys($array_data);
				$v=array_values($array_data);
				$insert_data["k"]=$insert_data["k"] .$k[$i]. ",";
				$insert_data["v"]=$insert_data["v"]. "'" .$v[$i]. "',";
				$update_data=$update_data .$k[$i]. "='" .$v[$i]. "',";
			}
			if($type==1){
				$insert_data["k"]=substr($insert_data["k"],0,-1);
				$insert_data["v"]=substr($insert_data["v"],0,-1);
				return $insert_data;
			}else if($type==2){
				$update_data=substr($update_data,0,-1);
				return $update_data;
			}
		}
	}
}

?>