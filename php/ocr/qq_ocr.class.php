<?php
header("Content-type: text/html; charset=utf-8"); 
error_reporting(E_ALL ^ E_NOTICE);
date_default_timezone_set('PRC');

/**
* qq ai api
*/ 

class qq_ocr_lst
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
    // getReqSign ：根据 接口请求参数 和 应用密钥 计算 请求签名
    // 参数说明
    //   - $params：接口请求参数（特别注意：不同的接口，参数对一般不一样，请以具体接口要求为准）
    //   - $appkey：应用密钥
    // 返回数据
    //   - 签名结果
    public function getReqSign($params)
    {
        $appkey="RFS4li7KbiZ2Cy15";
        // 1. 字典升序排序
        ksort($params);
        // 2. 拼按URL键值对
        $str = '';
        foreach ($params as $key => $value)
        {
            if ($value !== '')
            {
                $str .= $key . '=' . urlencode($value) . '&';
            }
        }
        // 3. 拼接app_key
        $str .= 'app_key=' . $appkey;
        // 4. MD5运算+转换大写，得到请求签名
        $sign = strtoupper(md5($str));
        return $sign;
    }
    // doHttpPost ：执行POST请求，并取回响应结果
    // 参数说明
    //   - $url   ：接口请求地址
    //   - $params：完整接口请求参数（特别注意：不同的接口，参数对一般不一样，请以具体接口要求为准）
    // 返回数据
    //   - 返回false表示失败，否则表示API成功返回的HTTP BODY部分
    function doHttpPost($url, $data)
    {
        $params = $this->signParam($data);
        $curl = curl_init();

        $response = false;
        do
        {
            // 1. 设置HTTP URL (API地址)
            curl_setopt($curl, CURLOPT_URL, $url);

            // 2. 设置HTTP HEADER (表单POST)
            $head = array(
                'Content-Type: application/x-www-form-urlencoded'
            );
            curl_setopt($curl, CURLOPT_HTTPHEADER, $head);

            // 3. 设置HTTP BODY (URL键值对)
            $body = http_build_query($params);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $body);

            // 4. 调用API，获取响应结果
            curl_setopt($curl, CURLOPT_HEADER, false);
            curl_setopt($curl, CURLOPT_NOBODY, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            $response = curl_exec($curl);
            if ($response === false)
            {
                $response = false;
                break;
            }

            $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            if ($code != 200)
            {
                $response = false;
                break;
            }
        } while (0);
        curl_close($curl);
        $response=json_decode($response,true);
        return $response;
    }

    public function signParam($data){
        $params = array(
            'app_id'     => '1106826852',
            'time_stamp' => strval(time()),
            'nonce_str'  => strval(rand()),
            'sign'       => '',
        );
        $params=array_merge($data,$params);
        $params['sign'] = $this->getReqSign($params);
        return $params;
    }

    /**
    身份证识别
    @$param  参数
    **/
    public function IDCARD_bdocr($param)
    {
        $data = array(
            'image' => $param["img"]
        );
        $url = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_creditcardocr';
        $res = $this->doHttpPost($url, $data);
        return $res;
    }   
    /**
    银行卡识别
    @$param  参数
    **/
    public function BANKCARD_bdocr($param)
    {
        $data = array(
            'image' => $param["img"]
        );
        $url = 'https://api.ai.qq.com/fcgi-bin/ocr/ocr_creditcardocr';
        $res = $this->doHttpPost($url, $data);
        return $res;
    }   
    /**
    驾驶证识别
    @$param  参数
    **/
    public function DRIVERCARD_bdocr($param)
    {
        $data = array(
            "type" => 1, 
            "image" => $param["img"]
        );
        $url='https://api.ai.qq.com/fcgi-bin/ocr/ocr_driverlicenseocr';
        $res = $this->doHttpPost($url, $data);
        return $res;
    }  
    /**
    行驶证识别
    @$param  参数
    **/
    public function XINGSHICARD_bdocr($param)
    {
        $data = array(
            "type" => 0, 
            "image" => $param["img"]
        );
        $url='https://api.ai.qq.com/fcgi-bin/ocr/ocr_driverlicenseocr';
        $res = $this->doHttpPost($url, $data);
        return $res;
    }  
    /**
    通用识别 //车牌识别
    @$param  参数
    **/
    public function TONGYONGCARD_bdocr($param)
    {
        $data = array(
            "image" => $param["img"]
        );
        $url="https://api.ai.qq.com/fcgi-bin/ocr/ocr_generalocr";
        $res=$this->doHttpPost($url,$data);
        return $res;
    }  
}
/*$img = file_get_contents("http://m.hzqcjt.com/file/photo2/null/325e8aa38be949139f89cd79b2365163.jpg");//行驶证图片
$img = base64_encode($img);
$q = new qq_ocr_lst();
echo urldecode(json_encode(array('1' =>$q->XINGSHICARD_bdocr($a))));*/

?>