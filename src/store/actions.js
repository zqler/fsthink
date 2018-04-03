import { login } from "./types/login";
import $http from "../utils/http";
export default {
    [login.LOGIN]({ commit }, user) {
        return $http.post("/login", user).then(data => {
            if (data.errcode == 0) {
                const resultData = data.resultData;
                commit(login.LOGIN_SUCCESS, resultData);
            } else {
                commit(login.LOGIN_FAIL, data);
            }
        });
    }
};