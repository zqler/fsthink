<template>
  <div class="box-card">
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-form label-position="left" label-width="80px" :model="formRegister" :rules="rules" ref="formRegister">
          <el-form-item label="账号" prop="name">
            <el-input v-model="formRegister.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formRegister.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword">
            <el-input type="password" v-model="formRegister.checkPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">立即注册</el-button>
            <el-button type="default" @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      let checkUserName = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('账户不能为空!'))
        } else {
          cb() // 将判断传递给后面
        }
      }
      let checkPassword = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('密码不能为空!'))
        } else {
          cb()
        }
      }
      let checkPasswordAgain = (rule, value, cb) => {
        if (!value) {
          return cb(new Error('再次输入密码不能为空!'))
        } else if (value !== this.formRegister.password) {
          return cb(new Error('两次输入密码不一致!'))
        } else {
          cb()
        }
      }

      return {
        formRegister: {
          name: '',
          password: '',
          checkPassword: ''
        },
        rules: {
          name: [{ validator: checkUserName, trigger: 'blur' }],
          password: [{ validator: checkPassword, trigger: 'blur' }],
          checkPassword: [{ validator: checkPasswordAgain, trigger: 'blur' }]
        }
      }
    },
    methods: {
      // 用户注册
      addUser() {
        let user = this.formRegister
        let formData = {
          name: user.name,
          password: user.password
        }
        // 表单验证
        this.$refs['formRegister'].validate(valid => {
          if (valid) {
            this.$http
              .post('api/register', formData)
              .then(res => {
                console.dir(res.data)
                if (res.data.error) {
                  this.$message.error(res.data.error)
                  return false
                } else {
                  this.$router.push('/login')
                }
              })
              .catch(err => {
                this.$message.error(`${err.message}`)
              })
          } else {
            this.$message.error('表单验证失败!')
            return false
          }
        })
      },
      cancle(){
       this.$router.go(-1);
      }
    }
  }
</script>
<style >
  .box-card{
    height: 85.4%;
    background: #324057;
    padding-top: 120px;
    text-align: center;
  }

</style>
