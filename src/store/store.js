import Vuex from "vuex";
import Vue from "vue";
import * as types from "./types";

Vue.use(Vuex);
const save = store => {};
export default new Vuex.Store({
    state: {
        user: {},
        token: null,
        title: "",
        isLogin: false,
        aesKey: "xer"
    },

    mutations: {
        [types.LOGIN]: (state, data) => {
            state.isLogin = true;
            sessionStorage.token = data;
            sessionStorage.isLogin = state.isLogin;
            state.token = data;
        },
        [types.LOGOUT]: state => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("isLogin");
            state.token = null;
            state.isLogin = false;
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
});