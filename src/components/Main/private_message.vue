<template>
    <div id="privatemessage">
      <el-row id="pm-list" v-for="item in list" :key="item.id">
        <el-col>
          <el-card shadow="hover">
            <template style="padding:0 2px">
              <span v-if="!item.message_status" style="font-size:12px;color:green">
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
      list: []
    }
  },
  created () {
    this.getPrivateMessageList()
  },
  methods: {
    getPrivateMessageList () {
      var that = this
      this.$axios.get('/api/account/user/private_message', {
        headers: {
          token: sessionStorage.getItem('token')
        }
      }).then(function (response) {
        if (response.data.code === 0) {
          that.list = response.data.data.list
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
#pm-list {
  margin: 5px 15%;
}
</style>
