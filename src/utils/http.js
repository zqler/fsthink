//二次封装axios
"use strict";

import axios from "axios";
import qs from "qs";
import store from "../store/store";
import { LOGIN, LOGOUT } from "../store/types";
import router from "../router/index";

//axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded; charset=UTF-8";
//http request 拦截器
axios.interceptors.request.use(
    config => {
        // loading
        //判断是否存在存在token,存在就加在http header

        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    //401 清除token信息并且跳转到登录页面登录
                    store.commit(LOGOUT);
                    router.replace({
                        path: "login",
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
            }
        }
        return Promise.reject(error.response.data);
    }
);

const http = {};
["get", "head", "jsonp", "delete"].forEach(method => {
    http[method] = function(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios[method](url, { params: params })
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    reject(err);
                });
        });
    };
});
["post", "patch", "put"].forEach(method => {
    http[method] = function(url, data) {
        return new Promise((resolve, reject) => {
            axios[method](url, qs.stringify(data)).then(
                response => {
                    resolve(response.data);
                },
                err => {
                    reject(err);
                }
            );
        });
    };
});

export default http;