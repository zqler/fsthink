module.exports = {
    proxy: {
        "/apis": {
            //将www.exaple.com印射为/apis
            target: "http://localhost:8000/php", // 接口域名
            changeOrigin: true, //是否跨域
            pathRewrite: {
                "^/apis": "" //需要rewrite的,
            }
        }
    }
};