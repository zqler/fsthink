<template>
  <div class="login">
    <h3 class="h-title">{{msg}}</h3>
  <div class="login-page">
   <el-form :model="user" :rules="rules" ref="userLogin" label-width="100px" class="card-box login-form">
     <span class="login-tips">{{loginInfo.msg}}</span>
     <el-form-item label="用户名" prop="account">
       <el-input type="text" v-model="user.account" auto-complete="off" @change="accountChange">
       </el-input>
     </el-form-item>
     <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="user.pass" auto-complete="off">
      </el-input>
     </el-form-item>
     <el-form-item>
       <el-button type="primary" @click="loginHandler">登录</el-button>
       <router-link to="/register" >
       <el-button type="default" >立即注册<i class="el-icon-arrow-right el-icon-right"></i></el-button>
      </router-link>
     </el-form-item>
   </el-form>
  </div>
  </div>
</template>
<script>
import api from "../utils/api";
import util from "../utils/util";
import { mapState } from "vuex";
import Vue from "vue";
import { login } from "../store/types/login";
export default {
  name: "login",
  data() {
    return {
      msg: "欢迎登录反思系统",
      tip: "",
      user: {
        isAuto: false,
        account: "",
        pass: ""
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted: function() {
    //  this.fetchData();
    // this.$store.commit(types.TITLE, "login");
  },
  computed: {
    ...mapState(["loginInfo", "aesKey"])
  },
  methods: {
    accountChange() {
      this.user.isAuto = false;
      this.user.pass = "";
    },
    loginHandler(ev) {
      var _this = this;
      this.$refs.userLogin.validate(valid => {
        if (valid) {
          var user = {};
          user.name = _this.user.account;
          user.pwd = _this.user.pass;
          _this.$store.dispatch(login.LOGIN, user).then(
            data => {
              user.PassWord = util.encryAES(user.PassWord, _this.aesKey);
              const express = 3600;
              util.setStorage(
                { key: "USER_INFO_KEY", data: user, express: express },
                true
              );
              let redirect = decodeURIComponent(
                _this.$route.query.redirect || "/"
              );
              this.$router.push({
                //你需要接受路由的参数再跳转
                path: redirect
              });
            },
            () => {
              console.info("fail");
            }
          );

          // this.$http.post("/login", user).then(data => {
          //   const code = data.errcode;
          //   const UserToken = data.resultData.UserToken;
          //   if (code == 0) {
          //     this.tip = "登录成功";
          //     user.PassWord = util.encryAES(user.PassWord, _this.aesKey);
          //     util.setStorage({ key: "USER_INFO_KEY", data: user }, true);
          //     this.$store.commit(types.LOGIN, UserToken);
          //     let redirect = decodeURIComponent(
          //       this.$route.query.redirect || "/"
          //     );
          //     this.$router.push({
          //       //你需要接受路由的参数再跳转
          //       path: redirect
          //     });
          //   } else if (code == 1) {
          //     this.tip = "密码错误";
          //   } else if (code == 2) {
          //     this.tip = "用户名不存在";
          //   } else {
          //     this.tip = "用户名密码错误";
          //   }
          // });
        } else {
          store.commit(login.LOGIN_FAIL, { msg: "密码或用户名不能为空" });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.h-title {
  font-size: 16px;
  color: #ff4949;
  margin: 10px 0;
}
.login-page {
  width: 100%;
  height: 100%;
  background: #324057;
  padding-top: 120px;
  text-align: center;
}
.login-form {
  display: inline-block;
  width: 350px;
  padding: 35px 35px 15px 35px;
}
.login-tips {
  font-size: 12px;
  padding: 5px;
  width: 100%;
  display: inline-block;
  color: #ff4949;
}
</style>
