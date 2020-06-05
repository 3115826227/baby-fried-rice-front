<template>
    <div id="register">
        <div class="name">
          宝宝煎米果
        </div>
        <AliCaptcha></AliCaptcha>
        <el-form :model="form" label-width="20%">
          <el-form-item label="用户名">
              <el-input type="text" v-model="form.login_name" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="昵称">
              <el-input type="text" v-model="form.username" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input type="password" v-model="form.password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="重复密码">
              <el-input type="password" v-model="form.repassword" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="手机号">
              <el-input type="phone" v-model="form.phone" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="">
            <JcRange></JcRange>
            <!-- <el-button type="primary" @click="dialogVisible = true">弹出滑块验证</el-button> -->
            <span v-if="confirm_message" style="font-size:11px;color:red;">{{confirm_message}}</span>
          </el-form-item>
          <el-form-item label="验证码">
              <el-col :span="10">
                <el-input type="code" v-model="form.code" placeholder=""></el-input>
              </el-col>
              <el-col :span="5" style="margin-left:15px;">
                <span v-if="!clickGetCode">
                  <el-button type="primary" @click="getCode">点击获取</el-button>
                </span>
                <span v-else>
                  <el-button type="primary" disabled="">{{count}} s</el-button>
                </span>
              </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.gender" placeholder="请选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" id="submit">
             <el-button type="primary" @click="login">登录</el-button>
             <el-button type="primary" @click="register">注册</el-button>
          </el-form-item>
        </el-form>
          <el-dialog
      append-to-body
      :visible.sync="dialogVisible" :show-close="false"
      width="450px">
      <SlideVerify :l="42"  ref="dialogopen"
                   :r="10"
                   :w="410"
                   :h="200"
                   :block_y="block_y"
                   :imgurl="imgurl"
                   :miniimgurl="miniimgurl"
                   @success="onSuccess"
                   @fail="onFail"
                   @refresh="onRefresh"
                   :slider-text="text"
      ></SlideVerify>
          </el-dialog>
    </div>
