"use strict";
var D = {
    SUCCESS_TIP: "操作成功!",
    ERROR_TIP: "操作失败!"
};　
if (typeof(define) == 'function') {
    define(function() {　　　　
        return {
            D: D　　　　
        };　　
    });
}