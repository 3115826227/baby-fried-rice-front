<template>
    <div id='login'>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input type="text" v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item label="登陆密码">
                <el-input type="password" v-model="form.password" placeholder="用户密码"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="login">登陆</el-button>
                <el-button type="primary" @click="register">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log('登陆')
      this.$axios({
        method: 'post',
        url: '/user/login',
        data: {
          login_name: this.form.username,
          password: this.form.password
        }
      })
    },
    register () {
      console.log('注册')
    }
  }
}
</script>

<style scoped>
#login {
    height: 200px;
}
</style>