</template>
<script>
import JcRange from '../components/Main/jcrange'
import SlideVerify from '../components/Main/slide_verify'
import AliCaptcha from '../components/Main/ali_captcha'
export default {
  name: 'register',
  components: {
    JcRange,
    SlideVerify,
    AliCaptcha
  },
  data () {
    return {
      form: {
        gender: '男'
      },
      timer: null,
      count: '',
      clickGetCode: false,
      confirm_message: '',
      dialogVisible: false,
      block_y: 0,
      imgurl: '',
      miniimgurl: '',
      chenckMoveid: '',
      text: ''
    }
  },
  created () {
    localStorage.setItem('confirm', false)
  },
  methods: {
    login () {
      this.$router.push({path: '/'})
    },
    getCode () {
      var confirm = localStorage.getItem('confirm')
      if (confirm === 'false') {
        this.confirm_message = '请先进行滑块验证'
        return
      } else {
        this.confirm_message = ''
      }
      const TIME_COUNT = 10
      if (!this.timer) {
        this.clickGetCode = true
        this.count = TIME_COUNT
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.clickGetCode = false
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    register () {
      var that = this
      var genderFlag = false
      if (this.form.gender === '男') {
        genderFlag = true
      }
      this.$axios.post('/user/register', {
        login_name: this.form.login_name,
        password: this.form.password,
        username: this.form.username,
        gender: genderFlag
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.$router.push({path: '/'})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onSuccess () {

    },
    onFail () {

    },
    getImageVerifyCode () {
      var that = this
      this.$axios.get('/usr/code')
        .then(function (res) {
          if (!res || res.code !== '20000') {
            this.$message({
              showClose: true,
              message: '获取图形验证码失败，请重试',
              type: 'error'
            })
          } else {
            var imgobj = JSON.parse(res.data)
            that.block_y = imgobj.yHeight
            that.imgurl = 'data:image/png;base64,' + imgobj.bigImage
            that.miniimgurl = 'data:image/png;base64,' + imgobj.smallImage
            that.chenckMoveid = imgobj.chenckMoveid
            if (that.$refs.dialogopen) {
              that.$refs.dialogopen.reset(imgobj.yHeight)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onRefresh () {
      this.imgurl = 'https://cpro.baidu.com/cpro/ui/uijs.php?en=mywWUA71T1YsFh7sT7qGujYsFhPC5H0huAbqrauGTdq9TZ0qnauJp1Y4uWN-mHIhuHc3Pjm1uADzFh_qFRFAFRn4FRPKFRf1FRFaFR7AFRcLFRfvFRP7FRmvFhkdpvbqnzuVmLKV5HTvnHD1FMDqmLPbUhF9pywdgvPsTBuzmWYsFMF15HDhTvN_UANzgv-b5HDhTv-b5yDznvfYPWc3uhN9P1N-rymhTLwGujYknHThIjdYTAP_pyPouyf1gv9WFMwb5Hnsn1cdnW6hIAd15HDdrjTvPHDLPWnhIZRqIHnsn1cdnW6hIHdCIZwsTzR1fiRzwBRzwhF_UvT-nbNWTvw8FHF7UhNYFMNGUy-b5RmdPH0kPRfLn1PanbuAnYc3nDc4rRPjwRmLPHwKfWcYFMmqnBuG5H6LmhF9uhNW&besl=-1&c=news&cf=1&cvrq=616350&eid_list=200197&expid=200019_200197_200352_203600_205056_205198_205949_208996_209813&fr=32&fv=0&haacp=253&img_typ=21094&itm=0&lu_idc=tc&lukid=3&lus=a23d4628fea75e9f&lust=5ea1a4b3&mscf=0&mtids=2002052189&n=10&nttp=1&p=baidu&pbs=228840&sce=7&sr=280&ssp2=1&tpl=baiduCustNativeADImageCarousel&tsf=dtp:1&u=%2Fqq%5F42068550%2Farticle%2Fdetails%2F92604316&uicf=lurecv&urlid=0&eot=1'
      this.miniimgurl = 'https://cpro.baidu.com/cpro/ui/uijs.php?en=mywWUA71T1YsFh7sT7qGujYsFhPC5H0huAbqrauGTdq9TZ0qnauJp1Y4uWN-mHIhuHc3Pjm1uADzFh_qFRFAFRn4FRPKFRf1FRFaFR7AFRcLFRfvFRP7FRmvFhkdpvbqnzuVmLKV5HTvnHD1FMDqmLPbUhF9pywdgvPsTBuzmWYsFMF15HDhTvN_UANzgv-b5HDhTv-b5yDznvfYPWc3uhN9P1N-rymhTLwGujYknHThIjdYTAP_pyPouyf1gv9WFMwb5Hnsn1cdnW6hIAd15HDdrjTvPHDLPWnhIZRqIHnsn1cdnW6hIHdCIZwsTzR1fiRzwBRzwhF_UvT-nbNWTvw8FHF7UhNYFMNGUy-b5RmdPH0kPRfLn1PanbuAnYc3nDc4rRPjwRmLPHwKfWcYFMmqnBuG5H6LmhF9uhNW&besl=-1&c=news&cf=1&cvrq=616350&eid_list=200197&expid=200019_200197_200352_203600_205056_205198_205949_208996_209813&fr=32&fv=0&haacp=253&img_typ=21094&itm=0&lu_idc=tc&lukid=3&lus=a23d4628fea75e9f&lust=5ea1a4b3&mscf=0&mtids=2002052189&n=10&nttp=1&p=baidu&pbs=228840&sce=7&sr=280&ssp2=1&tpl=baiduCustNativeADImageCarousel&tsf=dtp:1&u=%2Fqq%5F42068550%2Farticle%2Fdetails%2F92604316&uicf=lurecv&urlid=0&eot=1'
      // this.getImageVerifyCode()
    },
    /* 用户密码登陆方法 */
    submitForm (formName, data) {
      var that = this
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.loading = true
      /* 发起请求 */
      let Base64 = require('js-base64').Base64
      const loginFrom = {
        username: Base64.encode(this.ruleForm2.username),
        password: Base64.encode(this.ruleForm2.password),
        x_index: data,
        chenckMoveid: that.chenckMoveid
      }
      this.$store.dispatch('Login', loginFrom).then(res => {
        loading.close()
        this.isLogined = true
        this.loading = false
        /* 跳转路由 */
        this.$router.push({ path: '/' })
      }).catch(() => {
        loading.close()
        this.loading = false
        if (that.$refs.dialogopen) {
          that.$refs.dialogopen.reset()
        }
      })
    }
  }
}
</script>

<style scoped>
#register {
  margin: 5% 35% 5% 30%;
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
  /* text-align: center; */
}
</style>
