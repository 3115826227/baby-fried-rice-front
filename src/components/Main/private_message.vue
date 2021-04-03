<template>
    <div id="privatemessage">
      <el-row id="pm-list" v-for="item in list" :key="item.id">
        <el-col>
          <el-card shadow="hover">
            <template style="padding:0 2px">
              <span v-if="item.status" style="font-size:12px;color:green">
                未读
              </span>
              <span  v-else style="font-size:12px;color:gray">
                已读
              </span>
            </template>
            <span>{{item.title}}</span>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  name: 'private_message',
  data () {
    return {
      list: [
        {
          id: '1',
          title: '私信1',
          status: 1
        },
        {
          id: '2',
          title: '私信2',
          status: 0
        }
      ]
    }
  }
}
</script>

<style scoped>
#pm-list {
  margin: 5px 15%;
}
</style>
