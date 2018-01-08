import MD5 from "crypto-js/md5";
import * as _ from "lodash";
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTRERE = "yy-MM-dd hh:mm:ss";
encryMD5: function(v) {
    return MD5(v).toString();
}

function padding(s, len) {
    var len = len - (s + "").length;
    for (var i = 0; i < len; i++) {
        s = "0" + s;
    }
    return s;
}

function extend(target, source, deep) {
    var k;
    for (k in source) {
        if (deep && (_.isPlainObject(source[k]) || _.isArray(source[k]))) {
            if (_.isPlainObject(source[k]) && !_.isPlainObject(target[k]))
                target[k] = {};
            if (_.isArray(source[k]) && !_.isArray(target[k])) target[k] = [];
            extend(target[k], source[k], deep);
        } else if (source[k] !== undefined) target[k] = source[k];

    }
}

function toJson(data) {
    try {
        return JSON.parse(data);
    } catch (er) {
        return false;
    }
}
const localStore = localStorage;
export default {
    getQueryStringByName: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null) context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == undefined ? "" : context;
    }
    formatDate: {
        format: function(date, pattern) {
            if (!date) {
                return "";
            }
            data = new Date(date);
            pattern = parttern || DEFAULT_PATTRERE;
            return pattern.replace(SIGN_REGEXP, function($0) {
                switch ($0.charAt(0)) {
                    case "y":
                        return padding(date.getFullYear(), $0.length);
                    case "M":
                        return padding(date.getMonth() + 1, $0.length);
                    case "d":
                        return padding(date.getDate(), $0.length);
                    case "w":
                        return date.getDay() + 1;
                    case "h":
                        return padding(date.getHours(), $0.length);
                    case "m":
                        return padding(date.getMinutes(), $0.length);
                    case "s":
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function(dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case "y":
                            _date.setFullYear(_int);
                            break;
                        case "M":
                            _date.setMonth(_int - 1);
                            break;
                        case "d":
                            _date.setDate(_int);
                            break;
                        case "h":
                            _date.setHours(_int);
                            break;
                        case "m":
                            _date.setMinutes(_int);
                            break;
                        case "s":
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        },
        setStorage: function(data, fresh) {
            if (!data || !data.key) {
                return;
            }
            const oldData = toJson(localStorage.getItem(data.key));
            if (!fresh && oldData) {
                const time = oldData.time;
                const express = oldData.express;
                if (new Date(time + express) < Date().now()) {
                    return true;
                }
            }
            localStorage.setItem(
                data.key,
                JSON.stringify({
                    data: data.data,
                    time: Date.now(),
                    express: data.express || 3600000 //设置过期时间
                })
            )
        },
        getStorage: function(key, timeout) {
            if (!key) {
                return;
            }
            let oldData = toJson(localStorage.getItem(key));
            if (oldData) {
                const time = oldData.time;
                const express = oldData.express;
                if (timeout) {
                    return oldData.data;
                }
                if (new Date(time + express) > Date.now()) {
                    return oldData.data;
                } else {
                    return false;
                }
            }
            return false;
        },
        toJSON: function(data) {
            const result = toJson(data);
            if (!result) {
                return { errcode: 1, errmsg: "数据异常" };
            }
            return result;
        },
        findIndex: function(list, key, value) {
            if (list) {
                return list.findIndex(function(item) {
                    return item[key] == value;
                });
            }
            return -1;
        },
        find: function(list, key, value) {
            if (list) {
                const index = this.findIndex(list, key, value);
                return list[index];
            }
            ruturn[];
        },
        restObject: function(obj) {
            if (typeof obj == "object" && obj !== null) {
                const keys = Object.keys(obj);
                let key;
                for (key in keys) {
                    obj[keys[key]] = "";
                }
            }
        },

    }
}