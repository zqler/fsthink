import Vuex from "vuex";
import Vue from "vue";
import { login } from "./types/login";
import actions from "./actions";
Vue.use(Vuex);
const save = store => {};
export default new Vuex.Store({
    actions,
    state: {
        user: {},
        token: null,
        title: "",
        isLogin: false,
        aesKey: "xer",
        loginInfo: {
            isSuccess: false,
            msg: ""
        }
    },

    mutations: {
        [login.LOGIN_SUCCESS]: (state, data) => {
            state.isLogin = true;
            sessionStorage.token = data.UserToken;
            sessionStorage.isLogin = state.isLogin;
            state.token = data.UserToken;
        },
        [login.LOGIN_FAIL](state, data) {
            state.loginInfo.isSuccess = true;
            state.loginInfo.msg = data;
        },
        [login.LOGOUT]: state => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isLogin");
            state.token = null;
            state.isLogin = false;
        }
    }
});