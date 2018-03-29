import { login } from "./types/login";
import $http from "../utils/http";
export default {
    [login.LOGIN]({ commit }, user) {
        return $http
            .post("/login", user)
            .then(data => {
                const resultData = data.resultData;
                commit(login.LOGIN_SUCCESS, resultData);
            })
            .catch(err => {
                const resultData = data.resultData;
                commit(login.LOGIN_FAIL, resultData);
            });
    }
};