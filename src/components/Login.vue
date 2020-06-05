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
          <el-form-item label="" id='submit'>
              <el-button type="primary" @click="login">登陆</el-button>
              <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
<script>document.getElementById("ip").value=returnCitySN.cip;</script>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        login_name: '',
        password: ''
      },
      ip: ''
    }
  },
  mounted () {
    // this.getUserIP((ip) => {
    //   this.ip = ip
    // })
    this.getIP()
  },
  methods: {
    getIP () {
      this.$axios.get('http://pv.sohu.com/cityjson?ie=utf-8', {}).then(res => {
        let ip = JSON.parse(res.data.substring(18,res.data.length-1)).cip
        localStorage.setItem('ip', ip)
        console.log(ip)
      })
    },
    login () {
      var that = this
      this.$axios.post('/user/login', {
        login_name: this.form.login_name,
        password: this.form.password
      })
        .then(function (response) {
          if (response.data.code === 0) {
            window.localStorage.setItem('token', response.data.data.token)
            window.localStorage.setItem('super', response.data.data.user_info.is_super)
            window.sessionStorage.setItem('token', response.data.data.token)
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
