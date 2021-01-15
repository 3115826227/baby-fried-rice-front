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
                      <li class="im-list-li" v-for="(item, index) in chat" :key="index">
                         <el-row>
                          <el-col :span="2" style="margin-top:10px;">
                              <span class="image" style="padding:8px;">{{item.remark[0]}}</span>
                          </el-col>
                          <el-col :span="22">
                            <template v-if="item.more == 0">
                                <el-row class="im-list-top">
                                  <el-col class="im-list-remark" :span="18">
                                    <span>{{item.remark}}</span>
                                  </el-col>
                                  <el-col class="im-list-time" :span="5">{{item.time}}</el-col>
                                </el-row>
                                <el-row>
                                    <el-col class="im-list-content" :span="16">
                                      <span v-if="item.origin != id">{{item.remark}} ：</span>{{item.content}}
                                    </el-col>
                                    <el-col :span="4">
                                      <el-link type="success" :underline="false" @click="switchChat(nodeMap[item.chat_to])" style="font-size:12px;">查看会话</el-link>
                                    </el-col>
                                    <el-col :span="4">
                                      <el-link type="warning" :underline="false" @click="delSession(item)"  style="font-size:12px;">删除会话</el-link>
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
                                  <el-col class="im-list-content" :span="16">
                                    <span v-if="item.origin != id">{{item.remark}} ：</span>{{item.content}}
                                  </el-col>
                                  <el-col :span="4">
                                    <el-link type="success" :underline="false" @click="switchChat(nodeMap[item.chat_to])" style="font-size:12px;">查看会话</el-link>
                                  </el-col>
                                  <el-col :span="4">
                                    <el-link type="warning" :underline="false" style="font-size:12px;">删除会话</el-link>
                                  </el-col>
                                </el-row>
                              </el-badge>
                            </template>
                          </el-col>
                        </el-row>
                      </li>
                    </ul>
                  </template>
                </el-tab-pane>
                <el-tab-pane class="im-el-tab-pane" name="2">
                  <div slot="label">
                    <i class="iconfont">&#xeb9e;</i>
                    <span>好友列表</span>
                  </div>
                  <div style="margin-bottom:10px;">
                    <el-row>
                      <el-col :span="12" style="margin-right:15px;">
                        <el-input v-model="friend_search" size="small" placeholder="输入昵称查找好友"></el-input>
                      </el-col>
                      <el-col :span="5" style="margin-right:15px;">
                        <el-button type="info" size="small">查询好友</el-button>
                      </el-col>
                      <el-col :span="5">
                        <el-button type="primary" size="small" @click="newAddFriendDialogVisible = true">添加好友</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <template class="friends-tree">
                    <el-tree :data="friends" :props="defaultProps" @node-click="selectFriend">
                    </el-tree>
                  </template>
                </el-tab-pane>
                <el-tab-pane class="im-el-tab-pane" name="3">
                  <div slot="label">
                    <i class="iconfont">&#xeb95;</i>
                    <span>群组</span>
                  </div>
                  <div style="margin-bottom:10px;">
                    <el-row>
                      <el-col :span="9" style="margin-right:15px;">
                        <el-input v-model="friend_search" size="small" placeholder="输入群名称查找群"></el-input>
                      </el-col>
                      <el-col :span="4" style="margin-right:15px;">
                        <el-button type="info" size="small">查询群</el-button>
                      </el-col>
                      <el-col :span="4" style="margin-right:15px;">
                        <el-button type="" size="small" style="background-color:black;color:white;" @click="newAddGroupDialogVisible = true">创建群</el-button>
                      </el-col>
                      <el-col :span="4">
                        <el-button type="primary" size="small">加入群</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <template>
                    <div v-for="group in groups" :key="group.id" @click="selectGroup(group)">
                        <el-row class="group-list">
                          <el-col :span="3">
                            <span class="image" style="padding:12px;">{{group.name[0]}}</span>
                          </el-col>
                          <el-col :span="12">
                            {{group.name}}
                          </el-col>
                        </el-row>
                    </div>
                  </template>
                </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div id="im-panel">
          <div id="im-panel-tabs" v-if="current_chat.id">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <div class="chat-label" v-on:mouseover="infoLook($event)">
                    <template  v-if="current_chat.type === 'friend'">
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
                      <template>
                        <span>{{current_chat.remark}}</span>
                      </template>
                    </el-tooltip>
                    <span class="user-verify" v-if="user_info.verify"><i><strong>V</strong></i> 已认证</span>
                    <span class="user-unverify" v-else="">未认证</span>
                    </template>
                    <template v-else-if="current_chat.type === 'group'">
                      <template>
                        <span>{{current_chat.name}}</span>
                      </template>
                      <span class="user-verify" v-if="user_info.official"><i><strong>V</strong></i> 官方群</span>
                      <span class="user-unverify" v-else="">非官方群</span>
                    </template>
                  </div>
                  <div class="chat-label-button">
                    <el-link type="primary" :underline="false" @click="removeTab">关闭聊天窗口</el-link>
                    <el-link type="primary" :underline="false" @click="isCollapse = !isCollapse">
                      <span v-if="!isCollapse">打开详情</span>
                      <span v-else="">关闭详情</span>
                    </el-link>
                  </div>
                </div>
                <template>
                   <div id="message-receive">
                       <div class="chat-hint">
                         <span v-if="chatHint">
                          <el-link type="primary" :underline="false" @click="getMessage()" style="font-size:12px;">点击查看更多消息</el-link>
                         </span>
                         <span class="chat-hint-end" v-else="">
                            没有更多消息了
                         </span>
                       </div>
                       <el-row v-for="msg in current_chat_content" :key="msg.id" style="padding:18px 0px;">
                          <template v-if="current_chat.type === 'friend'">
                            <template v-if="msg.sender != current_chat.friend">
                              <el-col :span="24" style="text-align:right">
                                <el-row>
                                  <el-col :span="22">
                                    <span v-if="msg.image">
                                      <img class="sr-image" :src="msg.message_body" width="24px">
                                    </span>
                                    <span class="message-content" v-else="">
                                      {{msg.message_body}}
                                    </span>
                                  </el-col>
                                  <el-col :span="1" style="margin-left:8px;">
                                    <span class="image">{{username[0]}}</span>
                                  </el-col>
                                </el-row>
                              </el-col>
                            </template>
                            <template v-else="">
                              <el-col :span="24" style="text-align:left">
                                <el-row>
                                  <el-col :span="1" style="margin-right:8px;">
                                    <span class="image">{{current_chat.remark[0]}}</span>
                                  </el-col>
                                  <el-col :span="22">
                                    <span v-if="msg.image">
                                      <img class="sr-image" :src="msg.message_body" width="24px">
                                    </span>
                                    <span class="message-content" v-else="">
                                      {{msg.message_body}}
                                    </span>
                                  </el-col>
                                </el-row>
                              </el-col>
                            </template>
                          </template>
                       </el-row>
                       <!-- <ul v-for="msg in current_chat_content" :key="msg.id">
                         <template v-if="current_chat.type === 'friend'">
                           <li v-if="msg.sender != current_chat.friend" style="text-align:right">
                             {{msg.message_body}}
                             <span class="message-content">{{msg.message_body}}</span>
                                <span v-if="msg.image">
                                  <img class="sr-image" :src="msg.message_body" width="24px">
                                </span>
                                <span class="message-content" v-else="">
                                  {{msg.message_body}}
                                </span>
                             <span class="image">{{username[0]}}</span>
                          </li>
                          <li v-else="">
                              <span class="image">{{current_chat.remark[0]}}</span>
                              <span class="message-content">{{msg.message_body}}</span>
                              <span v-if="msg.image">
                                  <img class="sr-image" :src="msg.message_body" width="24px">
                              </span>
                              <span class="message-content" v-else="">
                                  {{msg.message_body}}
                              </span>
                          </li>
                         </template>
                         <template v-else-if="current_chat.type === 'group'">
                           <li v-if="msg.sender == id" style="text-align:right">
                             <span class="message-content">{{msg.message_body}}</span>
                             <span class="image">{{username[0]}}</span>
                           </li>
                           <li v-else="">
                              <span class="image">{{msg.sender_remark[0]}}</span>
                              <span class="message-content">{{msg.message_body}}</span>
                          </li>
                         </template>
                       </ul> -->
                   </div>
                   <!-- <el-divider></el-divider> -->
                   <div id="message-tools">
                     <el-row>
                       <el-col :span="1">
                         <el-popover placement="top" v-model="wxImgVisisable" width="600" style="text-aligh:center">
                            <div>
                              <div v-for="(item, index) in wxImgList" :key="index" style="float:left;padding:4px">
                                <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + index + '.gif'" @click="imgClick(index)">
                              </div>
                            </div>
                            <span slot="reference">
                              <img src="../../assets/smile.png" width="15px">
                            </span>
                         </el-popover>
                       </el-col>
                       <el-col :span="1">
                         <el-upload
                          action="''"
                          :http-request="upload"
                          ref="file"
                          :before-upload="beforeAvatarUpload">
                          <i class="el-icon-picture"></i>
                        </el-upload>
                         <!-- <i class="el-icon-picture"></i> -->
                       </el-col>
                       <el-col :span="1">
                         <i class="el-icon-folder"></i>
                       </el-col>
                     </el-row>
                      <!-- <div style="width:70%;margin:0 15%;">
                        <div v-for="(item, index) in wxImgList" :key="index" style="float:left;padding:4px">
                          <img :src="'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + index + '.gif'" @click="imgClick(index)">
                        </div>
                      </div> -->
                   </div>
                   <div id="message-send">
                       <el-form :model="send_form">
                         <el-form-item label="">
                            <el-input type="textarea" rows="3" v-model="send_form.desc" @input="changeSendContent"></el-input>
                        </el-form-item>
                        <el-form-item label="" id="message-send-button">
                            <el-button type="primary" @click="send" size="medium">发送</el-button>
                        </el-form-item>
                       </el-form>
                   </div>
                </template>
              </el-card>
          </div>
        </div>
        <div class="chat-label-detail" v-if="isCollapse && this.current_chat.id">
          <div id="chat-label-detail-title">
            <label>详情信息</label>
          </div>
          <!-- <el-divider></el-divider> -->
          <template v-if="this.current_chat.type === 'friend'">
            <el-row class="chat-detail-list">
              <el-col :span="16">成为好友：</el-col>
              <el-col :span="8">5 天</el-col>
            </el-row>
            <el-row class="chat-detail-list">
              <el-col :span="16">连续聊天：</el-col>
              <el-col :span="8">3 天</el-col>
            </el-row>
            <el-row class="chat-detail-list">
              <el-col :span="16">消息发送：</el-col>
              <el-col :span="8">2 条</el-col>
            </el-row>
            <el-row class="chat-detail-list">
              <el-col :span="16">消息接收：</el-col>
              <el-col :span="8">21 条</el-col>
            </el-row>
            <el-row class="chat-detail-list">
              <el-col :span="16">共同群聊：</el-col>
              <el-col :span="8">2 个</el-col>
            </el-row>
            <el-divider></el-divider>
            <el-form model="friend_detail_form" label-width="80px">
              <el-form-item label="特别关注">
                <el-switch v-model="friend_detail_form.care"></el-switch>
              </el-form-item>
              <el-form-item label="消息接收">
                <el-switch v-model="friend_detail_form.message_receive"></el-switch>
              </el-form-item>
              <el-form-item label="黑名单">
                <el-switch v-model="friend_detail_form.black_list"></el-switch>
              </el-form-item>
            </el-form>
            <el-row class="chat-detail-list">
              <el-button type="success" size="small">查看历史消息</el-button>
            </el-row>
            <el-row class="chat-detail-list">
              <el-button type="danger" size="small">删除好友</el-button>
            </el-row>
          </template>
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
              <el-form-item label="分组名称：">
                <template v-if="friendCategories.length">
                  <el-select v-model="add_friend_form.category" placeholder="请选择分组">
                    <el-option v-for="item in friendCategories" :label="item.name" :value="item.name" :key="item.id"></el-option>
                  </el-select>
                </template>
                <template v-else="">
                  <el-input v-model="add_friend_form.category"></el-input>
                </template>
              </el-form-item>
            </el-form>
          </template>
          <span slot="footer" class="dialog-footer">
            <el-button @click="newAddFriendDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addFriend">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="创建群"
        :visible.sync="newAddGroupDialogVisible"
        width="50%" height="50%">
          <el-row>
            <el-col :span="11" style="border:2px solid black;border-radius:5px;height:300px;padding:10px;margin-right:20px;">
              <div style="text-align:center;font-size:15px;margin:10px;">
                <span>选择好友</span>
              </div>
              <el-tree :data="friends" show-checkbox ref="group_friend_tree"  default-expand-all :props="defaultProps"></el-tree>
            </el-col>
            <el-col :span="12" style="border:2px solid black;border-radius:5px;height:300px;padding:10px;">
              <div style="text-align:center;font-size:15px;margin:10px;">
                <span>填写群信息</span>
              </div>
              <template class="dialog-form">
                <el-form :model="add_group_form" label-width="30%" label-position="right">
                  <el-form-item label="群名称：">
                    <el-input v-model="add_group_form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="群标签：">
                    <el-input v-model="add_group_form.label"></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="newAddGroupDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addGroup">确 定</el-button>
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
      friendCategories: [],
      defaultProps: {
        children: 'friends',
        label: 'remark'
      },
      message_panel: {},
      send_form: {},
      messageMp: {},
      chat: [],
      chatMap: {},
      newAddFriendDialogVisible: false,
      newAddGroupDialogVisible: false,
      add_friend_form: {},
      add_group_form: {},
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
      user_info: {},
      username: '',
      friend_search: '',
      groups: [],
      isCollapse: true,
      friend_detail_form: {},
      wxImgList: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
      wxImgVisisable: false,
      file: {}
    }
  },
  created () {
    this.init()
    this.initMessagMp()
    this.getFriends()
    this.getFriendCategory()
    this.initWebSocket()
    this.getNewChatMessage()
    this.getGroup()
  },
  methods: {
    init () {
      this.username = localStorage.getItem('username')
    },
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
    getFriendCategory () {
      var that = this
      this.$axios.get('/im/friend/category', {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (response) {
        if (response.data.code === 0) {
          that.friendCategories = response.data.data
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectFriend (val) {
      if (val.id === '') {
        return
      }
      this.userInfoGet(val.friend)
      this.current_chat = val
      this.current_chat.type = 'friend'
      this.getMessage()
    },
    handleClick (val) {
    },
    getFriends () {
      var that = this
      this.$axios.get('/im/friend', {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (response) {
        if (response.data.code === 0) {
          that.friends = response.data.data
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    switchChat (node) {
    },
    addFriend () {
      console.log(this.add_friend_form)
      var that = this
      var obj = {
        account_id: that.add_friend_form.id,
        remark: that.add_friend_form.remark,
        category: that.add_friend_form.category
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
    addGroup () {
      let nodes = this.$refs.group_friend_tree.getCheckedNodes()
      let friends = []
      nodes.forEach(element => {
        if (element.friend !== undefined) {
          friends.push({
            id: element.friend
          })
        }
      })
      var obj = {
        friends: friends,
        name: this.add_group_form.name
      }
      var that = this
      this.$axios.post('/im/group', obj, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.getGroup()
            that.newAddGroupDialogVisible = false
            that.$message.success('群组添加成功')
          } else {
            that.newAddGroupDialogVisible = false
            that.$message.error('群组添加失败')
          }
        })
        .catch(function (error) {
          that.newAddGroupDialogVisible = false
          that.$message.error('群组添加失败')
          console.log(error)
        })
    },
    getGroup () {
      var that = this
      this.$axios.get('/im/group/list', {
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (response) {
        if (response.data.code === 0) {
          that.groups = response.data.data
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    selectGroup (group) {
      this.current_chat = group
      this.current_chat.type = 'group'
      this.getMessage()
    },
    /*
      获取用户消息列表
    */
    getNewChatMessage () {
    },
    /*
      获取用户的聊天记录
    */
    getMessage () {
      var that = this
      if (this.current_chat.type === 'friend') {
        this.$axios.get('/im/chat/message/history?message_type=1&friend=' + this.current_chat.friend, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (response) {
          if (response.data.code === 0) {
            that.current_chat_content = response.data.data
          }
        })
          .catch(function (error) {
            console.log(error)
          })
      } else if (this.current_chat.type === 'group') {
        this.$axios.get('/im/chat/message/history?message_type=2&group=' + this.current_chat.id, {
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (response) {
          if (response.data.code === 0) {
            that.current_chat_content = response.data.data
          }
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    initWebSocket () { // 初始化weosocket
      const wsuri = 'ws://127.0.0.1:8072/api/user/friend/chat?token=' + localStorage.getItem('token')
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
      console.log(redata)
      if (this.current_chat.friend === redata.sender || this.current_chat.friend === redata.receive) {
        this.current_chat_content.push(redata)
      }
      // if (!redata.connect) {
      //   console.log('连接失败')
      //   this.connect = false
      // } else {
      //   console.log('连接成功')
      // }
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
        sender: localStorage.getItem('id'),
        token: localStorage.getItem('token'),
        body_type: 1,
        image: this.send_form.image,
        message_body: this.send_form.desc,
        timestamp: new Date().getTime()
      }
      if (this.send_form.image) {
        actions.body_type = 2
      }
      if (this.current_chat.type === 'friend') {
        actions.message_type = 1
        actions.receive = this.current_chat.friend
      } else if (this.current_chat.type === 'group') {
        actions.message_type = 2
        actions.group_id = this.current_chat.id
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
    userInfoGet (id) {
      var that = this
      this.$axios.get('/account/user/info?id=' + id, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(function (response) {
          if (response.data.code === 0) {
            that.user_info = response.data.data
            that.user_info.remark = that.current_chat.remark
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    infoLook ($event) {
      // console.log($event)
    },
    removeTab () {
      // this.current_chat = null
    },
    delSession (node) {
      var list = []
      for (var i = 0; i < this.chat.length; i++) {
        if (this.chat[i].id !== node.id) {
          list.push(this.chat[i])
        }
      }
      this.chat = list
    },
    // 图片上传前验证
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 上传图片
    upload (item) {
      var that = this
      let form = new FormData()
      let file = this.$refs.file.uploadFiles[0]
      form.append('file', file.raw, file.name)
      this.$axios.post('http://localhost:8051/api/upload', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        that.send_form.image = true
        that.send_form.desc = response.data.data.down_url
        that.send()
        // that.$message.success('发送成功')
      })
    },
    imgClick (index) {
      this.wxImgVisisable = false
      let imgUrl = 'https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/' + index + '.gif'
      this.send_form.image = true
      this.send_form.desc = imgUrl
      this.send()
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
    width: 52%;
    line-height: 10px;
    font-size: 14px;
}
.chat-label-detail {
  float: left;
  background: #FFF;
  padding: 10px;
  border-radius: 5px;
  line-height: 10px;
  height: 632px;
  width: 15%;
  color: #606266;
  font-size: 14px;
}
.chat-detail-list {
  padding: 15px;
}
#message-receive {
    height: 380px;
    margin: 5px;
    padding-right: 15px;
    overflow:scroll;
    border-bottom: 1px solid #DCDFE6;
}
#message-tools {
  padding: 10px 0px;
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
    padding: 8px 10px;
    /* margin-right: 50%; */
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
.el-tree {
  width: 100%;
  overflow: scroll;
}
.el-tree>.el-tree-node {
  display: inline-block;
  min-width: 100%;
}
.friend-tree-node {
  height: 50px;
}
.sr-image {
  color: #414A60;
  background-color: #F2F5FA;
  padding: 8px 10px;
  border-radius: 5px;
}
.image {
  width: 38px;
  height: 38px;
  color: white;
  font-size: 12px;
  vertical-align: middle;
  padding: 6px;
  border: 1px solid white;
  border-radius: 50%;
  /* background-color: rgb(112, 118, 250); */
  background-color: #409eff;
  margin-right: 5px;
}

.group-list {
  padding: 20px 5px;
}

#chat-label-detail-title {
  padding:6px 0px;
  text-align:center;
  border-bottom: 1px solid #DCDFE6;
  height:20px;
  font-weight: bolder;
}
</style>
