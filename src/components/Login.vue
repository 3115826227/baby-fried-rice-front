<template>
    <div id='login'>
        <div class="name">
          宝宝煎米果
        </div>
        <el-form :model="form" :ref="form" label-width="70px">
          <el-form-item label="用户名">
              <el-input type="text" v-model="form.login_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input type="password" v-model="form.password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-col :span="10" style="margin-right:20px;">
              <el-input type="code" v-model="form.code" placeholder=""></el-input>
            </el-col>
            <el-col :span="10">
              <img :src="img_code"  @click="getCode" height="40" />
            </el-col>
          </el-form-item>
          <el-form-item label="" id='submit'>
              <el-button type="primary" @click="login">登陆</el-button>
              <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
  name: 'Login',
  components: {},
  data () {
    return {
      form: {
        login_name: '',
        password: ''
      },
      system: {
        ip: '',
        area: '',
        brower: '',
        os: ''
      },
      code_img_src: '',
      img_code_id: '',
      img_code: ''
    }
  },
  mounted () {
    this.getCode()
  },
  methods: {
    getCode () {
      var that = this
      this.$axios.get('/apis/captcha', {}).then(res => {
        that.img_code_id = res.data.captcha_id
        that.img_code = 'http://localhost:18070' + res.data.image_url
      })
    },
    verifyCode () {
      var that = this
      this.$axios.get('/verify/' + that.img_code_id + '/' + that.form.code, {}).then(res => {
        console.log(res.data)
      })
    },
    login () {
      var that = this
      this.$axios.post('/api/user/login', {
        login_name: this.form.login_name,
        password: this.form.password
      })
        .then(function (response) {
          if (response.data.code === 0) {
            // window.localStorage.setItem('token', response.data.data.token)
            // window.localStorage.setItem('super', response.data.data.user_info.is_super)
            sessionStorage.setItem('token', response.data.data.token)
            sessionStorage.setItem('user_id', response.data.data.user_info.user_id)
            sessionStorage.setItem('username', response.data.data.user_info.username)
            that.$router.push({path: '/index'})
          } else {
            console.log(response)
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('请求出错，可能是输入的用户名和密码不匹配')
        })
    },
    register () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style scoped>
#login {
  margin: 13% 35% 5% 30%;
  padding: 5%;
  border-radius: 10px;
  background-color: #E9EEF3;
}
.name {
  text-align: center;
  font-size: 20px;
  margin: 10px;
  font-weight: inherit;
  margin-bottom: 50px;
}
#submit {
  text-align: left;
}
</style>
