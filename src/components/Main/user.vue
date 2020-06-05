<template>
    <div id="user">
        <div class="board">
            <el-row>
              <el-col :span="3" class="col-label"><label>用户名：</label></el-col>
              <el-col :span="6" class="col-content">{{detail.login_name}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="col-label"><label>昵称：</label></el-col>
              <el-col :span="6" class="col-content">{{detail.username}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="col-label"><label>性别：</label></el-col>
              <el-col :span="6" class="col-content">{{gender}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3" class="col-label"><label>认证情况：</label></el-col>
              <el-col :span="6" class="col-content">
                <span v-if='verify' class="info-verify"><i><strong>V</strong></i> 已认证</span>
                <span v-else>未认证</span>
              </el-col>
              <el-col :span="3" v-if="!detail.verify"><a class="a-verify" @click="toVerify">点击认证</a></el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>姓名：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.name}}</span></el-col>
            </el-row>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>学校：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.school}}</span></el-col>
            </el-row>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>院系：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.faculty}}</span></el-col>
            </el-row>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>年级：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.grade}}</span></el-col>
            </el-row>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>专业：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.major}}</span></el-col>
            </el-row>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>学号：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.number}}</span></el-col>
            </el-row>
            <el-row v-if="detail.verify">
              <el-col :span="3" class="col-label"><label>身份证：</label></el-col>
              <el-col :span="6" class="col-content"><span class="unmodify-info">{{detail.identify}}</span></el-col>
            </el-row>
        </div>
        <el-dialog
          title="用户认证"
          :visible.sync="verifyDialogVisible"
          width="50%" height="50%">
          <template class="dialog-form">
            <el-form :model="verify_form" label-width="20%" label-position="right">
              <el-form-item label="学校">
                <el-select @change="selectSchoolId($event)" v-model="verify_form.school_id" placeholder="使用状态">
                  <el-option v-for="item in school" :value="item.id" :label="item.name" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="姓名：">
                <el-input v-model="verify_form.name"></el-input>
              </el-form-item>
              <el-form-item label="身份证：">
                <el-input v-model="verify_form.identify"></el-input>
              </el-form-item>
            </el-form>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="verifyDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="userVerify">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      detail: {},
      gender: '',
      verify: '未认证',
      verifyDialogVisible: false,
      verify_form: {},
      school: []
    }
  },
  created () {
    this.getDetail()
    this.getSchools()
  },
  methods: {
    getDetail () {
      var that = this
      this.$axios.get('/account/user/detail', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.detail = response.data.data
          if (response.data.data.gender === false) {
            that.gender = '女'
          } else {
            that.gender = '男'
          }
          if (response.data.data.verify === true) {
            that.verify = '已认证'
          } else {
            that.verify = ''
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    toVerify () {
      this.verifyDialogVisible = true
    },
    userVerify () {
      var that = this
      this.$axios.post('/account/user/verify', this.verify_form, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.getDetail()
            that.$message.success('认证成功')
          } else {
            that.$message.success('认证失败')
          }
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
  margin-top: 50px;
  margin-left: 50px;
}
.el-row {
  margin-bottom: 30px;
}
.col-label {
  text-align: right;
}
.col-content {
  text-align: center;
}
.a-verify {
  color: blue;
}
.info-verify {
  background-color: #efc100;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
.unmodify-info {
  color: gray;
}
</style>
