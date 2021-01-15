<template>
    <div id="discussion">
        <div id="left-panel">
          <div class="left-panel-header">
            <div class="left-panel-header-nav">
              <el-tabs v-model="activeName" type="card" style="width:400px;" stretch>
                <el-tab-pane label="最新" name="newest"><discussionList /></el-tab-pane>
                <el-tab-pane label="最热" name="hotest">最热</el-tab-pane>
                <el-tab-pane label="推荐" name="recommend">推荐</el-tab-pane>
              </el-tabs>
            </div>
            <div class="left-panel-header-search">
              <el-row>
                <el-col :span="18" style="margin-right:20px;">
                  <el-input placeholder="输入话题" />
                </el-col>
                <el-col :span="4">
                  <span><el-button type="primary">提问</el-button></span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="lef-panel-discussion"></div>
        </div>
        <div id="right-panel">
          <div class="right-panel-header">
            <el-row>
              <el-col :span="10">等级：</el-col>
              <el-col :span="8" style="text-align: right;">Lv{{user_info.level}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="10">粉丝：</el-col>
              <el-col :span="8" style="text-align: right;">{{user_info.fans}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="10">获赞数</el-col>
              <el-col :span="8" style="text-align: right;">{{user_info.fans}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="10">访问量：</el-col>
              <el-col :span="8" style="text-align: right;">{{user_info.fans}}</el-col>
            </el-row>
          </div>
          <div class="right-panel-center">
            <el-row>
              <el-col :span="10">我提出的问题：</el-col>
              <el-col :span="8" style="text-align: right;">{{user_info.fans}}</el-col>
            </el-row>
          </div>
          <div class="right-panel-footer"></div>
        </div>
    </div>
</template>

<script>
import discussionList from '../Main/discussion_list'
export default {
  name: 'discussion',
  components: {
    discussionList
  },
  data () {
    return {
      user_info: {
        level: 2,
        fans: 23
      }
    }
  }
}
</script>

<style scoped>
#discussion {
  margin: 50px;
  float: left;
}
#left-panel {
  float: left;
  width: 900px;
  margin-right: 30px;
}
.left-panel-header {
  float: left;
}
.left-panel-header-nav {
  float: left;
  width: 550px;
}
.left-panel-header-search {
  float: left;
}
#right-panel {
  float: left;
  width: 300px;
}
.right-panel-header {
  border: 1px;
  border-style: solid;
  padding: 15px;
  font-size: 14px;
}
.right-panel-header .el-row {
  padding: 10px;
}
.right-panel-center {
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  padding: 15px;
  font-size: 14px;
}
.right-panel-center .el-row {
  padding: 10px;
}
</style>
