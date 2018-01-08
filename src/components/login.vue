<template>
  <div class="login">
    <h3 class="h-title">{{msg}}</h3>
  <div class="login-page">
   <el-form :model="user" :rules="rules" ref="userLogin" label-width="100px" class="card-box login-form">
     <span class="login-tips">{{tip}}</span>
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
import http from "../utils/http";
import api from "../utils/api";
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

          http.post("/login.php", user).then(res => {
            var data = res.data;
            if (data == 0) {
              this.tip = "登录成功";
              this.$router.push({name:'home'})
            } else if (data == 1) {
              this.tip = "密码错误";
            } else if (data == 2) {
              this.tip = "用户名不存在";
            } else {
              this.tip = "用户名密码错误";
            }
          });
        } else {
          this.tip = "用户名或者密码不能为空";
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.h-title{
  font-size: 16px;
  color:#ff4949;
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
