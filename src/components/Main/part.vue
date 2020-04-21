<template>
    <div id="part">
        <div id="nav">
          <ul>
            <li class="nav-list">
              <a  @click="navSelect(1,1)">家教</a>
            </li>
            <li class="nav-list">
              <a @click="navSelect(1,2)">临时工</a>
            </li>
          </ul>
        </div>
        <div id="container">
          <div id="container-widdle">
          <div id="search">
            <el-row>
              <el-col :span="8" style="margin-right:20px;">
                <el-input v-model="job_search" placeholder="编号、名称"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="jobSearch()">搜索</el-button>
              </el-col>
            </el-row>
          </div>
          <div id="add">
            <el-button type="primary" @click="jobAdd()">我要发布</el-button>
          </div>
          </div>
        </div>
        <div id="tutor-filter">
          <el-row class="filter-row">
            <label class="filter-label">年级</label>
            <span class="filter-col"><a @click="tutorQueryFilterGrade('')">所有</a></span>
            <span v-for="item in grade" :key="item.id">
              <span class="filter-col"><a @click="tutorQueryFilterGrade(item.id)"><span>{{item.name}}</span></a></span>
            </span>
          </el-row>
          <el-row class="filter-row">
            <label class="filter-label">科目</label>
            <span class="filter-col"><a @click="tutorQueryFilterSubject('')">所有</a></span>
            <span v-for="item in subject" :key="item.id">
              <span class="filter-col"><a @click="tutorQueryFilterSubject(item.id)">{{item.name}}</a></span>
            </span>
          </el-row>
          <el-row class="filter-row">
            <label class="filter-label">薪资</label>
            <span class="filter-col"><a @click="tutorQueryFilterSalary('')">所有</a></span>
            <span v-for="item in salary" :key="item.id">
              <span class="filter-col"><a @click="tutorQueryFilterSalary(item.id)">{{item.name}}</a></span>
            </span>
          </el-row>
        </div>
        <div id="content-panel">
          <template v-if="active === 1">
            <div v-for="(item, index) in tutors" :key="item.id">
              <div class="content-tutor">
              <template v-if="index">
               <el-divider></el-divider>
              </template>
              <el-row class="tutor-row">
                 <el-col :span="8">
                  <label>编号</label>
                  <span>{{item.id}}</span>
                </el-col>
                <el-col :span="8">
                  <label>名称：</label>
                  <span>{{item.name}}</span>
                </el-col>
                <el-col :span="8">
                  <label>年级：</label>
                  <span>{{item.grade}}</span>
                </el-col>
              </el-row>
              <el-row class="tutor-row">
                 <el-col :span="8">
                  <label>科目：</label>
                  <span>{{item.subject}}</span>
                </el-col>
                <el-col :span="8">
                  <label>薪资：</label>
                  <span>{{item.salary}} 元/小时</span>
                </el-col>
                <el-col :span="8">
                  <label>地点：</label>
                  <span>{{item.area}}</span>
                </el-col>
                <!-- <el-col :span="8">
                  <label>发布时间：</label>
                  <span>{{item.time}}</span>
                </el-col> -->
              </el-row>
              <el-row style="margin-top:10px;text-align:right;">
                <el-col :span="24">
                  <el-button type="primary" size="small">详细</el-button>
                  <el-button type="primary" size="small">收藏</el-button>
                  <el-button type="primary" size="small">预约</el-button>
                </el-col>
              </el-row>
              </div>
            </div>
            <div id="tutor-page">
              <el-pagination
                :page-size="tutor_query.page_size"
                :pager-count="tutor_query.page_count"
                layout="prev, pager, next"
                @current-change="currentClick"
                @prev-click="prevClick"
                @next-click="nextClick"
                :total="tutor_query.total">
              </el-pagination>
            </div>
          </template>
        </div>
        <el-dialog
          title="发布新家教"
          :visible.sync="TutorAdddialogVisible" width="60%">
          <el-form :model="job_form" label-width="200px">
            <el-form-item label="家教名称：">
              <el-col :span="12">
                <el-input v-model="job_form.title" placeholder="建议直奔主题，比如高二数学"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="家教时薪：">
              <el-col :span="3" style="margin-right:20px;">
                <el-input v-model="job_form.salary" placeholder="50"></el-input>
              </el-col>
              <el-col :span="4">
                <span>元/小时</span>
              </el-col>
              <el-col :span="16">
                <span style="color:gray;font-size:12px;">提示：一般在50 ~ 80元/小时之间浮动，价格越高，可能请到的家教老师越好</span>
              </el-col>
            </el-form-item>
            <el-form-item class="tutor_select" label="家教年级科目：">
              <el-col :span="12">
                <el-select v-model="job_form.course" placeholder="请选择年级科目" style="width:100%;">
                  <el-option :label="item.name" v-for="(item, index) in course" :value="item.name" :key="index"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
            <el-form-item label="地址：" prop="area">
              <el-col :span="12">
                <el-input v-model="job_form.area" placeholder="为了方便，请尽量精确到某个小区楼层"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="描述：" prop="describy">
              <el-col :span="12">
                <el-input type="textarea" rows="5" v-model="job_form.describe" placeholder="建议简单介绍一下学生的情况，以及期待的家教老师要求"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="紧急情况" prop="emergency">
              <el-col :span="7">
                  <el-radio-group v-model="job_form.emergency" @change="emergencyChangeHandler">
                    <el-radio label="一般" value="general"></el-radio>
                    <el-radio label="紧急" value="emergency"></el-radio>
                  </el-radio-group>
              </el-col>
              <el-col :span="8" v-if="bpoint_hint != 0">
                  <span style="color:red;">扣除 <strong>{{bpoint_hint}}</strong> B点</span>
              </el-col>
            </el-form-item>
             <el-form-item label="">
              <el-col :span="24">
                <span class="job-emergency-hint">提示：一般信息发布需扣除1个B点，紧急信息发布需扣除3个B点，紧急信息会进行优先审核并置顶处理</span>
              </el-col>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="TutorAdddialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="tutorAdd()">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'part',
  data () {
    return {
      active: 1,
      navlist: [{
        id: 1,
        name: '家教'
      }, {
        id: 2,
        name: '家教'
      }],
      job_search: '',
      tutors: [],
      TutorAdddialogVisible: false,
      job_form: {
        emergency: 'general'
      },
      course: [],
      grade: [],
      subject: [],
      tutor_query: {
        grade_id: '',
        subject_id: '',
        salary_id: '',
        page: 1,
        page_size: 1,
        page_count: 2,
        total: 0
      },
      salary: [],
      bpoint_hint: 0
    }
  },
  created () {
    this.getCourse()
    this.getGrade()
    this.getSubject('')
    this.getSalary()
    this.getTutor()
  },
  methods: {
    getCourse () {
      var that = this
      this.$axios.get('/public/job/tutor/course', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.course = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getGrade () {
      var that = this
      this.$axios.get('/public/job/tutor/grade', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.grade = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getSubject (grade) {
      var that = this
      this.$axios.get('/public/job/tutor/subject?grade_id=' + grade, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.subject = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getSalary () {
      var that = this
      this.$axios.get('/public/job/tutor/salary', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.salary = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    jobSearch () {
      if (this.active === 1) {
        this.getTutor(0, 0, this.job_search)
      }
    },
    navSelect (index, id) {
      this.active = id
      console.log(this.active)
    },
    jobAdd () {
      if (this.active === 1) {
        this.TutorAdddialogVisible = true
      }
    },
    tutorAdd () {
      console.log(this.job_form)
      this.$axios.post('/public/job/tutor', this.job_form, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      this.TutorAdddialogVisible = false
    },
    tutorQueryFilterGrade (id) {
      this.tutor_query.grade_id = id
      this.getTutor()
    },
    tutorQueryFilterSubject (id) {
      this.tutor_query.subject_id = id
      this.getTutor()
    },
    tutorQueryFilterSalary (id) {
      this.tutor_query.salary_id = id
      this.getTutor()
    },
    getTutor () {
      var that = this
      this.$axios.get('/public/job/tutor?page_size=' + this.tutor_query.page_size + '&page=' + this.tutor_query.page + '&search=' + this.job_search + '&subject_id=' + this.tutor_query.subject_id + '&grade_id=' + this.tutor_query.grade_id + '&salary_id=' + this.tutor_query.salary_id, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          that.tutor_query.total = response.data.data.total
          that.tutors = response.data.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    emergencyChangeHandler (value) {
      console.log(value)
      if (value === '一般') {
        this.bpoint_hint = 1
      } else {
        this.bpoint_hint = 3
      }
    },
    prevClick (prevPage) {
      console.log(prevPage)
    },
    nextClick (nextPage) {
      console.log(nextPage)
    },
    currentClick (currentPage) {
      console.log(currentPage)
      this.tutor_query.page = currentPage
      this.getTutor()
    }
  }
}
</script>

<style scoped>
#nav {
  width: 100%;
  height: 70px;
  background-color: white;
  border-radius: 5px;
}
#nav ul {
  padding: 10px;
  margin: 0px;
}
#nav ul li {
  float: left;
  list-style: none;
  margin-right: 5px;
  padding: 12px 12px 10px 12px;
}
.nav-list  a {
  padding: 12px 12px 10px 12px;
  border-radius: 10px 0px 10px 0px;
  text-decoration: none;
  color: black;
}
a:link {
  background-color: #FF9900;
}
a:active{
  background-color: #FF9900;
}
a:visited{
  background-color: #FF9900;
}
a:hover {
  background-color: #FF9900;
}
#container {
  /* float: left; */
  width: 100%;
  height: 60px;
  margin-top: 20px;
}
#container-widdle {
  float: left;
  width: 100%;
}
#search {
  float: left;
  width: 60%;
}
#add {
  float: right;
}
.job-emergency-hint {
  color: gray;
  font-size: 12px;
}
.filter-row {
  font-size: 14px;
  margin-bottom: 20px;
}
.filter-label {
  padding: 5px;
  background-color: gray;
  border-radius: 10px;
}
.filter-col {
  padding: 10px;
}
#content-panel {
  margin-top: 20px;
  padding: 30px;
  background-color: white;
  border-radius: 5px;
}
.tutor-row {
  margin-top: 8px;
  font-size: 15px;
  width: 100%;
  line-height: 20px;
  text-align: left;
  /* color: gray; */
}
#tutor-page {
  margin-top: 20px;
  text-align: right;
}
</style>
