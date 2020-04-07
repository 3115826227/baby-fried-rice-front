<template>
    <div id='im'>
        <div id="im-list">
          <div id="im-list-tabs">
            <el-tabs v-model="name" type="border-card" stretch
             @tab-click="handleClick">
                <el-tab-pane class="im-el-tab-pane" name="1">
                  <div slot="label">
                    <i class="iconfont">&#xeb97;</i>
                    <span>聊天消息</span>
                  </div>
                  <template>
                    <ul>
                      <li class="im-list-li" v-for="(item, index) in chat" :key="index" @click="switchChat(nodeMap[item.chat_to])">
                        <template v-if="item.more == 0">
                          <el-row class="im-list-top">
                            <el-col class="im-list-remark" :span="18">
                              <span>{{item.remark}}</span>
                            </el-col>
                            <el-col class="im-list-time" :span="5">{{item.time}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col class="im-list-content" :span="24">
                              <span v-if="item.origin != id">{{item.remark}} ：</span>{{item.content}}
                            </el-col>
                          </el-row>
                        </template>
                        <template v-else="">
                          <el-badge id="im-list-li-item" :value="item.more" :max="99" class="item">
                            <el-row class="im-list-top">
                              <el-col class="im-list-remark" :span="18">{{item.remark}}</el-col>
                              <el-col class="im-list-time" :span="5">{{item.time}}</el-col>
                            </el-row>
                            <el-row>
                              <el-col class="im-list-content" :span="24">
                                <span v-if="item.origin != id">{{item.remark}} ：</span>{{item.content}}
                              </el-col>
                            </el-row>
                          </el-badge>
                        </template>
                      </li>
                    </ul>
                  </template>
                </el-tab-pane>
                <el-tab-pane class="im-el-tab-pane" name="2">
                  <div slot="label">
                    <i class="iconfont">&#xeb9e;</i>
                    <span>好友列表</span>
                  </div>
                  <template class="friends-tree">
                    <el-scrollbar>
                      <el-tree :data="friends" :props="defaultProps" accordion
                      @node-click="handleNodeClick">
                      </el-tree>
                    </el-scrollbar>
                  </template>
                </el-tab-pane>
                <el-tab-pane class="im-el-tab-pane" name="3">
                  <div slot="label">
                    <i class="iconfont">&#xeb95;</i>
                    <span>群组</span>
                  </div>
                  <template>
                    <span>暂未开放</span>
                  </template>
                </el-tab-pane>
            </el-tabs>
          </div>
          <!-- <el-button type="primary" @click="newAddFriendDialog">添加好友</el-button> -->
        </div>
        <div id="im-panel">
          <div id="im-panel-tabs" v-if="current_chat.id">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <div class="chat-label" v-on:mouseover="infoLook($event)">
                    <el-tooltip effect="dark" placement="right">
                      <div class="chat-label-info" slot="content" style="width:150px">
                        <el-row>
                          <el-col :span="8">昵称：</el-col>
                          <el-col :span="16">{{user_info.username}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">备注：</el-col>
                          <el-col :span="16">{{user_info.remark}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">认证：</el-col>
                          <el-col :span="16">
                            <span v-if="user_info.verify">已认证</span>
                            <span v-else="">未认证</span>
                          </el-col>
                        </el-row>
                        <template v-if="user_info.verify">
                        <el-row>
                          <el-col :span="8">姓名：</el-col>
                          <el-col :span="16">{{user_info.name}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">学校：</el-col>
                          <el-col :span="16">{{user_info.school}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">院系：</el-col>
                          <el-col :span="16">{{user_info.faculty}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">年级：</el-col>
                          <el-col :span="16">{{user_info.grade}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">专业：</el-col>
                          <el-col :span="16">{{user_info.major}}</el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="8">学号：</el-col>
                          <el-col :span="16">{{user_info.number}}</el-col>
                        </el-row>
                        </template>
                      </div>
                      <span>{{current_chat.label}}</span>
                    </el-tooltip>
                    <span class="user-verify" v-if="user_info.verify"><i><strong>V</strong></i> 已认证</span>
                    <span class="user-unverify" v-else="">未认证</span>
                  </div>
                  <div class="chat-label-button">
                    <a>关闭</a>
                  </div>
                </div>
                <template>
                   <div id="message-receive">
                       <div class="chat-hint">
                         <span class="chat-hint-more" v-if="chatHint" @click="getFriendMessage()">点击查看更多消息</span>
                         <span class="chat-hint-end" v-else="">
                            没有更多消息了
                         </span>
                       </div>
                       <ul v-for="msg in current_chat_content" :key="msg.id">
                         <li v-if="msg.origin != current_chat.id" style="text-align:right">
                             <span class="message-content-origin">{{msg.content}}</span>
                         </li>
                         <li v-else="">
                             <span class="message-content">{{msg.content}}</span>
                         </li>
                       </ul>
                   </div>
                   <el-divider></el-divider>
                   <div id="message-send">
                       <el-form :model="send_form">
                         <el-form-item label="">
                            <el-input type="textarea" rows="3" v-model="send_form.desc" @input="changeSendContent"></el-input>
                        </el-form-item>
                        <el-form-item label="" id="message-send-button">
                            <el-button type="primary" @click="send">发送</el-button>
                        </el-form-item>
                       </el-form>
                   </div>
                </template>
              </el-card>
          </div>
        </div>
        <el-dialog
          title="添加好友"
          :visible.sync="newAddFriendDialogVisible"
          width="50%" height="50%">
          <template class="dialog-form">
            <el-form :model="add_friend_form" label-width="20%" label-position="right">
              <el-form-item label="好友ID：">
                <el-input v-model="add_friend_form.id"></el-input>
              </el-form-item>
              <el-form-item label="好友标签：">
                <el-input v-model="add_friend_form.remark"></el-input>
              </el-form-item>
            </el-form>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="newAddFriendDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFriend">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'im',
  data () {
    return {
      activeName: '1',
      name: '1',
      friends: [],
      defaultProps: {
        children: 'friends',
        label: 'label'
      },
      message_panel: {},
      send_form: {},
      messageMp: {},
      chat: [],
      chatMap: {},
      newAddFriendDialogVisible: false,
      add_friend_form: {},
      websock: null,
      connect: false,
      current_chat: {},
      current_chat_content: [],
      websockpath: '',
      nodeMap: {},
      size: 10,
      chatHint: 1,
      select_friends: [],
      new_chat_message: [],
      id: '',
      user_info: {}
    }
  },
  created () {
    this.initMessagMp()
    this.getFriends()
    this.initWebSocket()
    this.getNewChatMessage()
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
    },
    initMessagMp () {
      this.id = localStorage.getItem('id')
      this.messageMp = new Map()
      this.chatMap = new Map()
      this.nodeMap = new Map()
      this.current_chat_content = Number
    },
    judgeIsConnect () {
      if (!this.connect) {
        this.$message.error('通讯连接断开，请刷新重试')
        return false
      }
      return true
    },
    getNewChatMessage () {
      if (!this.judgeIsConnect) {
        return
      }
      var that = this
      this.$axios.get('/im/chat/message/new', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.chat = response.data.data
            for (var i = 0; i < that.chat.length; i++) {
              if (that.chat[i].content.length > 16) {
                that.chat[i].content = that.chat[i].content.slice(0, 16) + '...'
              }
              that.chat[i].time = that.timestampToTime(that.chat[i].timestamp)
              that.chatMap[that.chat[i].chat_to] = i
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleNodeClick (val) {
      if (val.isFriend) {
        this.switchChat(val)
      }
    },
    handleClick (val) {
      if (this.name === '1') {
        this.getNewChatMessage()
      }
    },
    getFriends () {
      var that = this
      this.$axios.get('/im/friend', {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          for (var i = 0; i < response.data.data.length; i++) {
            var item = response.data.data[i]
            var obj = {
              id: item.id,
              label: item.name,
              isFriend: false,
              friends: []
            }
            for (var j = 0; j < item.friends.length; j++) {
              var node = {
                id: item.friends[j].friend,
                label: item.friends[j].remark,
                isFriend: true
              }
              obj.friends.push(node)
              that.nodeMap[node.id] = node
            }
            that.friends.push(obj)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    switchChat (node) {
      if (!this.judgeIsConnect) {
        return
      }
      this.infoGet(node)
      if (this.chatMap[node.id] != null) {
        this.chat[this.chatMap[node.id]].more = 0
      }
      var that = this
      that.current_chat = node
      that.select_friends = ['所有', node.label]
      this.$axios.get('/im/chat/message/friend/history?friend=' + node.id + '&size=' + that.size, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.current_chat_content = response.data.data
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    newAddFriendDialog () {
      this.newAddFriendDialogVisible = true
    },
    addFriend () {
      console.log(this.add_friend_form)
      var that = this
      var obj = {
        user_id: that.add_friend_form.id,
        remark: that.add_friend_form.remark
      }
      this.$axios.post('/im/friend', obj, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.getFriends()
            that.newAddFriendDialogVisible = false
            that.$message.success('好友添加成功')
          } else {
            that.newAddFriendDialogVisible = false
            that.$message.error('好友添加失败')
          }
        })
        .catch(function (error) {
          that.newAddFriendDialogVisible = false
          that.$message.error('好友添加失败')
          console.log(error)
        })
    },
    getFriendMessage () {
      var that = this
      that.size += 10
      this.$axios.get('/im/chat/message/friend/history?friend=' + that.current_chat.id + '&size=' + that.size, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.current_chat_content = response.data.data
            if (that.current_chat_content.length < that.size) {
              that.chatHint = 0
            }
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    initWebSocket () { // 初始化weosocket
      const wsuri = 'ws://127.0.0.1:8092/api/user/friend/chat?token=' + localStorage.getItem('token')
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      console.log('连接成功')
      this.connect = true
    },
    websocketonerror () { // 连接建立失败重连
      // this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      let redata = JSON.parse(e.data)
      if (!redata.connect) {
        console.log('连接失败')
        this.connect = false
      } else {
        let index = this.chatMap[redata.origin]
        if (redata.origin === this.id) {
          index = this.chatMap[redata.friend]
        }
        let obj = {
          origin: redata.origin,
          friend: redata.friend,
          id: '',
          types: redata.types,
          remark: redata.remark,
          content: redata.content,
          timestamp: redata.create_time,
          time: this.timestampToTime(redata.create_time),
          read: false
        }
        if (index == null) {
          obj.more = 1
          if (redata.origin === this.id) {
            obj.chat_to = redata.friend
          } else {
            obj.chat_to = redata.origin
          }
        } else {
          obj.remark = this.chat[index].remark
          obj.chat_to = this.chat[index].chat_to
          if (redata.origin !== this.id) {
            obj.more = this.chat[index].more + 1
          }
        }
        let newChat = []
        let i
        let num = 0
        newChat.push(obj)
        this.chatMap[obj.origin] = num
        num++
        for (i = 0; i < this.chat.length; i++) {
          if (i === index) {
            if (index != null) {
              continue
            }
          }
          newChat.push(this.chat[i])
          this.chatMap[this.chat[i]] = num
          num++
        }
        this.chat = newChat
        if (redata.friend === this.current_chat.id || redata.origin === this.current_chat.id) {
          this.current_chat_content.push(redata)
        }
      }
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
      this.connect = false
    },
    send () {
      if (!this.judgeIsConnect()) {
        return
      }
      let actions = {
        origin: localStorage.getItem('id'),
        friend: this.current_chat.id,
        token: localStorage.getItem('token'),
        remark: this.current_chat.label,
        content: this.send_form.desc,
        create_time: new Date().getTime(),
        is_friend: true,
        status: true
      }
      this.websocketsend(JSON.stringify(actions))
      this.send_form = {}
    },
    changeSendContent () {
      let lastChat = this.send_form.desc[this.send_form.desc.length - 1]
      if (lastChat === '@' || lastChat === '\n') {
        if (lastChat === '\n') {
          this.send()
        }
      }
    },
    infoGet (val) {
      var that = this
      this.$axios.get('/account/user/info?id=' + val.id, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.user_info = response.data.data
            that.user_info.remark = val.label
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    infoLook ($event) {
      // console.log($event)
    }
  },
  destroyed () {
    this.websock.close() // 离开路由之后断开websocket连接
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
#im {
    margin-top: 30px;
    float: left;
    width: 100%;
}
#im-list {
    float: left;
    padding: 0;
    width: 30%;
}
#im-panel {
    float: left;
    margin-left: 20px;
    width: 68%;
    line-height: 10px;
    font-size: 14px;
}
#message-receive {
    height: 380px;
    margin: 5px;
    padding-right: 15px;
    overflow:scroll;
}
#message-send {
    height: 135px;
}
#message-send-button {
    text-align: right;
}
.message-name {
    color: #909399;
    padding: 10px 5px;
}
.message-content {
    color: #414A60;
    background-color: #F2F5FA;
    padding: 8px 20px;
    margin-right: 50%;
    border-radius: 5px;
}
.message-content-origin {
    color: #414A60;
    background-color: #F2F5FA;
    padding: 8px 15px;
    margin-left: 50%;
    border-radius: 5px;
    text-align: right;
}
li{
    list-style-type:none;
}
ul {
    padding: 0px;
    margin-bottom: 30px;
}
.clearfix {
  height: 5px;
}
.chat-label {
  float: left;
}
.chat-label-button {
  float: right;
  color: #409EFF;
}
.chat-hint {
  margin-top: 2px;
  text-align: center;
  font-size: 12px;
}
.chat-hint-more {
  color: #409EFF;
}
.chat-hint-end {
  color: gray;
}
#im-list-li-item {
  width: 100%;
}
.im-list-li {
  background-color: #EBEEF5;
  padding: 5px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.im-list-top {
  margin-bottom: 5px;
}
.im-list-remark {
  font-size: 14px;
}
.im-list-time {
  font-size: 12px;
  color: gray;
  text-align: right;
}
.im-list-content {
  font-size: 14px;
  color: gray;
}
.chat-label-info {
  font-size: 13px;
  line-height: 25px;
}
.user-verify {
  font-size: 11px;
  background-color: #efc100;
  color: white;
  border-radius: 5px;
  padding: 2px;
}
.user-unverify {
  font-size: 11px;
  background-color: #999;
  color: white;
  border-radius: 5px;
  padding: 2px;
}
.im-el-tab-pane {
  height: 565px;
}
.el-tabs--border-card>.el-tabs__content {
  height: 500px;
}
.el-tree-node__label{
    font-size: 25px;
}
</style>
