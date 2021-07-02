<template>
    <div id="user">
      <el-divider></el-divider>
      <div id="left-panel">
        <div class="user-img">
          <el-avatar :src="detail.head_img_url" :size="180" fit="fit"></el-avatar>
        </div>
        <div style="font-size:13px;"><el-link>点击更换头像</el-link></div>
        <div class="user-panel">
          <div class="user-title">我的生活哲理</div>
          <div class="user-desc">&nbsp;&nbsp;&nbsp;&nbsp;{{detail.describe}}</div>
          <div>
            <el-link>编辑</el-link>
          </div>
        </div>
      </div>
      <div id="right-panel">
        <div class="base-info">
          <div class="base-info-title">基本信息</div>
          <div class="base-info-panel">
            <el-row>
              <el-col :span="6">账号：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.account_id}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">用户名：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.username}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">用户名密码：</el-col>
              <el-col :span="10" style="text-align: right;"><el-link type="primary" style="font-size:17px;font-weight:normal;">修改</el-link></el-col>
            </el-row>
            <el-row>
              <el-col :span="6">积分：</el-col>
              <el-col :span="10" style="text-align: right;"><span style="color: red;">{{user_coins}}</span> 币</el-col>
              <el-col :span="5" style="text-align: center;"><el-link style="font-size:17px;font-weight:normal;">积分规则</el-link></el-col>
            </el-row>
            <el-row>
              <el-col :span="6">手机号码：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.phone}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">性别：</el-col>
              <el-col :span="10" style="text-align: right;">
                <span v-if="detail.gender">男</span>
                <span v-else>女</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">年龄：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.age}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">身份证号：</el-col>
              <el-col :span="10" style="text-align: right;"><el-link type="primary" style="font-size:17px;font-weight:normal;">查看</el-link></el-col>
            </el-row>
          </div>
        </div>
        <el-divider></el-divider>
        <div id="school-info" v-if="detail.verify">
          <div class="school-info-title">学校信息</div>
          <div class="school-info-panel">
            <el-row>
              <el-col :span="6">学校：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.school}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">院系：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.faculty}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">专业：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.major}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">年级：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.grade}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="6">学号：</el-col>
              <el-col :span="10" style="text-align: right;">{{detail.number}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      detail: {},
      verify: '未认证',
      verifyDialogVisible: false,
      verify_form: {},
      school: [],
      user_desc: '没有过不去的坎，我们一起努力。既然选择了远方，便只顾风雨兼程。',
      user_coins: 232
    }
  },
  created () {
    this.getDetail()
    this.getSchools()
  },
  methods: {
    getDetail () {
      var that = this
      this.$axios.get('/api/account/user/detail', {
        headers: {
          token: sessionStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.detail = response.data.data
          if (response.data.data.verify === true) {
            that.verify = '已认证'
          } else {
            that.verify = ''
          }
          // that.detail.number = '1541305032'
          // that.detail.school = '邵阳学院'
          // that.detail.phone = '15688220367'
          // that.detail.faculty = '信息工程学院'
          // that.detail.grade = '2015'
          // that.detail.major = '网络工程'
          // that.detail.age = 23
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectSchoolId (data) {
      // console.log(data)
    },
    getSchools () {
      var that = this
      this.$axios.get('/user/school')
        .then(function (response) {
          that.school = response.data.data
          console.log(that.school)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
#user {
  margin-top: 10px;
  margin-left: 180px;
  height: 690px;
  float: left;
  padding: 10px;
}
#left-panel {
  width: 200px;
  float: left;
  text-align: center;
}
#right-panel {
  float: left;
  width: 500px;
  margin-left: 20px;
}
.user-img {
  padding: 10px;
}
.user-title {
  padding: 10px;
}
.user-panel {
  margin-top: 20px;
}
.user-desc {
  text-align: left;
  padding: 10px;
  font-size: 14px;
  color: gray;
}
.base-info-title {
  padding: 10px;
  font-size: 20px;
  font-weight: inherit;
}
.base-info-panel {
  margin-left: 22px;
  font-size: 17px;
  color: grey;
}
.base-info-panel .el-row {
  padding: 5px;
  margin-left: 20px;
  /* text-align: right; */
}
.school-info-title {
  padding: 10px;
  font-size: 20px;
  font-weight: inherit;
}
.school-info-panel {
  margin-left: 22px;
  font-size: 17px;
  color: grey;
}
.school-info-panel .el-row {
  padding: 5px;
  margin-left: 20px;
  /* text-align: right; */
}
</style>
