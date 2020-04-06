<template>
    <div id="space">
        <div id="space-content">
            <el-form id="space-form" ref="space_form" :model="space_form">
              <el-form-item class="space-form-item" label="">
                <el-input type="textarea" rows="5" v-model="space_form.desc" placeholder="说说你的心情吧"></el-input>
              </el-form-item>
              <el-form-item class="space-form-item"  label="">
                <el-col :span="20">
                  <el-select class="space-form-visit-select" v-model="space_form.visited_permit" placeholder="请选择可见范围">
                    <el-option label="公开" value="1"></el-option>
                    <el-option label="仅认证用户可见" value="2"></el-option>
                    <el-option label="仅校内用户可见" value="3"></el-option>
                    <el-option label="仅好友可见" value="4"></el-option>
                    <el-option label="私密" value="5"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="4" class="space-form-button">
                   <el-button type="primary" size="small">
                     <i class="iconfont">&#xe648;</i>
                     <span>发表</span>
                  </el-button>
                </el-col>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
            <div id="space-label">
              <el-row>
                <el-col :span="10">
                  <el-button type="info" size="small">
                    <i class="iconfont">&#xe71f;</i>
                    <span>点击刷新</span>
                  </el-button>
                </el-col>
                <el-col :span="14" style="text-align:right;">
                  <span>动态筛选：</span>
                  <el-select v-model="space_type" placeholder="">
                    <el-option label="所有" value="1"></el-option>
                    <el-option label="只看认证用户" value="2"></el-option>
                    <el-option label="只看校内用户" value="3"></el-option>
                    <el-option label="只看好友" value="4"></el-option>
                    <el-option label="只看私密" value="5"></el-option>
                  </el-select>
                </el-col>
                <!-- <el-col :span="4" style="text-align:right;"><span>点击刷新</span></el-col> -->
              </el-row>
            </div>
            <div class="new-space-notify" v-if="new_space_number">
               <span>您有{{new_space_number}}条新动态！！！</span>
            </div>
            <div id="space-user">
              <ul class="space-user-ul">
                <li v-for="item in space_user" :key="item.id">
                  <el-row>
                    <span v-if="item.remark">{{item.remark}}</span>
                    <span v-else>{{item.username}}</span>
                    <span v-if="item.verify" class="verify"><i><strong>V</strong></i> 已认证</span>
                    <span v-else class="unverify">未认证</span>
                  </el-row>
                  <el-row style="color:gray;font-size:14px;line-height:20px;">
                    <el-col :span="12">
                      <span v-if="item.friend">好友 ·</span>
                      <span>邵阳学院 ·</span>
                      <span>{{item.time}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">{{item.content}}</el-col>
                  </el-row>
                  <el-row v-for="(data, index) in item.images" :key="index">
                    <img :src="data">
                  </el-row>
                  <el-row style="color:gray;font-size:14px;line-height:25px;">
                    <el-col :span="15" style="color:gray;">
                      <i class="iconfont">&#xe61d;</i>
                      <span>浏览{{item.visited}}次</span>
                    </el-col>
                    <el-col :span="3" style="text-align:right;">
                      <i class="iconfont">&#xe60a;</i>
                      <span>点赞</span>
                    </el-col>
                    <el-col :span="3" style="text-align:right;">
                      <i class="iconfont">&#xe6d3;</i>
                      <span>评论</span>
                    </el-col>
                    <el-col :span="3" style="text-align:right;">
                      <i class="iconfont">&#xe6e7;</i>
                      <span>转发</span>
                    </el-col>
                  </el-row>
                  <el-row style="color:#cc8f14;font-size:14px;">
                    <i class="iconfont">&#xe60a;</i>
                    <span v-for="(data, index) in item.fabulous_user" :key="index" style="margin-right:2px;">
                      <span v-if="index">、</span>
                      <span v-if="item.remark">{{data.remark}}</span>
                      <span v-else>{{data.username}}</span>
                    </span>等共{{item.fabulous}}人给<span v-if="item.sex">他</span><span v-else>她</span>点赞
                  </el-row>
                </li>
              </ul>
              <div class="visit-message">
                <span>{{visit_message}}</span>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'space',
  data () {
    return {
      space_form: {
        visited_permit: '4'
      },
      visit_message: '没有更多啦',
      space_type: '1',
      new_space_number: 2,
      space_user: [{
        id: '',
        username: '张三',
        verify: 1,
        friend: 1,
        sex: 1,
        remark: '',
        content: '今天心情有点糟糕',
        images: ['http://a1.qpic.cn/psc?/V13ZvWgj3ZVaOu/U.M5PgtxS1PFgLr9JTiFC9Od4hKbi9zPYOOp*WCzyYAjxApr7CAjjonz.fpuj9bdDYGqSRSb1yTWY5mfi5gDPA!!/c&ek=1&kp=1&pt=0&bo=xgDGAMYAxgARECc!&t=5&tl=3&vuin=3115826227&tm=1586077200&sce=60-2-2&rf=0-0'],
        timestamp: '',
        time: '12:24',
        visited: '10',
        fabulous: 2,
        fabulous_user: [{
          id: '1',
          username: '李四',
          remark: '李四1'
        }, {
          id: '2',
          username: '张三',
          remark: '张三1'
        }],
        comment: [{
          id: '',
          username: '',
          remark: '',
          content: '',
          timestamp: '',
          time: ''
        }],
        reply: [{
          id: '',
          username: '',
          remark: '',
          content: '',
          reply_to: '',
          timestamp: '',
          time: ''
        }]
      }, {
        id: '',
        username: '张三',
        verify: 1,
        friend: 1,
        sex: 1,
        remark: '',
        content: '今天心情有点糟糕',
        images: ['http://a1.qpic.cn/psc?/V13ZvWgj3ZVaOu/U.M5PgtxS1PFgLr9JTiFC9Od4hKbi9zPYOOp*WCzyYAjxApr7CAjjonz.fpuj9bdDYGqSRSb1yTWY5mfi5gDPA!!/c&ek=1&kp=1&pt=0&bo=xgDGAMYAxgARECc!&t=5&tl=3&vuin=3115826227&tm=1586077200&sce=60-2-2&rf=0-0'],
        timestamp: '',
        time: '12:24',
        visited: '10',
        fabulous: 2,
        fabulous_user: [{
          id: '1',
          username: '李四',
          remark: '李四1'
        }, {
          id: '2',
          username: '张三',
          remark: '张三1'
        }],
        comment: [{
          id: '',
          username: '',
          remark: '',
          content: '',
          timestamp: '',
          time: ''
        }],
        reply: [{
          id: '',
          username: '',
          remark: '',
          content: '',
          reply_to: '',
          timestamp: '',
          time: ''
        }]
      }, {
        id: '',
        username: '张三',
        verify: 1,
        friend: 1,
        sex: 1,
        remark: '',
        content: '今天心情有点糟糕',
        images: ['http://a1.qpic.cn/psc?/V13ZvWgj3ZVaOu/U.M5PgtxS1PFgLr9JTiFC9Od4hKbi9zPYOOp*WCzyYAjxApr7CAjjonz.fpuj9bdDYGqSRSb1yTWY5mfi5gDPA!!/c&ek=1&kp=1&pt=0&bo=xgDGAMYAxgARECc!&t=5&tl=3&vuin=3115826227&tm=1586077200&sce=60-2-2&rf=0-0'],
        timestamp: '',
        time: '12:24',
        visited: '10',
        fabulous: 2,
        fabulous_user: [{
          id: '1',
          username: '李四',
          remark: '李四1'
        }, {
          id: '2',
          username: '张三',
          remark: '张三1'
        }],
        comment: [{
          id: '',
          username: '',
          remark: '',
          content: '',
          timestamp: '',
          time: ''
        }],
        reply: [{
          id: '',
          username: '',
          remark: '',
          content: '',
          reply_to: '',
          timestamp: '',
          time: ''
        }]
      }]
    }
  },
  methods: {
    timestampToTime (timestamp) {
      var date = new Date(timestamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() + 1 < 10 ? '0' + (date.getDate() + 1) : date.getDate() + 1) + ' '
      var h = date.getHours() + ':'
      var m = (date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes() + 1) : date.getMinutes() + 1)
      var today = new Date()
      let dateStr = ''
      if (today.getFullYear() !== date.getFullYear()) {
        dateStr += Y
      }
      if (today.getMonth !== date.getMonth) {
        dateStr += M
      }
      if (today.getDate !== date.getDate) {
        dateStr += D
      }
      return dateStr + h + m
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 1306051 */
  src: url('//at.alicdn.com/t/font_1306051_svucwz6pwna.eot');
  src: url('//at.alicdn.com/t/font_1306051_svucwz6pwna.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_1306051_svucwz6pwna.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_1306051_svucwz6pwna.woff') format('woff'),
  url('//at.alicdn.com/t/font_1306051_svucwz6pwna.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_1306051_svucwz6pwna.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
#space {
  /* background-color: #ede8d1; */
  border-radius: 5px;
  /* margin: 20px; */
  margin: 20px 0px 0px 0px;
  padding-bottom: 30px;
}
#space-content {
  margin: 0 18%;
  padding: 0 10%;
  /* border: 1px #666; */
  /* border-style: none solid none solid; */
  /* background-color: #ede8d1; */
}
#space-form {
  padding: 0px;
  /* background-color: white; */
}
#space-label {
  /* background-color: #fff; */
  padding: 10px 0px;
  border-radius: 5px;
  height: 50px;
}
.space-form-item {
  line-height: 0px;
}
.space-form-visit-select {
  width: 35%;
}
.space-form-button {
  text-align: right;
}
.space-user {
  margin-bottom: 20px;
  scroll-behavior: auto;
}
.space-user-ul {
  /* background-color: #ede8d1; */
  /* margin-top: 10px; */
  /* margin-bottom: 10px; */
  line-height: 30px;
  list-style-type:none;
  padding-inline-start:0px;
}
.space-user-ul li {
  border-radius: 5px;
  color: #2e3135;
  font-size: 16px;
  font-weight: 400;
  background-color: #fff;
  padding: 10px;
  margin-bottom: 20px;
}
.visit-message {
  text-align: center;
}
.el-input--suffix .el-input__inner {
  height: 33px;
}
.verify {
  background-color: #efc100;
  color: white;
  font-size: 10px;
  border-radius: 5px;
  padding: 2px;
}
.unverify {
  background-color: grey;
  color: white;
  border-radius: 5px;
  padding: 5px;
}
.new-space-notify {
  padding-top:9px;
  color:#D92E2E;
  font-size:16px;
  font-weight:400px;
  text-align:center;
}
</style>
