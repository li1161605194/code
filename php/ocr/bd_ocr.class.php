<?php
header("Content-type: text/html; charset=utf-8"); 
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

/**
* baidu ai api
*/ 
class bd_ocr_lst
{
    /**
    php跨域post请求
    @$url 请求地址路径
    @$param  请求传参
    **/
    public function request_post($url,$param)
    {
        $curl = curl_init();//初始化curl
        curl_setopt($curl, CURLOPT_URL,$url);//抓取指定网页
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
        curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
        curl_setopt($curl, CURLOPT_POSTFIELDS, $param);
        $res = curl_exec($curl);//运行curl 
        curl_close($curl);
        $res=json_decode($res,true);
        return $res;
    }
    /**
    获取百度ocr access_token
    **/
    public function post_token()
    {
        $url="https://aip.baidubce.com/oauth/2.0/token";
        $param=array(
            "grant_type" => "client_credentials",
            "client_id" => "UmBlCW81seZ8WlERdIvZW4FO",
            "client_secret" => "Kl4F3rkxmtZcPvMUMAYv9pgYk8xjKta5"
        );
        $res=$this->request_post($url,$param);
        $access_token=$res["access_token"];
        return $access_token;
    }
    /**
    判断百度ocr access_token 是否存在数据库 是否过期
    **/
    public function access_token_get()
    {
        $c_e = new c_lst();
        $mysql_e = new mysql_lst();
        $db_token=$mysql_e->select_data("token");
        if(count($db_token)>0){
            $access_token=$db_token[0]["token"];
            $access_datetime=$db_token[0]["datetime"];
            $access_datetime=$c_e->date_to_hs($access_datetime,2);
            $datetime=date('Y-m-d H:i:s', time());
            if((floatval($c_e->date_to_hs($datetime,2))-floatval($access_datetime))<2591000){
                return $access_token;
            }else{
                $access_token=$this->post_token();
                $data=array(
                    "token" => $access_token,
                    "datetime" => $datetime
                );
                $mysql_e->update_data("token",$data);
                return $access_token;
            }
        }else if(count($db_token)==0){
            $datetime=date('Y-m-d H:i:s', time());
            $access_token=$this->post_token();
            $data=array(
                "token" => $access_token,
                "datetime" => $datetime
            );
            $mysql_e->insert_data("token",$data);
            return $access_token;
        }
    }
    /**
    身份证识别
    @$param  参数
    **/
    public function IDCARD_bdocr($param)
    {
        $data = array(
            "access_token" => $this->access_token_get(),
            "detect_risk" => true, //是否检测图片类型  复印  扫描  原件。。。
            "id_card_side" => $param["zfm"],//front：身份证含照片的一面；back：身份证带国徽的一面
            "image" => $param["img"]
        );
        $url="https://aip.baidubce.com/rest/2.0/ocr/v1/idcard";
        $res=$this->request_post($url,$data);
        return $res;
    }   
    /**
    银行卡识别
    @$param  参数
    **/
    public function BANKCARD_bdocr($param)
    {
        $data = array(
            "access_token" => $this->access_token_get(),
            "image" => $param["img"]
        );
        $url="https://aip.baidubce.com/rest/2.0/ocr/v1/bankcard";
        $res=$this->request_post($url,$data);
        return $res;
    }   
    /**
    驾驶证识别
    @$param  参数
    **/
    public function DRIVERCARD_bdocr($param)
    {
        $data = array(
            "access_token" => $this->access_token_get(),
            "detect_direction" => true, //是否检测图片朝向 
            "unified_valid_period" => true, //归一化格式输出
            "image" => $param["img"]
        );
        $url="https://aip.baidubce.com/rest/2.0/ocr/v1/driving_license";
        $res=$this->request_post($url,$data);
        return $res;
    }  
    /**
    行驶证识别
    @$param  参数
    **/
    public function XINGSHICARD_bdocr($param)
    {
        $data = array(
            "access_token" => $this->access_token_get(),
            "detect_direction" => true, //是否检测图片朝向 
            "image" => $param["img"]
        );
        $url="https://aip.baidubce.com/rest/2.0/ocr/v1/vehicle_license";
        $res=$this->request_post($url,$data);
        return $res;
    }  
    /**
    车牌识别
    @$param  参数
    **/
    public function CARNUMBERCARD_bdocr($param)
    {
        $data = array(
            "access_token" => $this->access_token_get(),
            "multi_detect" => false, //是否检测多张车牌
            "image" => $param["img"]
        );
        $url="https://aip.baidubce.com/rest/2.0/ocr/v1/license_plate";
        $res=$this->request_post($url,$data);
        return $res;
    }  
}
?>