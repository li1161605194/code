<?php
$myfile = fopen("http://lst1.oss-cn-shanghai.aliyuncs.com/applinzi/index.html", "w") or die("Unable to open file!");
$txt = "Bill Gates\n";
fwrite($myfile, $txt);
$txt = "Steve Jobs\n";
fwrite($myfile, $txt);
fclose($myfile);
?>
