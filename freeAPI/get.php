<?php
header('Content-type:text/html;charset=utf-8');

//配置您申请的appkey
$appkey = "aa768f759c5906bad121c4678ce79402";
$tempa=array();
$params=array();
$tempa=$_POST['params'];
for ($x=0; $x<=count($tempa); $x++) {
    $params[$tempa[$x][0]]=$tempa[$x][1];
} 
 
//************1.题库接口************
$url = $_POST['params_url'];
/*$params = array(
      "key" => $appkey,//您申请的appKey
      "subject" => "1",//选择考试科目类型，1：科目1；4：科目4
      "model" => "c1",//驾照类型，可选择参数为：c1,c2,a1,a2,b1,b2；当subject=4时可省略
      "testType" => "rand",//测试类型，rand：随机测试（随机100个题目），order：顺序测试（所选科目全部题目）
);*/
$paramstring = http_build_query($params);
$content = juhecurl($url,$paramstring);
$result = json_decode($content,true);
if($result){
    if($result['error_code']=='0'){
    	echo $content;
        //print_r($result);
    }else{
        echo $result['error_code'].":".$result['reason'];
    }
}else{
    echo "请求失败";
}
//**************************************************
 
 
 
 
//************2.answer字段对应答案************
// $url = "http://api2.juheapi.com/jztk/answers";
// $params = array(
//       "key" => $appkey,//您申请的appk
// );
// $paramstring = http_build_query($params);
// $content = juhecurl($url,$paramstring);
// $result = json_decode($content,true);
// if($result){
//     if($result['error_code']=='0'){
//         echo $result;
//     }else{
//         echo $result['error_code'].":".$result['reason'];
//     }
// }else{
//     echo "请求失败";
// }
//**************************************************
 
 
/**
 * 请求接口返回内容
 * @param  string $url [请求的URL地址]
 * @param  string $params [请求的参数]
 * @param  int $ipost [是否采用POST形式]
 * @return  string
 */
function juhecurl($url,$params=false,$ispost=0){
    $httpInfo = array();
    $ch = curl_init();
 
    curl_setopt( $ch, CURLOPT_HTTP_VERSION , CURL_HTTP_VERSION_1_1 );
    curl_setopt( $ch, CURLOPT_USERAGENT , 'JuheData' );
    curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT , 60 );
    curl_setopt( $ch, CURLOPT_TIMEOUT , 60);
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER , true );
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    if( $ispost )
    {
        curl_setopt( $ch , CURLOPT_POST , true );
        curl_setopt( $ch , CURLOPT_POSTFIELDS , $params );
        curl_setopt( $ch , CURLOPT_URL , $url );
    }
    else
    {
        if($params){
            curl_setopt( $ch , CURLOPT_URL , $url.'?'.$params );
        }else{
            curl_setopt( $ch , CURLOPT_URL , $url);
        }
    }
    $response = curl_exec( $ch );
    if ($response === FALSE) {
        //echo "cURL Error: " . curl_error($ch);
        return false;
    }
    $httpCode = curl_getinfo( $ch , CURLINFO_HTTP_CODE );
    $httpInfo = array_merge( $httpInfo , curl_getinfo( $ch ) );
    curl_close( $ch );
    return $response;
}

?>